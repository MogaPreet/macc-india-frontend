'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

interface DualRangeSliderProps {
    min: number;
    max: number;
    step: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    minGap?: number;
    formatLabel?: (value: number) => string;
}

export default function DualRangeSlider({
    min,
    max,
    step,
    value,
    onChange,
    minGap = 5000,
    formatLabel = (v) => `₹${v.toLocaleString('en-IN')}`
}: DualRangeSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const getValueFromPosition = useCallback((clientX: number) => {
        if (!trackRef.current) return min;
        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percentage * (max - min);
        // Round to nearest step
        return Math.round(rawValue / step) * step;
    }, [min, max, step]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        setDragging(handle);
    };

    const handleMove = useCallback((clientX: number) => {
        if (!dragging) return;

        const newValue = getValueFromPosition(clientX);

        if (dragging === 'min') {
            const clampedMin = Math.max(min, Math.min(newValue, value[1] - minGap));
            if (clampedMin !== value[0]) {
                onChange([clampedMin, value[1]]);
            }
        } else {
            const clampedMax = Math.min(max, Math.max(newValue, value[0] + minGap));
            if (clampedMax !== value[1]) {
                onChange([value[0], clampedMax]);
            }
        }
    }, [dragging, getValueFromPosition, min, max, minGap, value, onChange]);

    const handleEnd = useCallback(() => {
        setDragging(null);
    }, []);

    // Global mouse/touch move and up handlers
    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                handleMove(e.touches[0].clientX);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [dragging, handleMove, handleEnd]);

    // Handle track click to move nearest thumb
    const handleTrackClick = (e: React.MouseEvent) => {
        const clickValue = getValueFromPosition(e.clientX);
        const distToMin = Math.abs(clickValue - value[0]);
        const distToMax = Math.abs(clickValue - value[1]);

        if (distToMin < distToMax) {
            const clampedMin = Math.max(min, Math.min(clickValue, value[1] - minGap));
            onChange([clampedMin, value[1]]);
        } else {
            const clampedMax = Math.min(max, Math.max(clickValue, value[0] + minGap));
            onChange([value[0], clampedMax]);
        }
    };

    return (
        <div className="space-y-3">
            {/* Labels */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">{formatLabel(value[0])}</span>
                <span className="font-medium">{formatLabel(value[1])}</span>
            </div>

            {/* Slider */}
            <div
                ref={trackRef}
                className="relative h-10 flex items-center cursor-pointer select-none"
                onClick={handleTrackClick}
            >
                {/* Track background */}
                <div className="absolute w-full h-2 bg-gray-200 rounded-full">
                    {/* Active range */}
                    <div
                        className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        style={{
                            left: `${getPercentage(value[0])}%`,
                            right: `${100 - getPercentage(value[1])}%`
                        }}
                    />
                </div>

                {/* Min Thumb */}
                <div
                    className={`absolute w-6 h-6 -ml-3 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-[3px] border-white shadow-lg cursor-grab transition-transform ${dragging === 'min' ? 'scale-110 cursor-grabbing shadow-xl' : 'hover:scale-110'}`}
                    style={{ left: `${getPercentage(value[0])}%` }}
                    onMouseDown={(e) => handleMouseDown(e, 'min')}
                    onTouchStart={(e) => handleMouseDown(e, 'min')}
                    onClick={(e) => e.stopPropagation()}
                />

                {/* Max Thumb */}
                <div
                    className={`absolute w-6 h-6 -ml-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-[3px] border-white shadow-lg cursor-grab transition-transform ${dragging === 'max' ? 'scale-110 cursor-grabbing shadow-xl' : 'hover:scale-110'}`}
                    style={{ left: `${getPercentage(value[1])}%` }}
                    onMouseDown={(e) => handleMouseDown(e, 'max')}
                    onTouchStart={(e) => handleMouseDown(e, 'max')}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {/* Reset button */}
            <div className="flex gap-2">
                <button
                    onClick={() => onChange([min, max])}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${value[0] === min && value[1] === max
                            ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    All
                </button>
            </div>
        </div>
    );
}
