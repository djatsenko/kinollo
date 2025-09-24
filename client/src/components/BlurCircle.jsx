// client/src/components/BlurCircle.jsx
import React from "react";

/**
 * Градиентное размытие-кружок.
 *
 * props:
 *  - top/left/right/bottom: позиция (например, "20px" или "10%")
 *  - size: число пикселей (по умолчанию 240)
 *  - color: CSS-цвет (по умолчанию берём primary)
 *  - opacity: 0..1 (по умолчанию 0.3)
 *  - blur: пиксели блюра (по умолчанию 40)
 *  - className: доп. классы
 */
const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  size = 240,
  color = "var(--color-primary, #F84565)",
  opacity = 0.3,
  blur = 40,
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full ${className}`}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        // мягкий градиент вместо плотного фона
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
};

export default BlurCircle;
