import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ width, height, borderRadius = 'var(--radius-md)', className = '' }) => {
    return (
        <motion.div
            className={`skeleton ${className}`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
            }}
            style={{
                width: width || '100%',
                height: height || '1rem',
                background: 'var(--grey-100)',
                borderRadius: borderRadius
            }}
        />
    );
};

export default Skeleton;
