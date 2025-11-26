import React from 'react';
import { familyMembers } from '../data/familyData';
import { Calendar, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const EventsSection = () => {
    return (
        <section style={styles.section}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Celebrations
                </motion.h2>
                <div style={styles.grid}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={styles.column}
                    >
                        <h3 style={styles.subTitle}>
                            <Gift size={24} style={{ marginRight: '10px' }} /> Birthdays
                        </h3>
                        <ul style={styles.list}>
                            {familyMembers.map((member, index) => (
                                member.birthday && (
                                    <motion.li
                                        key={member.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        style={styles.listItem}
                                    >
                                        <span style={styles.date}>{new Date(member.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                                        <span style={styles.name}>{member.name}</span>
                                    </motion.li>
                                )
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={styles.column}
                    >
                        <h3 style={styles.subTitle}>
                            <Calendar size={24} style={{ marginRight: '10px' }} /> Anniversaries
                        </h3>
                        <ul style={styles.list}>
                            {[
                                { names: "Appa & Amma", date: "1990-04-30" },
                                { names: "Prabhu & Suku", date: "2023-04-16" },
                                { names: "Arjun & Sneha", date: "2025-06-29" }
                            ].map((couple, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    style={styles.listItem}
                                >
                                    <span style={styles.date}>{new Date(couple.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                                    <span style={styles.name}>{couple.names}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '5rem 0',
        backgroundColor: '#0a0a0a', // Dark bg
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
    },
    column: {
        backgroundColor: '#111', // Dark column
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        border: '1px solid #333',
    },
    subTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        color: '#d4af37', // Gold
        borderBottom: '1px solid #333',
        paddingBottom: '1rem',
    },
    list: {
        padding: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 0',
        borderBottom: '1px dashed #333',
        fontSize: '1.1rem',
    },
    date: {
        fontWeight: '600',
        color: '#fff',
    },
    name: {
        color: '#888',
    }
};

export default EventsSection;
