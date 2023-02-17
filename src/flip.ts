import { useRef } from "react";

import { useBrowserLayoutEffect } from "./utils";

export type FlipKey = string | number | symbol;

export type FlipProps = {
  flipKey: FlipKey;
  duration?: number;
  easing?: string;
};

const boxes = new Map<FlipKey, DOMRect>();

export function useFlip({ flipKey, duration = 500, easing = "ease" }: FlipProps) {
  const element = useRef<HTMLElement>();

  const ref = (el: HTMLElement | null) => {
    if (el == null) return;
    element.current = el;
    const oldBox = boxes.get(flipKey);
    if (oldBox != null) {
      boxes.delete(flipKey);
      const newBox = el.getBoundingClientRect();
      animate({ el, oldBox, newBox, duration, easing });
    }
  };

  useBrowserLayoutEffect(() => {
    return () => {
      const el = element.current;
      if (el == null) return;
      const box = el.getBoundingClientRect();
      boxes.set(flipKey, box);
    };
  }, [flipKey]);

  return { ref };
}

function animate({
  el,
  oldBox,
  newBox,
  duration,
  easing,
}: {
  el: HTMLElement;
  oldBox: DOMRect;
  newBox: DOMRect;
  duration: number;
  easing: string;
}) {
  el.animate(
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
