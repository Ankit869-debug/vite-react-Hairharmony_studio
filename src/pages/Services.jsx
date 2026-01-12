import React from 'react';
import { useContent } from '../context/ContentContext';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const { content } = useContent();

    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-serif text-center text-nude-900 mb-16">Our Services</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.services.map((service) => (
                        <div key={service.id} className="bg-nude-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-nude-100 flex flex-col">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-serif text-nude-900">{service.title}</h3>
                                    <span className="bg-white px-3 py-1 rounded-full text-gold-600 font-medium text-sm shadow-sm">
                                        {service.price}
                                    </span>
                                </div>
                                <p className="text-nude-900/70 mb-6 flex-1">{service.description}</p>
                                <ul className="space-y-2 mb-8">
                                    <li className="flex items-center text-sm text-nude-900/80">
                                        <Check size={16} className="text-gold-500 mr-2" /> Premium Products
                                    </li>
                                    <li className="flex items-center text-sm text-nude-900/80">
                                        <Check size={16} className="text-gold-500 mr-2" /> Consultation Included
                                    </li>
                                </ul>
                                <Link
                                    to="/contact"
                                    className="w-full bg-nude-900 text-gold-100 py-3 rounded-lg uppercase tracking-widest text-xs hover:bg-gold-600 transition-colors block text-center"
                                >
                                    Book This Service
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
