import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

const About = () => {
    const { content } = useContent();

    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[3/4] rounded-t-[150px] overflow-hidden border-8 border-nude-50 shadow-2xl relative z-20">
                            <img
                                src={content.about.image} 
                                alt={content.about.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-10 -left-10 w-full h-full border-2 border-gold-400/30 rounded-t-[150px] -z-10"></div>
                        <div className="absolute bottom-10 -right-10 w-full h-full bg-nude-50 rounded-t-[150px] -z-20"></div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2">
                        <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">About the Artist</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-nude-900 mb-6">{content.about.name}</h1>
                        <h3 className="text-xl font-medium text-nude-900/80 mb-8 font-serif italic">{content.about.role}</h3>

                        <div className="space-y-6 text-nude-900/70 leading-relaxed font-light text-lg">
                            <p>
                                {content.about.bio}
                            </p>
                            <p>
                                I am a dedicated and passionate Makeup and Hair Stylist with over 3 years of professional experience in the beauty industry. I began my journey at the age of 18, and at 21, I bring with me strong hands-on expertise, creativity, and confidence gained from working with a wide variety of clients. Over the years, I have styled and worked with many individuals, understanding different face shapes, hair textures, and personal preferences to create looks that are elegant, balanced, and timeless. My work focuses on enhancing natural features through well-blended makeup and carefully styled hair, ensuring every client feels confident and comfortable in their own skin. I believe makeup and hairstyling should complement personality rather than overpower it. Along with technical skills, I am known for my polite behavior, friendly communication, and professional attitude, which helps build trust and comfort with every client. I make it a priority to listen carefully, maintain hygiene, and deliver quality results with patience and dedication. For me, makeup and hairstyling is not just a profession—it is a passion that I continue to grow with every client, every look, and every experience.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-nude-100 pt-8">
                            <div>
                                <span className="block text-3xl font-serif text-nude-900">3+</span>
                                <span className="text-xs uppercase tracking-widest text-nude-900/50">Years Exp.</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-serif text-nude-900">20+</span>
                                <span className="text-xs uppercase tracking-widest text-nude-900/50">Brides</span>
                            </div>
                        </div>

                        <Link to="/contact" className="mt-12 inline-block bg-nude-900 text-gold-100 px-10 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors shadow-lg">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;




