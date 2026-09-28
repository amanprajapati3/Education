"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  staggerChildren?: number;
  index?: number;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
  once = true,
  className = "",
  staggerChildren,
  index,
}: ScrollRevealProps) {

  const childDelay = typeof index === "number" && typeof staggerChildren === "number"
    ? delay + index * staggerChildren
    : delay;

  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };

      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 },
        };

      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 },
        };

      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 },
        };

      case "scale":
        return {
          hidden: {
            opacity: 0,
            scale: 0.85,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        };

      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={`${className} will-change-transform`}
      style={{
        transitionProperty: "box-shadow, background-color, border-color, color",
      }}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.1,
        margin: "0px 0px -100px 0px",
      }}
      transition={{
        duration,
        delay: childDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}