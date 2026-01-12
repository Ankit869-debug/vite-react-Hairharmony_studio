import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Phone, Mail, MapPin, Instagram, MessageCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
    const { content, addBooking } = useContent();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'bridal',
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Submit to FormSubmit.co (Real Email)
        try {
            await fetch("https://formsubmit.co/ajax/khandelwalkritika851@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "New Booking via Harmony Studio",
                    ...formData
                })
            });
        } catch (err) {
            console.error("Email submission error:", err);
        }

        // Submit to Local Mock Store (Admin Dashboard)
        addBooking(formData);

        // UI Feedback
        setSubmitted(true);
        // Reset form after delay
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: 'bridal',
                date: '',
                message: ''
            });
        }, 5000);
    };

    return (
        <div className="pt-24 pb-20 bg-nude-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-nude-900 mb-4">Book Your Appointment</h1>
                    {submitted ? (
                        <div className="bg-green-100 border border-green-200 text-green-800 px-6 py-3 rounded-lg inline-flex items-center gap-2 animate-fade-in mx-auto">
                            <CheckCircle size={20} />
                            <span>Request sent successfully! We will contact you soon.</span>
                        </div>
                    ) : (
                        <p className="text-nude-900/60 max-w-xl mx-auto">
                            Ready to create your perfect look? Fill out the form below or contact us directly.
                        </p>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-nude-900 text-gold-50 p-10 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif mb-8 text-white">Get in Touch</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-full">
                                        <Phone size={20} className="text-gold-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Phone</p>
                                        <p className="font-serif text-lg text-white">{content.contactInfo.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-full">
                                        <Mail size={20} className="text-gold-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Email</p>
                                        <p className="font-serif text-lg text-white">{content.contactInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-full">
                                        <MapPin size={20} className="text-gold-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Studio</p>
                                        <p className="font-serif text-lg text-white">{content.contactInfo.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <p className="text-sm text-white/60 mb-4">Connect on Social</p>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/hairharmony_studio_?igsh=NWFlbHUyZmEwdGQ3" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-gold-500 p-3 rounded-full transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://wa.me/qr/A7XIKKET6HYYO1" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-green-500 p-3 rounded-full transition-colors">
                                    <MessageCircle size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white p-10 rounded-2xl shadow-lg border border-nude-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-nude-900/60 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 focus:outline-none focus:border-gold-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-nude-900/60 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 focus:outline-none focus:border-gold-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-nude-900/60 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 focus:outline-none focus:border-gold-400"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-nude-900/60 mb-2">Service</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 focus:outline-none focus:border-gold-400"
                                    >
                                        <option value="bridal">Bridal Makeup</option>
                                        <option value="party">Party / Event</option>
                                        <option value="editorial">Editorial / Photoshoot</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-nude-900/60 mb-2">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 focus:outline-none focus:border-gold-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-nude-900/60 mb-2">Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 focus:outline-none focus:border-gold-400"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitted}
                                className={`w-full py-4 rounded-lg uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${submitted ? 'bg-green-500 text-white cursor-default' : 'bg-gold-500 text-white hover:bg-gold-600'
                                    }`}
                            >
                                {submitted ? 'Booking Sent' : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
