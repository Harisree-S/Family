import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Smooth mouse movement
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.style.cursor === 'pointer' ||
                e.target.classList.contains('magnetic')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isVisible, cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main Dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#d4af37',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: -4,
                    y: -4,
                }}
            />

            {/* Outer Ring / Glow */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '1px solid #d4af37',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: -20,
                    y: -20,
                    mixBlendMode: 'difference'
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 2 : 1,
                    opacity: isHovering ? 1 : 0.5,
                    backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'transparent' : '#d4af37'
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            />
        </>
    );
};

export default CustomCursor;
