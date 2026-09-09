"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LiquidGlassButton } from "./LiquidGlassButton";

export interface LiquidGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/60 dark:bg-black/80 backdrop-blur-[5px] transition-all"
          />

          {/* Liquid Glass Modal Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`liquid-glass-container liquid-glass-rim relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-sky-400/30 dark:border-sky-300/40 shadow-2xl ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-sky-400/20 dark:border-sky-300/25">
              {title && (
                <h3 className="editorial-subheading text-xl sm:text-2xl font-bold text-neutral-900 dark:text-sky-100">
                  {title}
                </h3>
              )}
              <LiquidGlassButton
                size="icon"
                shape="circle"
                variant="secondary"
                onClick={onClose}
                aria-label="Close modal"
                className="ml-auto"
              >
                <X className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
              </LiquidGlassButton>
            </div>

            {/* Modal Body */}
            <div className="relative z-10">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
