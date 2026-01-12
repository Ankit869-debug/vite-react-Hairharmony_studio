import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Star } from 'lucide-react';

const RateUs = () => {
    const { addReview } = useContent();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        text: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }
        addReview({
            name: formData.name,
            text: formData.text,
            rating: rating
        });
        setSubmitted(true);
        setFormData({ name: '', text: '' });
        setRating(0);
    };

    if (submitted) {
        return (
            <div className="pt-32 pb-20 px-6 min-h-screen bg-nude-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-gold-200">
                    <Star size={48} className="text-gold-500 mx-auto mb-4" fill="currentColor" />
                    <h2 className="text-3xl font-serif text-nude-900 mb-2">Thank You!</h2>
                    <p className="text-nude-900/60 mb-6">Your feedback means exactly the world to us.</p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-gold-600 hover:text-gold-700 font-medium underline uppercase tracking-widest text-xs"
                    >
                        Submit another review
                    </button>
                    <div className="mt-8 pt-6 border-t border-nude-100">
                        <a href="/" className="bg-nude-900 text-gold-100 px-6 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-gold-600 transition-colors inline-block">
                            Return Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-nude-50">
            <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <span className="text-gold-600 uppercase tracking-widest text-xs font-bold">Feedback</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-nude-900 mt-2 mb-4">Rate Your Experience</h1>
                    <p className="text-nude-900/60">We'd love to hear about your visit to Harmony Studio.</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md border border-nude-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Rating Stars */}
                        <div className="flex flex-col items-center space-y-3">
                            <label className="text-sm uppercase tracking-widest text-nude-900 font-bold">Your Rating</label>
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`transition-colors duration-200 ${ratingValue <= (hover || rating) ? "text-gold-500" : "text-nude-200"}`}
                                            onClick={() => setRating(ratingValue)}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <Star size={32} fill={ratingValue <= (hover || rating) ? "currentColor" : "none"} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-nude-900 font-bold">Your Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 text-nude-900 focus:outline-none focus:border-gold-400 transition-colors"
                                placeholder="Jane Doe"
                            />
                        </div>

                        {/* Review Text */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-nude-900 font-bold">Your Review</label>
                            <textarea
                                required
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                className="w-full bg-nude-50 border border-nude-200 rounded-lg p-3 text-nude-900 focus:outline-none focus:border-gold-400 transition-colors min-h-[120px]"
                                placeholder="Tell us what you liked..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-nude-900 text-gold-100 py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-gold-600 transition-all transform hover:scale-[1.02]"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RateUs;
