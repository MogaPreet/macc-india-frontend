'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';

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
    minGap = 1000,
    formatLabel = (v) => `₹${v.toLocaleString('en-IN')}`
}: DualRangeSliderProps) {
    // We maintain a local state to ensure MUI slider drags smoothly without 
    // waiting for the parent component to finish rendering heavy product filters.
    const [localValue, setLocalValue] = useState<number[]>([value[0], value[1]]);
    
    // Inputs state
    const [minInput, setMinInput] = useState(value[0].toString());
    const [maxInput, setMaxInput] = useState(value[1].toString());
    const [minFocused, setMinFocused] = useState(false);
    const [maxFocused, setMaxFocused] = useState(false);

    // Provide a ref to check if we are actively dragging so we don't overwrite localValue
    const isDragging = useRef(false);

    // Sync from parent if we're not actively dragging
    useEffect(() => {
        if (!isDragging.current) {
            setLocalValue([value[0], value[1]]);
            if (!minFocused) setMinInput(Math.round(value[0]).toString());
            if (!maxFocused) setMaxInput(Math.round(value[1]).toString());
        }
    }, [value, minFocused, maxFocused]);

    // Matches the MUI sliding logic behavior exactly as requested
    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        let updatedValue = [...localValue];

        if (activeThumb === 0) {
            updatedValue = [Math.min(newValue[0], localValue[1] - minGap), localValue[1]];
        } else {
            updatedValue = [localValue[0], Math.max(newValue[1], localValue[0] + minGap)];
        }

        setLocalValue(updatedValue);
        // deliberately NOT calling onChange here to prevent realtime lag from heavy parent UI updates
    };

    const handleDragStart = () => {
        isDragging.current = true;
    };

    const handleDragStop = () => {
        isDragging.current = false;
    };

    const commitMinInput = () => {
        const parsed = parseInt(minInput, 10);
        if (isNaN(parsed)) {
            setMinInput(Math.round(localValue[0]).toString());
            return;
        }
        const clamped = Math.max(min, Math.min(parsed, localValue[1] - minGap));
        const newArr: [number, number] = [clamped, localValue[1]];
        setLocalValue(newArr);
        onChange(newArr);
        setMinInput(clamped.toString());
    };

    const commitMaxInput = () => {
        const parsed = parseInt(maxInput, 10);
        if (isNaN(parsed)) {
            setMaxInput(Math.round(localValue[1]).toString());
            return;
        }
        const clamped = Math.min(max, Math.max(parsed, localValue[0] + minGap));
        const newArr: [number, number] = [localValue[0], clamped];
        setLocalValue(newArr);
        onChange(newArr);
        setMaxInput(clamped.toString());
    };

    const handleMinKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            commitMinInput();
            (e.target as HTMLInputElement).blur();
        }
    };

    const handleMaxKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            commitMaxInput();
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div className="space-y-4">
            {/* Editable Price Inputs */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">₹</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={minInput}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^\d]/g, '');
                                setMinInput(val);
                            }}
                            onFocus={() => setMinFocused(true)}
                            onBlur={() => {
                                setMinFocused(false);
                                commitMinInput();
                            }}
                            onKeyDown={handleMinKeyDown}
                            className="w-full pl-6 pr-2 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-center tabular-nums"
                            aria-label="Minimum price"
                        />
                    </div>
                    <span className="text-gray-300 text-sm font-medium select-none leading-none pb-0.5">—</span>
                    <div className="flex-1 relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">₹</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={maxInput}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^\d]/g, '');
                                setMaxInput(val);
                            }}
                            onFocus={() => setMaxFocused(true)}
                            onBlur={() => {
                                setMaxFocused(false);
                                commitMaxInput();
                            }}
                            onKeyDown={handleMaxKeyDown}
                            className="w-full pl-6 pr-2 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-center tabular-nums"
                            aria-label="Maximum price"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex-1 text-[10px] text-gray-400 text-center">Min</span>
                    <span className="text-sm select-none invisible">—</span>
                    <span className="flex-1 text-[10px] text-gray-400 text-center">Max</span>
                </div>
            </div>

            {/* MUI Slider wrapped in a container with padding so thumbs aren't cropped */}
            <div className="px-2 pt-2">
                <Slider
                    min={min}
                    max={max}
                    step={1}
                    value={localValue}
                    onChange={handleChange}
                    onChangeCommitted={handleDragStop}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                    disableSwap
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `₹${v.toLocaleString('en-IN')}`}
                    sx={{
                        color: '#06b6d4',
                        height: 6,
                        '& .MuiSlider-track': {
                            border: 'none',
                            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#e5e7eb',
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb': {
                            height: 24,
                            width: 24,
                            backgroundColor: '#fff',
                            border: '3px solid white',
                            background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                boxShadow: '0px 0px 0px 8px rgba(6, 182, 212, 0.16)',
                            },
                            '&.Mui-active': {
                                boxShadow: '0px 0px 0px 14px rgba(6, 182, 212, 0.16)',
                            },
                        },
                    }}
                />
            </div>

            {/* Range labels beneath slider */}
            <div className="flex items-center justify-between text-[10px] text-gray-400 -mt-3">
                <span>{formatLabel(min)}</span>
                <span>{formatLabel(max)}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button
                    onClick={() => {
                        const all: [number, number] = [min, max];
                        setLocalValue(all);
                        onChange(all);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex-1 text-center
                        ${localValue[0] === min && localValue[1] === max
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200/50'
                        }`}
                    disabled={localValue[0] === min && localValue[1] === max}
                >
                    Clear
                </button>
                <button
                    onClick={() => onChange([localValue[0], localValue[1]])}
                    className="flex-[2] px-3 py-1.5 text-xs font-semibold rounded-lg transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-sm hover:shadow active:scale-[0.98]"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
}
