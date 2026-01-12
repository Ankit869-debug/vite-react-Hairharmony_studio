import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RateUs from './pages/RateUs';
import { ContentProvider, useContent } from './context/ContentContext';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';

const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useContent();
    return isAdmin ? children : <Navigate to="/admin" />;
};

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
        filter: 'blur(5px)'
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(5px)',
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const AppLayout = ({ children }) => {
    return (
        <motion.div
            className="font-sans text-nude-900 bg-nude-50 selection:bg-rose-200 selection:text-nude-900 min-h-screen flex flex-col"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>

            {/* Simple Footer */}
            <footer className="bg-nude-900 text-nude-100 py-12 border-t border-white/10">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-2xl text-gold-200">HAIRHARMONY</h4>
                        <p className="text-xs uppercase tracking-widest text-white/40">Studio</p>
                    </div>
                    <p className="text-sm text-white/40">© 2024 Hairharmony Studio. All rights reserved.</p>
                </div>
            </footer>
        </motion.div>
    )
}

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes with Layout */}
                <Route path="/" element={<AppLayout><Home /></AppLayout>} />
                <Route path="/about" element={<AppLayout><About /></AppLayout>} />
                <Route path="/services" element={<AppLayout><Services /></AppLayout>} />
                <Route path="/portfolio" element={<AppLayout><Portfolio /></AppLayout>} />
                <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
                <Route path="/rate-us" element={<AppLayout><RateUs /></AppLayout>} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                        <AdminLogin />
                    </motion.div>
                } />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                <AdminDashboard />
                            </motion.div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <ContentProvider>
                <SmoothScroll />
                <ScrollToTop />
                <AnimatedRoutes />
            </ContentProvider>
        </Router>
    );
}

export default App;
