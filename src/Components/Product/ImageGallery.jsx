
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images = [], variant, className = "" }) {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const containerRef = useRef(null);

  useEffect(() => {
    setActive(0);
  }, [variant]);

  const onMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  const displayImages = images.length ? images : ["/placeholder.svg"];

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full overflow-hidden rounded-2xl border border-border bg-card"
        style={{ aspectRatio: "4/4" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`${displayImages[active]}-${active}`}
            src={displayImages[active]}
            alt={`Product image ${active + 1}`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: isHovering ? 1.6 : 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transformOrigin,
              transition: "transform 180ms ease-out",
            }}
          />
        </AnimatePresence>

        {variant?.color && (
          <div className="absolute left-3 top-3 rounded-md bg-card/60 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {variant.color}
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-3 items-center overflow-auto px-1 py-1">
        {displayImages.map((src, idx) => (
          <button
            id={`thumb-btn-${idx}`}
            key={`${src}-${idx}`}
            onClick={() => setActive(idx)}
            aria-label={`Show image ${idx + 1}`}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all 
              ${active === idx ? "ring-2 ring-accent scale-105" : "border-border hover:scale-105"}
            `}
          >
            <img
              src={src}
              alt={`thumb-${idx + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
