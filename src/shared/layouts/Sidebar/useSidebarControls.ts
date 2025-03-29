import { PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface UseSidebarControlProps {
  isOpen: boolean;
  width: number;
  direction: 'left' | 'right';
  swipeable?: boolean;
  onClose?: () => void;
}

const useSidebarControls = ({
  isOpen,
  width,
  direction,
  swipeable,
  onClose,
}: UseSidebarControlProps) => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  // Calculate initial position based on open state and direction
  const initialX = isOpen ? 0 : direction === 'left' ? -width : width;

  // Main animation effect triggered by isOpen changes
  useEffect(() => {
    if (!isDragging) {
      const targetX = isOpen ? 0 : direction === 'left' ? -width : width;
      controls.start({
        x: targetX,
        transition: { type: 'spring', stiffness: 400, damping: 40 },
      });
    }
  }, [isOpen, controls, direction, width, isDragging]);

  //#region Drag Handlers
  const handleDragStart = () => {
    if (!swipeable || !isOpen) return;
    setIsDragging(true);
    // Store initial position when drag starts
    dragStartX.current = isOpen ? 0 : direction === 'left' ? -width : width;
  };

  const handleDrag = (_: any, info: PanInfo) => {
    if (!swipeable || !isOpen) return;
    // Calculate current position with boundary constraints
    const currentX = dragStartX.current + info.offset.x;

    // For left-side sidebar:
    // - Only allow dragging rightward (positive movement) up to 0px
    // - Prevent dragging left past the closed position
    if (direction === 'left') {
      controls.set({ x: Math.min(currentX, 0) });
    } else {
      controls.set({ x: Math.max(currentX, 0) });
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!swipeable || !isOpen) return;
    setIsDragging(false);

    // Swipe detection thresholds
    const distanceThreshold = width * 0.3; // 30% of sidebar width
    const velocityThreshold = 500; // Minimum swipe velocity - px/second

    // Determine swipe direction and closure conditions
    let shouldClose = false;
    if (direction === 'left') {
      shouldClose = info.offset.x < -distanceThreshold || info.velocity.x < -velocityThreshold;
    } else {
      shouldClose = info.offset.x > distanceThreshold || info.velocity.x > velocityThreshold;
    }

    // Trigger close callback or return to open position
    if (shouldClose && onClose) {
      onClose();
    } else {
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 400, damping: 40 },
      });
    }
  };

  return {
    controls,
    initialX,
    dragHandlers: {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
  };
};

export default useSidebarControls;
