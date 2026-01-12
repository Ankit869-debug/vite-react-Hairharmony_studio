import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { useContent } from '../context/ContentContext';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const { content } = useContent();

    const getPortfolioCategory = (title) => {
        const t = title.toLowerCase();
        if (t.includes('makeup') || t.includes('bridal')) return 'bridal';
        if (t.includes('party') || t.includes('occasion')) return 'party';
        if (t.includes('editorial') || t.includes('photoshoot')) return 'editorial';
        return 'all';
    };

    return (
        <div className="pt-0">
            <Hero />

            {/* Featured Services Preview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold-600 uppercase tracking-widest text-xs font-bold">Our Expertise</span>
                        <h2 className="text-4xl font-serif text-nude-900 mt-2">Signature Services</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.services.slice(0, 3).map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                className="group"
                            >
                                <div className="relative h-[400px] overflow-hidden mb-6 rounded-lg cursor-pointer">
                                    <div className="absolute inset-0 bg-nude-900/10 group-hover:bg-nude-900/0 transition-colors z-10"></div>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif text-nude-900 mb-2">{service.title}</h3>
                                <p className="text-nude-900/60 mb-4 line-clamp-2">{service.description}</p>
                                <Link
                                    to="/portfolio"
                                    state={{ category: getPortfolioCategory(service.title) }}
                                    className="inline-flex items-center text-gold-600 text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                                >
                                    Explore <ArrowRight size={14} className="ml-2" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Happy Clients (Reviews) */}
            <section className="py-20 bg-nude-50">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Star size={24} className="text-gold-500 mx-auto mb-6" fill="currentColor" />
                    <h2 className="text-3xl md:text-4xl font-serif text-nude-900 mb-12">Happy Clients</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {content.reviews && content.reviews.slice(0, 4).map((review) => (
                            <div key={review.id} className="bg-white p-8 rounded-xl shadow-sm border border-nude-100 text-left">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex text-gold-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-nude-200"} />
                                        ))}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-nude-900/40">{review.date}</span>
                                </div>
                                <p className="text-nude-900/80 italic mb-6 min-h-[60px]">"{review.text}"</p>
                                <div>
                                    <p className="font-serif text-lg text-nude-900">{review.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-gold-600">Verified Client</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <a href="/rate-us" className="text-nude-900 border-b border-nude-900 pb-1 text-xs uppercase tracking-widest hover:text-gold-600 hover:border-gold-600 transition-colors">
                            Leave a Review
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
