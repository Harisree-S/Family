import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.98,
        filter: 'blur(10px)'
    },
    in: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)'
    },
    out: {
        opacity: 0,
        scale: 1.02,
        filter: 'blur(10px)'
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', willChange: 'transform, opacity, filter' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
