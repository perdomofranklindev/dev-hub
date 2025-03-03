import React from "react";
import { motion } from "framer-motion";
import { GOTCardChipTitle } from "./GOTCardComponents";

interface GOTCardTitlesSectionProps {
  titles: string[];
}

const GOTCardTitlesSection: React.FC<GOTCardTitlesSectionProps> = ({
  titles,
}) => {
  // Ref to access the container of the titles
  const chipContainerRef = React.useRef<HTMLDivElement>(null);

  // State to manage the drag constraints (how far the titles can be dragged)
  const [dragConstraints, setDragConstraints] = React.useState(0);

  // State to determine if the titles are draggable (based on overflow)
  const [isDraggable, setIsDraggable] = React.useState(false);

  React.useEffect(() => {
    const container = chipContainerRef.current;
    if (!container) return;

    // Function to check if the titles overflow and enable/disable dragging
    const updateOverflow = () => {
      // Get the width of the container and the total width of the titles
      const containerWidth = container.offsetWidth;
      const contentWidth = container.scrollWidth;

      // Check if the content overflows the container
      const needsDrag = contentWidth > containerWidth;

      // Enable dragging if there's overflow, disable otherwise
      setIsDraggable(needsDrag);

      // Calculate the maximum drag distance (negative value because we drag to the left)
      const maxDrag = containerWidth - contentWidth;
      setDragConstraints(maxDrag);
    };

    // Initial check for overflow when the component mounts or titles change
    updateOverflow();

    // Set up a ResizeObserver to detect changes in the container's size
    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(container);

    // Cleanup the observer when the component unmounts
    return () => {
      resizeObserver.unobserve(container);
    };
  }, [titles]); // Re-run the effect when the titles change

  return (
    // Motion.div is a draggable container from Framer Motion
    <motion.div
      ref={chipContainerRef} // Attach the ref to the container
      style={{
        display: "flex", // Flex layout for the titles
        overflow: "visible", // Allow titles to overflow visibly
        cursor: isDraggable ? "grab" : "auto", // Change cursor to "grab" if draggable
        marginTop: 8, // Add some spacing above the titles
      }}
      drag={isDraggable ? "x" : false} // Enable horizontal dragging only if titles overflow
      dragConstraints={{
        left: dragConstraints, // Set the left drag limit (negative value for overflow)
        right: 0, // Titles can't be dragged to the right
      }}
      whileTap={{ cursor: isDraggable ? "grabbing" : "auto" }} // Change cursor to "grabbing" while dragging
    >
      {/* Map through the titles and render each one as a chip */}
      {titles.map((title, index) => (
        <GOTCardChipTitle key={index} label={title} color="secondary" />
      ))}
    </motion.div>
  );
};

export default GOTCardTitlesSection;
