import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialContent } from '../data/mockData';
import { authService } from '../utils/auth';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    // Main Site Content
    const [content, setContent] = useState(initialContent);
    // We are deliberately ignoring localStorage 'siteContent' on mount to ensure 
    // the latest data from mockData.js ("my fill data") is loaded.
    // The useEffect below will update localStorage with this fresh data.

    // Admin Auth State
    const [isAdmin, setIsAdmin] = useState(authService.isAuthenticated());

    // Bookings State (Simulated Backend)
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('siteBookings');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist Content Updates
    useEffect(() => {
        localStorage.setItem('siteContent', JSON.stringify(content));
    }, [content]);

    // Persist Bookings
    useEffect(() => {
        localStorage.setItem('siteBookings', JSON.stringify(bookings));
    }, [bookings]);

    const login = async (email, password) => {
        const result = await authService.login(email, password);
        if (result.success) {
            setIsAdmin(true);
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const logout = () => {
        authService.logout();
        setIsAdmin(false);
    };

    const updateContent = (section, data) => {
        setContent(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const addBooking = (bookingData) => {
        const newBooking = {
            id: Date.now(),
            ...bookingData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        setBookings(prev => [newBooking, ...prev]);
        return true;
    };

    const updateBookingStatus = (id, status) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    };

    return (
        <ContentContext.Provider value={{
            content,
            isAdmin,
            bookings,
            login,
            logout,
            updateContent,
            addBooking,
            updateBookingStatus,
            addReview: (review) => {
                const newReview = { id: Date.now(), ...review, date: new Date().toISOString().split('T')[0] };
                const updatedReviews = [newReview, ...content.reviews];
                updateContent('reviews', updatedReviews);
            },
            updateReview: (updatedReview) => {
                const updatedReviews = content.reviews.map(r => r.id === updatedReview.id ? updatedReview : r);
                updateContent('reviews', updatedReviews);
            },
            deleteReview: (id) => {
                const updatedReviews = content.reviews.filter(r => r.id !== id);
                updateContent('reviews', updatedReviews);
            }
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);
