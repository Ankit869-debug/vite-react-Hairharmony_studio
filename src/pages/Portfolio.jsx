import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Play, Image as ImageIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
    const { content } = useContent();
    const location = useLocation();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (location.state && location.state.category) {
            setFilter(location.state.category);
        }
    }, [location.state]);

    const categories = [
        { id: 'all', label: 'All Work' },
        { id: 'bridal', label: 'Bridal' },
        { id: 'editorial', label: 'Editorial' },
        { id: 'party', label: 'Party' }
    ];

    const filteredItems = filter === 'all'
        ? content.portfolio
        : content.portfolio.filter(item => item.category === filter);

    return (
        <div className="pt-24 pb-20 bg-nude-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-serif text-nude-900 mb-8">Our Portfolio</h1>
                    <p className="text-nude-900/60 max-w-2xl mx-auto">
                        Browse through our collection of recent work, showcasing the diverse beauty and transformations we create.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-2 rounded-full uppercase tracking-widest text-xs transition-all ${filter === cat.id
                                ? 'bg-nude-900 text-gold-100 shadow-lg'
                                : 'bg-white text-nude-900 hover:bg-gold-100'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map(item => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-sm bg-nude-200"
                            >
                                {item.type === 'video' ? (
                                    <video
                                        src={item.image}
                                        className="w-full h-full object-cover"
                                        controls
                                        playsInline
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={item.image}
                                            alt="Portfolio"
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-nude-900/20 group-hover:bg-nude-900/40 transition-colors pointer-events-none"></div>

                                        {/* Overlay Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                                <ImageIcon className="text-white" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center text-nude-900/40 py-20 italic">
                        No items found in this category yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
