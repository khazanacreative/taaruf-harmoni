
import React, { useState, useEffect, useRef } from 'react';

interface CustomSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

const CustomSlider = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  className = '',
}: CustomSliderProps) => {
  const [isDragging, setIsDragging] = useState<number | null>(null); // 0 for min thumb, 1 for max thumb
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleTouchStart = (index: number) => (e: React.TouchEvent) => {
    setIsDragging(index);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging === null || !trackRef.current) return;
      
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = Math.min(Math.max(0, offsetX / rect.width), 1);
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;
      
      if (isDragging === 0) {
        // Dragging minimum thumb
        onChange([Math.min(newValue, value[1] - step), value[1]]);
      } else {
        // Dragging maximum thumb
        onChange([value[0], Math.max(newValue, value[0] + step)]);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging === null || !trackRef.current) return;
      
      const touch = e.touches[0];
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const percentage = Math.min(Math.max(0, offsetX / rect.width), 1);
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;
      
      if (isDragging === 0) {
        // Dragging minimum thumb
        onChange([Math.min(newValue, value[1] - step), value[1]]);
      } else {
        // Dragging maximum thumb
        onChange([value[0], Math.max(newValue, value[0] + step)]);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, min, max, step, value, onChange]);

  // Calculate percentages for positioning
  const minPercentage = ((value[0] - min) / (max - min)) * 100;
  const maxPercentage = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={`relative w-full h-8 ${className}`}>
      <div 
        ref={trackRef}
        className="absolute top-1/2 left-0 w-full h-2 bg-muted rounded-full -translate-y-1/2"
      >
        <div 
          className="absolute h-full bg-taaruf-blue rounded-full"
          style={{ 
            left: `${minPercentage}%`, 
            right: `${100 - maxPercentage}%` 
          }}
        />
      </div>
      
      {/* Min thumb */}
      <div 
        className="absolute top-1/2 w-5 h-5 rounded-full bg-white border-2 border-taaruf-blue shadow-md transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
        style={{ left: `${minPercentage}%` }}
        onMouseDown={handleMouseDown(0)}
        onTouchStart={handleTouchStart(0)}
      />
      
      {/* Max thumb */}
      <div 
        className="absolute top-1/2 w-5 h-5 rounded-full bg-white border-2 border-taaruf-blue shadow-md transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
        style={{ left: `${maxPercentage}%` }}
        onMouseDown={handleMouseDown(1)}
        onTouchStart={handleTouchStart(1)}
      />
    </div>
  );
};

export default CustomSlider;
