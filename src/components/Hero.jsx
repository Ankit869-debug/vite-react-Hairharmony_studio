import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop"
                    alt="Luxury Makeup"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-nude-50/90 to-nude-100/40 backdrop-blur-[1px]"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center md:text-left pt-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="flex items-center justify-center md:justify-start gap-4 mb-6"
                    >
                        <span className="h-[1px] w-12 bg-nude-900/50"></span>
                        <span className="text-sm uppercase tracking-[0.3em] text-nude-900 font-medium">Est. 2024</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-serif text-nude-900 leading-[1.1] mb-6">
                        Enhancing Beauty, <br />
                        <span className="italic text-gold-600">Creating Confidence</span>
                    </h1>

                    <p className="text-nude-900/80 text-lg md:text-xl font-light mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Experience the art of bespoke makeup artistry. Using only premium products to reveal your most radiant self.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                        <Link to="/contact" className="bg-nude-900 text-gold-100 px-8 py-4 rounded-full min-w-[180px] uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                            Book Appointment
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/portfolio" className="flex items-center gap-3 text-nude-900 group hover:text-gold-600 transition-colors px-6 py-4">
                            <div className="w-10 h-10 rounded-full border border-nude-900/30 flex items-center justify-center group-hover:border-gold-600 transition-colors">
                                <Play size={14} fill="currentColor" />
                            </div>
                            <span className="uppercase tracking-widest text-sm font-medium">View Portfolio</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-6 mt-12">
                        <a href="https://www.instagram.com/hairharmony_studio_?igsh=NWFlbHUyZmEwdGQ3" target="_blank" rel="noopener noreferrer" className="text-nude-900 hover:text-gold-600 transition-colors p-2 bg-white/50 rounded-full hover:bg-white/80">
                            <Instagram size={24} />
                        </a>
                        <a href="https://wa.me/qr/A7XIKKET6HYYO1" target="_blank" rel="noopener noreferrer" className="text-nude-900 hover:text-green-600 transition-colors p-2 bg-white/50 rounded-full hover:bg-white/80">
                            <MessageCircle size={24} />
                        </a>
                        <a href="https://youtube.com/@hairharmony_studio_-y7k?si=s7Z-GQ5Bk6aoAqs-" target="_blank" rel="noopener noreferrer" className="text-nude-900 hover:text-red-600 transition-colors p-2 bg-white/50 rounded-full hover:bg-white/80">
                            <Youtube size={24} />
                        </a>
                        <a href="https://pin.it/4yaIcRZC7" target="_blank" rel="noopener noreferrer" className="text-nude-900 hover:text-red-700 transition-colors p-2 bg-white/50 rounded-full hover:bg-white/80">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pinterest">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M8 20l4-9"></path>
                                <path d="M10.7 14c.43-.9 1.1-1.2 2.3-1.2 1.3 0 2.3.8 2.3 2.6 0 2.2-1.6 3.4-3.2 3.4-1.2 0-1.8-.8-1.8-.8"></path>
                            </svg>
                        </a>
                    </div>
                </motion.div>

                {/* Hero Image / Composition */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="hidden md:block relative h-[600px]"
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] h-[90%] rounded-t-[100px] rounded-b-[100px] overflow-hidden border-4 border-white shadow-2xl z-20">
                        <img
                            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop"
                            alt="Portrait"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-[10%] w-full h-full border border-gold-400/30 rounded-t-[100px] rounded-b-[100px] z-10 transform translate-x-8 -translate-y-8"></div>

                    <div className="absolute bottom-1/3 left-0 glass-card p-6 rounded-2xl z-30 max-w-[200px] animate-slide-up">
                        <p className="text-3xl font-serif text-nude-900 mb-1">5★</p>
                        <p className="text-sm text-nude-900/70">"Absolutely the best makeup experience of my life!"</p>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest text-nude-900">Scroll</span>
                <div className="w-[1px] h-12 bg-nude-900"></div>
            </div>
        </section>
    );
};

export default Hero;
