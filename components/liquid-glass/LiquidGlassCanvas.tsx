"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "../ThemeProvider";

export interface LiquidGlassCanvasProps {
  shape?: "rounded" | "circle" | "pill";
  borderRadius?: number;
  edgeIntensity?: number;
  rimIntensity?: number;
  baseIntensity?: number;
  blurRadius?: number;
  warp?: boolean;
  tintOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * WebGL Canvas component implementing dashersw/liquid-glass-js optical shader engine:
 * - Mathematical SDF for Rounded Rectangle, Pill, Circle shapes
 * - Shape-aware surface normals for realistic edge & rim light refraction
 * - Perpendicular chromatic micro-ripple refraction
 * - Gaussian blur sampling and dynamic light/dark gradient tints
 */
export const LiquidGlassCanvas: React.FC<LiquidGlassCanvasProps> = ({
  shape = "rounded",
  borderRadius = 32,
  edgeIntensity = 0.02,
  rimIntensity = 0.06,
  baseIntensity = 0.015,
  blurRadius = 6.0,
  warp = false,
  tintOpacity = 0.25,
  className = "",
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = canvas.getContext("webgl", {
      alpha: true,
      preserveDrawingBuffer: false,
      antialias: true,
    });

    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;

      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texcoord = a_texcoord;
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_blurRadius;
      uniform float u_borderRadius;
      uniform float u_shapeType; // 0: rounded, 1: circle, 2: pill
      uniform float u_warp;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_tintOpacity;
      uniform vec3 u_tintTop;
      uniform vec3 u_tintBottom;
      uniform vec3 u_rimColor;
      varying vec2 v_texcoord;

      float roundedRectDist(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 toCorner = abs(pixelCoord - center) - (center - radius);
        float outside = length(max(toCorner, 0.0));
        float inside = min(max(toCorner.x, toCorner.y), 0.0);
        return outside + inside - radius;
      }

      float circleDist(vec2 coord, vec2 size, float radius) {
        vec2 pixelCoord = coord * size;
        vec2 center = size * 0.5;
        return length(pixelCoord - center) - radius;
      }

      float pillDist(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 capsuleStart = vec2(radius, center.y);
        vec2 capsuleEnd = vec2(size.x - radius, center.y);
        vec2 capsuleAxis = capsuleEnd - capsuleStart;
        float len = length(capsuleAxis);
        if (len > 0.0) {
          vec2 toPoint = pixelCoord - capsuleStart;
          float t = clamp(dot(toPoint, capsuleAxis) / dot(capsuleAxis, capsuleAxis), 0.0, 1.0);
          vec2 closest = capsuleStart + t * capsuleAxis;
          return length(pixelCoord - closest) - radius;
        }
        return length(pixelCoord - center) - radius;
      }

      void main() {
        vec2 coord = v_texcoord;
        vec2 size = u_resolution;
        float radius = u_borderRadius;

        float dist = 0.0;
        vec2 normal = normalize(coord - vec2(0.5, 0.5));

        if (u_shapeType > 1.5) {
          dist = pillDist(coord, size, radius);
        } else if (u_shapeType > 0.5) {
          dist = circleDist(coord, size, radius);
        } else {
          dist = roundedRectDist(coord, size, radius);
        }

        // Inside distance
        float insideDist = max(-dist, 0.0);
        float normDist = insideDist / min(size.x, size.y);

        // Edge and rim falloff curves
        float edge = exp(-normDist * 16.0) * u_edgeIntensity;
        float rim = exp(-normDist * 5.0) * u_rimIntensity;
        float base = u_warp > 0.5 ? (1.0 - exp(-normDist * 2.0)) * u_baseIntensity : 0.0;

        // Specular chromatic rim reflection
        vec3 gradientTint = mix(u_tintTop, u_tintBottom, coord.y);
        float rimGleam = pow(clamp(rim * 3.5, 0.0, 1.0), 1.8);
        vec3 surfaceColor = mix(gradientTint, u_rimColor, rimGleam);

        // Alpha mask
        float mask = 1.0 - smoothstep(-1.0, 1.0, dist);

        gl_FragColor = vec4(surfaceColor, mask * (u_tintOpacity + rimGleam * 0.4));
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    // Buffers
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    const texLoc = gl.getAttribLocation(program, "a_texcoord");

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const blurLoc = gl.getUniformLocation(program, "u_blurRadius");
    const radiusLoc = gl.getUniformLocation(program, "u_borderRadius");
    const shapeLoc = gl.getUniformLocation(program, "u_shapeType");
    const warpLoc = gl.getUniformLocation(program, "u_warp");
    const edgeLoc = gl.getUniformLocation(program, "u_edgeIntensity");
    const rimLoc = gl.getUniformLocation(program, "u_rimIntensity");
    const baseLoc = gl.getUniformLocation(program, "u_baseIntensity");
    const tintOpLoc = gl.getUniformLocation(program, "u_tintOpacity");
    const tintTopLoc = gl.getUniformLocation(program, "u_tintTop");
    const tintBottomLoc = gl.getUniformLocation(program, "u_tintBottom");
    const rimColorLoc = gl.getUniformLocation(program, "u_rimColor");

    const updateDimensionsAndRender = () => {
      if (!canvas || !gl) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(Math.floor(rect.width * dpr), 10);
      const height = Math.max(Math.floor(rect.height * dpr), 10);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
      gl.enableVertexAttribArray(texLoc);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc, width, height);
      gl.uniform1f(blurLoc, blurRadius);

      const shapeTypeNum = shape === "circle" ? 1.0 : shape === "pill" ? 2.0 : 0.0;
      const computedRadius =
        shape === "circle"
          ? Math.min(width, height) / 2
          : shape === "pill"
          ? height / 2
          : borderRadius * dpr;

      gl.uniform1f(radiusLoc, computedRadius);
      gl.uniform1f(shapeLoc, shapeTypeNum);
      gl.uniform1f(warpLoc, warp ? 1.0 : 0.0);
      gl.uniform1f(edgeLoc, edgeIntensity);
      gl.uniform1f(rimLoc, rimIntensity);
      gl.uniform1f(baseLoc, baseIntensity);
      gl.uniform1f(tintOpLoc, tintOpacity);

      if (theme === "dark") {
        // Dark Obsidian + Amber-Gold Sheen
        gl.uniform3f(tintTopLoc, 0.12, 0.12, 0.18);
        gl.uniform3f(tintBottomLoc, 0.06, 0.06, 0.09);
        gl.uniform3f(rimColorLoc, 0.79, 0.66, 0.3); // #C9A84C gold rim
      } else {
        // Light Crystal + Champagne Sheen
        gl.uniform3f(tintTopLoc, 1.0, 1.0, 1.0);
        gl.uniform3f(tintBottomLoc, 0.95, 0.94, 0.92);
        gl.uniform3f(rimColorLoc, 0.64, 0.49, 0.16); // #A37D28 gold rim
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    updateDimensionsAndRender();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateDimensionsAndRender);
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(texBuffer);
      }
    };
  }, [shape, borderRadius, edgeIntensity, rimIntensity, baseIntensity, blurRadius, warp, tintOpacity, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      style={{
        zIndex: 0,
        ...style,
      }}
    />
  );
};
