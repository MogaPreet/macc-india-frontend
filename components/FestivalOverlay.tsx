'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Festival definitions with date ranges
interface Festival {
    name: string;
    startMonth: number; // 1-indexed
    startDay: number;
    endMonth: number;
    endDay: number;
    component: React.FC;
}

// Kite colors for Uttarayan
const KITE_COLORS = [
    { body: '#FF6B35', tail: '#FF8C5A' },  // Orange
    { body: '#F7C948', tail: '#FFE066' },  // Yellow
    { body: '#E63946', tail: '#FF6B6B' },  // Red
    { body: '#2D9CDB', tail: '#56CCF2' },  // Blue
    { body: '#27AE60', tail: '#6FCF97' },  // Green
    { body: '#9B59B6', tail: '#BB8FCE' },  // Purple
    { body: '#E91E63', tail: '#F48FB1' },  // Pink
    { body: '#00BCD4', tail: '#4DD0E1' },  // Cyan
];

// Individual Kite component
interface KiteProps {
    id: number;
    initialX: number;
    initialY: number;
    color: { body: string; tail: string };
    size: number;
    delay: number;
    duration: number;
    shouldCut?: boolean;
    cutDelay?: number;
}

function Kite({ id, initialX, initialY, color, size, delay, duration, shouldCut, cutDelay }: KiteProps) {
    const [isCut, setIsCut] = useState(false);

    useEffect(() => {
        if (shouldCut && cutDelay) {
            const timer = setTimeout(() => {
                setIsCut(true);
            }, cutDelay);
            return () => clearTimeout(timer);
        }
    }, [shouldCut, cutDelay]);

    // Flying animation path
    const flyingVariants = {
        animate: {
            x: [initialX, initialX + 100, initialX - 50, initialX + 150, initialX],
            y: [initialY, initialY - 80, initialY - 40, initialY - 120, initialY],
            rotate: [-15, 10, -20, 15, -15],
            transition: {
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: delay,
            }
        }
    };

    // Falling animation when cut
    const fallingVariants = {
        initial: { opacity: 1 },
        animate: {
            y: [0, 800],
            x: [0, Math.random() > 0.5 ? 200 : -200],
            rotate: [0, 720],
            opacity: [1, 1, 0],
            transition: {
                duration: 3,
                ease: "easeIn" as const,
            }
        }
    };

    return (
        <motion.div
            key={`kite-${id}-${isCut ? 'cut' : 'flying'}`}
            className="absolute pointer-events-none"
            style={{ left: initialX, top: initialY }}
            variants={isCut ? fallingVariants : flyingVariants}
            initial={isCut ? "initial" : undefined}
            animate="animate"
        >
            {/* Kite SVG */}
            <svg
                width={size}
                height={size * 1.2}
                viewBox="0 0 100 120"
                className="drop-shadow-lg"
            >
                {/* Kite body - diamond shape */}
                <polygon
                    points="50,0 100,50 50,100 0,50"
                    fill={color.body}
                    stroke="white"
                    strokeWidth="2"
                />
                {/* Cross sticks */}
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                {/* Decorative pattern */}
                <circle cx="50" cy="50" r="15" fill="white" opacity="0.3" />

                {/* Tail */}
                <motion.path
                    d={`M 50 100 Q 60 120 50 140 Q 40 160 50 180`}
                    fill="none"
                    stroke={color.tail}
                    strokeWidth="3"
                    animate={{
                        d: [
                            "M 50 100 Q 60 120 50 140 Q 40 160 50 180",
                            "M 50 100 Q 40 120 50 140 Q 60 160 50 180",
                            "M 50 100 Q 60 120 50 140 Q 40 160 50 180",
                        ]
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {/* Tail ribbons */}
                {[1, 2, 3].map((i) => (
                    <motion.circle
                        key={i}
                        cx="50"
                        cy={100 + i * 25}
                        r="4"
                        fill={i % 2 === 0 ? color.body : color.tail}
                        animate={{
                            cx: [50, 45 + i * 3, 55 - i * 3, 50],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.1
                        }}
                    />
                ))}
            </svg>

            {/* Thread/Manja */}
            {!isCut && (
                <motion.div
                    className="absolute"
                    style={{
                        left: size / 2,
                        top: size * 0.6,
                        width: '1px',
                        height: '100px',
                        background: `linear-gradient(to bottom, white, transparent)`,
                        transformOrigin: 'top',
                    }}
                    animate={{
                        rotate: [-5, 5, -5],
                        scaleY: [1, 0.9, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}
        </motion.div>
    );
}

// Kite Festival (Uttarayan) Animation Component
function KiteFestivalAnimation() {
    // Fixed positions for 4 kites - positioned in hero area
    const kiteConfigs: KiteProps[] = [
        {
            id: 0,
            initialX: 8,
            initialY: 15,
            color: KITE_COLORS[0], // Orange
            size: 35,
            delay: 0,
            duration: 10,
            shouldCut: false,
        },
        {
            id: 1,
            initialX: 85,
            initialY: 20,
            color: KITE_COLORS[3], // Blue
            size: 40,
            delay: 0.5,
            duration: 12,
            shouldCut: false,
        },
        {
            id: 2,
            initialX: 55,
            initialY: 12,
            color: KITE_COLORS[1], // Yellow
            size: 32,
            delay: 1,
            duration: 9,
            shouldCut: false,
        },
        {
            id: 3,
            initialX: 25,
            initialY: 25,
            color: KITE_COLORS[2], // Red
            size: 38,
            delay: 1.5,
            duration: 11,
            shouldCut: false,
        },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {/* Kites - positioned using percentage-based values */}
            <AnimatePresence>
                {kiteConfigs.map((kite) => (
                    <motion.div
                        key={kite.id}
                        className="absolute pointer-events-none scale-50 md:scale-75 lg:scale-100"
                        style={{
                            left: `${kite.initialX}%`,
                            top: `${kite.initialY}%`
                        }}
                        animate={{
                            x: [0, 30, -20, 40, 0],
                            y: [0, -25, -10, -35, 0],
                            rotate: [-15, 10, -20, 15, -15],
                        }}
                        transition={{
                            duration: kite.duration,
                            repeat: Infinity,
                            ease: "easeInOut" as const,
                            delay: kite.delay,
                        }}
                    >
                        <Kite {...kite} initialX={0} initialY={0} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// Festival detection and rendering
export default function FestivalOverlay() {
    const [currentFestival, setCurrentFestival] = useState<string | null>(null);

    useEffect(() => {
        const today = new Date();
        const month = today.getMonth() + 1; // 1-indexed
        const day = today.getDate();

        // Festival definitions
        const festivals: Festival[] = [
            {
                name: 'uttarayan',
                startMonth: 1,
                startDay: 10,
                endMonth: 1,
                endDay: 16,
                component: KiteFestivalAnimation,
            },
            // Add more festivals here in the future
            // {
            //     name: 'republic-day',
            //     startMonth: 1,
            //     startDay: 25,
            //     endMonth: 1,
            //     endDay: 27,
            //     component: RepublicDayAnimation,
            // },
        ];

        // Check if today falls within any festival date range
        for (const festival of festivals) {
            const inRange = isDateInRange(month, day, festival);
            if (inRange) {
                setCurrentFestival(festival.name);
                break;
            }
        }
    }, []);

    // Helper to check if current date is within festival range
    const isDateInRange = (month: number, day: number, festival: Festival): boolean => {
        // Handle same month case
        if (festival.startMonth === festival.endMonth) {
            return month === festival.startMonth && day >= festival.startDay && day <= festival.endDay;
        }
        // Handle cross-month case
        if (month === festival.startMonth && day >= festival.startDay) return true;
        if (month === festival.endMonth && day <= festival.endDay) return true;
        if (month > festival.startMonth && month < festival.endMonth) return true;
        return false;
    };

    // Render the appropriate festival animation
    if (currentFestival === 'uttarayan') {
        return <KiteFestivalAnimation />;
    }

    // No festival active
    return null;
}
