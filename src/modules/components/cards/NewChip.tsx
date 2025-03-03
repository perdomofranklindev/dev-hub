import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material";

const NewChip = ({ label }: { label: string }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [clickPosition, setClickPosition] = useState({
    x: 0,
    y: 0,
    radius: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const theme = useTheme();

  // Color configurations
  const defaultBg = "#e0e0e0";
  const selectedBg = "#2196f3";
  const defaultText = "#000000";
  const contrastText = "#ffffff";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    // Calculate click position relative to the button
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate maximum radius needed to cover entire button
    const corners = [
      { x: 0, y: 0 },
      { x: rect.width, y: 0 },
      { x: 0, y: rect.height },
      { x: rect.width, y: rect.height },
    ];
    let maxRadius = 0;
    corners.forEach((corner) => {
      const dx = corner.x - x;
      const dy = corner.y - y;
      const radius = Math.sqrt(dx * dx + dy * dy);
      maxRadius = Math.max(maxRadius, radius);
    });

    setClickPosition({ x, y, radius: maxRadius });
    setIsSelected(!isSelected);
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{
        position: "relative",
        background: defaultBg,
        border: "none",
        padding: "8px 16px",
        borderRadius: "999px",
        cursor: "pointer",
        overflow: "hidden",
        fontSize: "14px",
        fontWeight: 500,
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleClick}
      animate={{
        backgroundColor: isSelected ? selectedBg : defaultBg,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      {/* Default text */}
      <span style={{ color: defaultText, position: "relative", zIndex: 2 }}>
        {label}
      </span>

      {/* Contrast text with clip-path animation */}
      {isSelected && (
        <motion.span
          style={{
            color: contrastText,
            position: "absolute",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            clipPath: `circle(0 at ${clickPosition.x}px ${clickPosition.y}px)`,
            zIndex: 3,
          }}
          animate={{
            clipPath: `circle(${clickPosition.radius}px at ${clickPosition.x}px ${clickPosition.y}px)`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      )}

      {/* Wave background */}
      {isSelected && (
        <motion.div
          style={{
            position: "absolute",
            left: clickPosition.x,
            top: clickPosition.y,
            width: "1px",
            height: "1px",
            borderRadius: "50%",
            backgroundColor: selectedBg,
            transformOrigin: "center",
            zIndex: 1,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: clickPosition.radius * 2 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

export default NewChip;
