import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, LayoutDashboard, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAdmin, content } = useContent();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(content.musicConfig?.volume || 0.5);
    const audioRef = React.useRef(null);

    // Sync volume with context/changes
    useEffect(() => {
        if (content.musicConfig) {
            // Only set defaults on first load if we want to respect user preference, 
            // but here we sync with global setting if meaningful change.
            // Actually, let's just initialize.
        }
    }, [content.musicConfig]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = content.musicConfig?.url || "";
            audioRef.current.volume = volume;
            if (content.musicConfig?.autoPlay) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blocked", e));
            }
        }
    }, [content.musicConfig?.url]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Play error:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (newVol) => {
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
        }
    };

    const toggleMute = () => {
        if (volume > 0) {
            handleVolumeChange(0);
        } else {
            handleVolumeChange(content.musicConfig?.volume || 0.5);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Contact', href: '/contact' },
        { name: 'Rate Us', href: '/rate-us' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-serif text-nude-900 tracking-wider font-bold">
                        HAIRHARMONY
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold-600">
                        Studio
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-nude-900 hover:text-gold-500 text-sm tracking-wide font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section / Mobile Toggle */}
                <div className="flex items-center space-x-4">
                    {/* Music Player */}
                    <div className="hidden md:flex items-center gap-2 mr-4 bg-nude-100/50 p-1.5 rounded-full border border-nude-200">
                        <button
                            onClick={togglePlay}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-nude-900 text-gold-100 hover:bg-gold-600 transition-colors"
                        >
                            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                        </button>
                        <div className="flex items-center gap-1.5 pr-2 group relative">
                            <button
                                onClick={toggleMute}
                                className="text-nude-900 hover:text-gold-600 transition-colors"
                            >
                                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 flex items-center">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                    className="w-20 h-1 bg-nude-300 rounded-lg appearance-none cursor-pointer accent-gold-500"
                                />
                            </div>
                        </div>
                    </div>

                    <audio ref={audioRef} loop />

                    <a
                        href="https://www.instagram.com/hairharmony_studio_?igsh=NWFlbHUyZmEwdGQ3"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:flex text-nude-900 hover:text-gold-500 transition-colors"
                    >
                        <Instagram size={20} />
                    </a>

                    <Link
                        to="/contact"
                        className="hidden md:block bg-nude-900 text-gold-100 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all transform hover:scale-105"
                    >
                        Book Now
                    </Link>

                    {isAdmin && (
                        <Link
                            to="/admin/dashboard"
                            className="hidden md:flex items-center gap-2 text-nude-900 hover:text-gold-600 font-medium text-sm border-l border-nude-200 pl-4"
                            title="Admin Dashboard"
                        >
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>
                    )}

                    <button
                        className="md:hidden text-nude-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-8 px-6 flex flex-col items-center space-y-6 animate-fade-in border-t border-gray-100">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-nude-900 text-lg font-serif hover:text-gold-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-nude-900 text-gold-100 px-8 py-3 rounded-full text-sm uppercase tracking-widest w-full text-center">
                        Book Appointment
                    </Link>
                    {isAdmin && (
                        <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-nude-900 hover:text-gold-500 text-sm font-medium flex items-center gap-2">
                            <LayoutDashboard size={18} />
                            Admin Dashboard
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
