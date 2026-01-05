import React from 'react';
import { motion } from 'framer-motion';

const ClinicalLogicGraph = ({ nodes = [], edges = [], activeNodeId }) => {
    return (
        <div className="logic-graph-container" style={{ margin: 'var(--space-6) 0', padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--grey-100)', overflowX: 'auto' }}>
            <svg width="600" height="200" viewBox="0 0 600 200" style={{ display: 'block', margin: '0 auto' }}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--grey-300)" />
                    </marker>
                </defs>

                {/* Edges */}
                {edges.map((edge, i) => (
                    <motion.line
                        key={`edge-${i}`}
                        x1={edge.from.x} y1={edge.from.y}
                        x2={edge.to.x} y2={edge.to.y}
                        stroke="var(--grey-200)"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 + (i * 0.2) }}
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                    <motion.g
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: node.delay || 0 }}
                    >
                        <rect
                            x={node.x - 60}
                            y={node.y - 20}
                            width="120"
                            height="40"
                            rx="4"
                            fill={activeNodeId === node.id ? 'var(--grey-900)' : 'white'}
                            stroke={activeNodeId === node.id ? 'var(--grey-900)' : 'var(--grey-200)'}
                            strokeWidth="1.5"
                            style={{ cursor: 'help' }}
                        />
                        <text
                            x={node.x}
                            y={node.y + 5}
                            textAnchor="middle"
                            fill={activeNodeId === node.id ? 'white' : 'var(--grey-900)'}
                            style={{ fontSize: '10px', fontWeight: '600', pointerEvents: 'none', fontFamily: 'var(--font-sans)' }}
                        >
                            {node.label}
                        </text>
                        {node.source && (
                            <title>{`Source: ${node.source}`}</title>
                        )}
                    </motion.g>
                ))}
            </svg>
            <div style={{ marginTop: 'var(--space-2)', textAlign: 'center', fontSize: '10px', color: 'var(--grey-400)', fontStyle: 'italic' }}>
                Hover over nodes to see clinical source mapping
            </div>
        </div>
    );
};

export default ClinicalLogicGraph;
