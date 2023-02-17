import { isEqual } from "lodash";
import { useRef } from "react";

import { useBrowserLayoutEffect } from "./utils";

export type FlipKey = string | number | symbol;

export type FlipProps = {
  flipKey: FlipKey;
  duration?: number;
  easing?: string;
  onCancel?: () => void;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
};

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const boxes = new Map<FlipKey, Box>();

export function useFlip({
  flipKey,
  duration = 250,
  easing = "ease-in-out",
  onCancel,
  onAnimationStart,
  onAnimationEnd,
}: FlipProps) {
  const element = useRef<HTMLElement>();

  // Animate on mount
  const ref = (el: HTMLElement | null) => {
    if (el == null) return;
    element.current = el;
    const oldBox = boxes.get(flipKey);
    const newBox = getBox(el);
    boxes.delete(flipKey);
    if (oldBox == null || isEqual(oldBox, newBox)) {
      onCancel?.();
      return;
    }
    onAnimationStart?.();
    const animation = animate({ el, oldBox, newBox, duration, easing });
    animation.finished.then(() => {
      onAnimationEnd?.();
    });
  };

  // Save box before unmount
  useBrowserLayoutEffect(() => {
    return () => {
      const el = element.current;
      if (el == null) return;
      const box = getBox(el);
      boxes.set(flipKey, box);
    };
  }, [flipKey]);

  return { ref };
}

function getBox(el: HTMLElement): Box {
  const { left, top, width, height } = el.getBoundingClientRect();
  return { left, top, width, height };
}

function animate({
  el,
  oldBox,
  newBox,
  duration,
  easing,
}: {
  el: HTMLElement;
  oldBox: Box;
  newBox: Box;
  duration: number;
  easing: string;
}) {
  return el.animate(
    [
      {
        transformOrigin: "0 0",
        transform: `
          translateX(${oldBox.left - newBox.left}px)
          translateY(${oldBox.top - newBox.top}px)
          scaleX(${oldBox.width / newBox.width})
          scaleY(${oldBox.height / newBox.height})
        `,
      },
      {
        transformOrigin: "0 0",
        transform: "translateX(0) translateY(0) scaleX(1) scaleY(1)",
      },
    ],
    { duration, easing, iterations: 1 }
  );
}
