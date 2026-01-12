// import React, { useState } from 'react';
// import { useContent } from '../context/ContentContext';
// import { Save, Plus, Trash, LogOut, Calendar, Image as ImageIcon, Briefcase, FileText, Home, Star, Edit, X, Music } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//     const { content, updateContent, bookings, updateBookingStatus, logout } = useContent();
//     const [activeTab, setActiveTab] = useState('bookings');
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     };

//     const BookingManager = () => {
//         const pendingBookings = bookings.filter(b => b.status === 'pending');
//         const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
//         const completedBookings = bookings.filter(b => b.status === 'completed');

//         const BookingCard = ({ booking }) => (
//             <div className="bg-white p-4 rounded-lg border border-nude-200 shadow-sm mb-4">
//                 <div className="flex justify-between items-start mb-2">
//                     <div>
//                         <h4 className="font-serif text-lg">{booking.name}</h4>
//                         <p className="text-xs text-nude-900/50 uppercase tracking-wide">{booking.service}</p>
//                     </div>
//                     <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-widest ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                         booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                         }`}>
//                         {booking.status}
//                     </span>
//                 </div>
//                 <div className="text-sm text-nude-900/70 space-y-1 mb-4">
//                     <p>📅 {booking.date}</p>
//                     <p>📞 {booking.phone}</p>
//                     <p>📧 {booking.email}</p>
//                     {booking.message && <p className="italic">"{booking.message}"</p>}
//                 </div>
//                 <div className="flex gap-2">
//                     {booking.status === 'pending' && (
//                         <button
//                             onClick={() => updateBookingStatus(booking.id, 'confirmed')}
//                             className="flex-1 bg-nude-900 text-gold-100 py-2 rounded text-xs uppercase tracking-widest hover:bg-gold-600 transition-colors"
//                         >
//                             Confirm
//                         </button>
//                     )}
//                     {booking.status === 'confirmed' && (
//                         <button
//                             onClick={() => updateBookingStatus(booking.id, 'completed')}
//                             className="flex-1 bg-green-600 text-white py-2 rounded text-xs uppercase tracking-widest hover:bg-green-700 transition-colors"
//                         >
//                             Complete
//                         </button>
//                     )}
//                     {booking.status !== 'cancelled' && booking.status !== 'completed' && (
//                         <button
//                             onClick={() => updateBookingStatus(booking.id, 'cancelled')}
//                             className="flex-1 bg-red-100 text-red-600 py-2 rounded text-xs uppercase tracking-widest hover:bg-red-200 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </div>
//         );

//         return (
//             <div className="grid lg:grid-cols-3 gap-6">
//                 <div>
//                     <h3 className="text-xl font-serif mb-4 text-nude-900 flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-yellow-400"></span> New Requests
//                     </h3>
//                     {pendingBookings.length === 0 ? <p className="text-sm text-nude-400 italic">No pending requests</p> : pendingBookings.map(b => <BookingCard key={b.id} booking={b} />)}
//                 </div>
//                 <div>
//                     <h3 className="text-xl font-serif mb-4 text-nude-900 flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-green-500"></span> Upcoming
//                     </h3>
//                     {confirmedBookings.length === 0 ? <p className="text-sm text-nude-400 italic">No upcoming appointments</p> : confirmedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
//                 </div>
//                 <div>
//                     <h3 className="text-xl font-serif mb-4 text-nude-900 flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-gray-400"></span> Past / Completed
//                     </h3>
//                     {completedBookings.length === 0 ? <p className="text-sm text-nude-400 italic">No history</p> : completedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
//                 </div>
//             </div>
//         )
//     }

//     const PortfolioManager = () => {
//         const [portfolio, setPortfolio] = useState(content.portfolio);
//         const [newItem, setNewItem] = useState({ category: 'bridal', image: '', type: 'image' });

//         const handleAddItem = () => {
//             if (!newItem.image) return;
//             const item = { id: Date.now(), ...newItem };
//             const updated = [...portfolio, item];
//             setPortfolio(updated);
//             updateContent('portfolio', updated);
//             setNewItem({ category: 'bridal', image: '', type: 'image' });
//         };

//         const handleDelete = (id) => {
//             const updated = portfolio.filter(p => p.id !== id);
//             setPortfolio(updated);
//             updateContent('portfolio', updated);
//         };

//         const handleImageUpload = (e) => {
//             const file = e.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setNewItem({ ...newItem, image: reader.result });
//                 };
//                 reader.readAsDataURL(file);
//             }
//         };

//         return (
//             <div className="space-y-8">
//                 <div className="bg-white p-6 rounded-xl border border-nude-200">
//                     <h3 className="text-lg font-serif mb-4">Add New Item</h3>
//                     <div className="flex flex-wrap gap-4 items-center">
//                         <select
//                             value={newItem.category}
//                             onChange={e => setNewItem({ ...newItem, category: e.target.value })}
//                             className="p-3 border rounded text-sm bg-nude-50"
//                         >
//                             <option value="bridal">Bridal</option>
//                             <option value="editorial">Editorial</option>
//                             <option value="party">Party</option>
//                         </select>
//                         <select
//                             value={newItem.type}
//                             onChange={e => setNewItem({ ...newItem, type: e.target.value })}
//                             className="p-3 border rounded text-sm bg-nude-50"
//                         >
//                             <option value="image">Image</option>
//                             <option value="video">Video</option>
//                         </select>

//                         <div className="flex-1 flex gap-2">
//                             <input
//                                 type="text"
//                                 placeholder={newItem.type === 'video' ? "Video URL" : "Image URL"}
//                                 className="flex-1 p-3 border rounded text-sm"
//                                 value={newItem.image}
//                                 onChange={e => setNewItem({ ...newItem, image: e.target.value })}
//                             />
//                             <div className="relative">
//                                 <input
//                                     type="file"
//                                     accept={newItem.type === 'video' ? "video/*" : "image/*"}
//                                     onChange={handleImageUpload}
//                                     className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                                 />
//                                 <button className="bg-nude-100 text-nude-900 px-4 py-3 rounded text-sm border border-nude-300 hover:bg-nude-200 whitespace-nowrap">
//                                     Upload File
//                                 </button>
//                             </div>
//                         </div>

//                         <button onClick={handleAddItem} className="bg-gold-500 text-white p-3 rounded hover:bg-gold-600 shadow-md">
//                             <Plus size={20} />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {portfolio.map(item => (
//                         <div key={item.id} className="relative group rounded-lg overflow-hidden border border-nude-100 shadow-sm">
//                             {item.type === 'video' ? (
//                                 <video
//                                     src={item.image}
//                                     className="w-full h-40 object-cover"
//                                     controls
//                                 />
//                             ) : (
//                                 <img
//                                     src={item.image}
//                                     alt="portfolio"
//                                     className="w-full h-40 object-cover"
//                                 />
//                             )}

//                             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg">
//                                     <Trash size={14} />
//                                 </button>
//                             </div>
//                             <span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[10px] rounded uppercase tracking-wider font-bold shadow-sm">
//                                 {item.category}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         )
//     }

//     const ServiceEditor = () => {
//         const [services, setServices] = useState(content.services);

//         const handleServiceChange = (id, field, value) => {
//             const updated = services.map(s => s.id === id ? { ...s, [field]: value } : s);
//             setServices(updated);
//         };

//         const saveServices = () => {
//             updateContent('services', services);
//             alert('Services saved successfully!');
//         };

//         return (
//             <div className="space-y-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-2xl font-serif">Manage Services</h3>
//                     <button onClick={saveServices} className="flex items-center gap-2 bg-nude-900 text-gold-100 px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors">
//                         <Save size={16} /> Save Changes
//                     </button>
//                 </div>

//                 <div className="grid gap-6">
//                     {services.map(service => (
//                         <div key={service.id} className="bg-white p-6 rounded-xl border border-nude-200 shadow-sm flex gap-6">
//                             <div className="w-1/4">
//                                 <img src={service.image} alt="preview" className="w-full h-32 object-cover rounded-lg mb-2" />
//                                 <input
//                                     type="text"
//                                     value={service.image}
//                                     onChange={(e) => handleServiceChange(service.id, 'image', e.target.value)}
//                                     className="w-full text-xs p-2 border rounded"
//                                     placeholder="Image URL"
//                                 />
//                             </div>
//                             <div className="w-3/4 space-y-4">
//                                 <div className="flex gap-4">
//                                     <input
//                                         type="text"
//                                         value={service.title}
//                                         onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
//                                         className="flex-1 p-2 border rounded font-serif text-lg"
//                                         placeholder="Service Title"
//                                     />
//                                     <input
//                                         type="text"
//                                         value={service.price}
//                                         onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
//                                         className="w-32 p-2 border rounded font-medium"
//                                         placeholder="Price"
//                                     />
//                                 </div>
//                                 <textarea
//                                     value={service.description}
//                                     onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
//                                     className="w-full p-2 border rounded h-20 text-sm"
//                                     placeholder="Service description..."
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     const ReviewManager = () => {
//         const { deleteReview, updateReview } = useContent();
//         const [editingId, setEditingId] = useState(null);
//         const [editForm, setEditForm] = useState({});

//         const startEdit = (review) => {
//             setEditingId(review.id);
//             setEditForm(review);
//         };

//         const cancelEdit = () => {
//             setEditingId(null);
//             setEditForm({});
//         };

//         const saveEdit = () => {
//             updateReview(editForm);
//             setEditingId(null);
//         };

//         return (
//             <div className="space-y-6">
//                 <h3 className="text-2xl font-serif mb-6">Manage Reviews</h3>
//                 <div className="grid gap-4">
//                     {content.reviews && content.reviews.map(review => (
//                         <div key={review.id} className="bg-white p-6 rounded-xl border border-nude-200 shadow-sm">
//                             {editingId === review.id ? (
//                                 <div className="space-y-4">
//                                     <div className="flex gap-4">
//                                         <input
//                                             type="text"
//                                             value={editForm.name}
//                                             onChange={e => setEditForm({ ...editForm, name: e.target.value })}
//                                             className="flex-1 p-2 border rounded font-serif"
//                                             placeholder="Name"
//                                         />
//                                         <select
//                                             value={editForm.rating}
//                                             onChange={e => setEditForm({ ...editForm, rating: Number(e.target.value) })}
//                                             className="p-2 border rounded"
//                                         >
//                                             {[1, 2, 3, 4, 5].map(num => (
//                                                 <option key={num} value={num}>{num} Stars</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <textarea
//                                         value={editForm.text}
//                                         onChange={e => setEditForm({ ...editForm, text: e.target.value })}
//                                         className="w-full p-2 border rounded text-sm"
//                                         rows={3}
//                                         placeholder="Review text"
//                                     />
//                                     <div className="flex justify-end gap-2">
//                                         <button onClick={cancelEdit} className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">
//                                             Cancel
//                                         </button>
//                                         <button onClick={saveEdit} className="px-3 py-1 text-sm bg-gold-500 text-white rounded hover:bg-gold-600">
//                                             Save Changes
//                                         </button>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="flex justify-between items-start">
//                                     <div>
//                                         <div className="flex items-center gap-3 mb-2">
//                                             <h4 className="font-serif text-lg">{review.name}</h4>
//                                             <div className="flex text-gold-500">
//                                                 {[...Array(5)].map((_, i) => (
//                                                     <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-nude-200"} />
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <p className="text-nude-900/70 text-sm mb-2">"{review.text}"</p>
//                                         <span className="text-[10px] text-nude-400 uppercase tracking-widest">{review.date}</span>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => startEdit(review)}
//                                             className="text-nude-500 hover:text-gold-600 p-2 hover:bg-nude-50 rounded-full transition-colors"
//                                             title="Edit Review"
//                                         >
//                                             <Edit size={18} />
//                                         </button>
//                                         <button
//                                             onClick={() => deleteReview(review.id)}
//                                             className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
//                                             title="Delete Review"
//                                         >
//                                             <Trash size={18} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                     {(!content.reviews || content.reviews.length === 0) && (
//                         <p className="text-nude-400 italic">No reviews yet.</p>
//                     )}
//                 </div>
//             </div>
//         );
//     };

//     const MusicManager = () => {
//         const [config, setConfig] = useState(content.musicConfig || { url: '', volume: 0.5, autoPlay: false });

//         const handleSave = () => {
//             updateContent('musicConfig', config);
//             alert('Music settings updated!');
//         };

//         const handleFileUpload = (e) => {
//             const file = e.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setConfig({ ...config, url: reader.result });
//                 };
//                 reader.readAsDataURL(file);
//             }
//         };

//         return (
//             <div className="bg-white p-8 rounded-xl border border-nude-200 w-full max-w-2xl">
//                 <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
//                     <Music size={24} className="text-gold-500" /> Background Music Settings
//                 </h3>

//                 <div className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-nude-900 mb-2">Music URL (or Upload File)</label>
//                         <div className="flex gap-4">
//                             <input
//                                 type="text"
//                                 value={config.url}
//                                 onChange={(e) => setConfig({ ...config, url: e.target.value })}
//                                 className="flex-1 p-3 border rounded text-sm bg-nude-50"
//                                 placeholder="https://example.com/song.mp3"
//                             />
//                             <div className="relative">
//                                 <button className="bg-nude-100 text-nude-900 px-4 py-3 rounded text-sm border border-nude-300 hover:bg-nude-200">
//                                     Upload
//                                 </button>
//                                 <input
//                                     type="file"
//                                     accept="audio/*"
//                                     className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                                     onChange={handleFileUpload}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-nude-900 mb-2">Default Volume: {(config.volume * 100).toFixed(0)}%</label>
//                         <input
//                             type="range"
//                             min="0"
//                             max="1"
//                             step="0.05"
//                             value={config.volume}
//                             onChange={(e) => setConfig({ ...config, volume: parseFloat(e.target.value) })}
//                             className="w-full h-2 bg-nude-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
//                         />
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <input
//                             type="checkbox"
//                             id="autoplay"
//                             checked={config.autoPlay}
//                             onChange={(e) => setConfig({ ...config, autoPlay: e.target.checked })}
//                             className="w-4 h-4 text-gold-600 rounded border-gray-300 focus:ring-gold-500"
//                         />
//                         <label htmlFor="autoplay" className="text-sm text-nude-900">Auto-play on load (Note: Browsers may block this)</label>
//                     </div>

//                     <button
//                         onClick={handleSave}
//                         className="bg-nude-900 text-gold-100 px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors flex items-center gap-2"
//                     >
//                         <Save size={18} /> Save Settings
//                     </button>
//                 </div>
//             </div>
//         );
//     };

//     const tabs = [
//         { id: 'bookings', label: 'Bookings', icon: Calendar },
//         { id: 'services', label: 'Services', icon: Briefcase },
//         { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
//         { id: 'reviews', label: 'Reviews', icon: Star },
//         { id: 'music', label: 'Music Settings', icon: Music },
//         { id: 'content', label: 'Page Content', icon: FileText },
//     ];

//     return (
//         <div className="min-h-screen bg-nude-50 flex font-sans">
//             {/* Sidebar */}
//             <div className="w-64 bg-white border-r border-nude-200 p-6 flex flex-col fixed h-full z-10">
//                 <div className="mb-10 text-center">
//                     <h2 className="text-2xl font-serif text-nude-900">Harmony</h2>
//                     <p className="text-xs uppercase tracking-[0.2em] text-gold-600">Admin Panel</p>
//                 </div>

//                 <nav className="flex-1 space-y-2">
//                     <button
//                         onClick={() => navigate('/')}
//                         className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-nude-900 hover:bg-nude-100 transition-colors"
//                     >
//                         <Home size={18} />
//                         Home Site
//                     </button>
//                     <div className="h-px bg-nude-100 my-2"></div>
//                     {tabs.map(tab => (
//                         <button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-nude-900 text-white shadow-md' : 'text-nude-900 hover:bg-nude-100'
//                                 }`}
//                         >
//                             <tab.icon size={18} />
//                             {tab.label}
//                         </button>
//                     ))}
//                 </nav>

//                 <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 mt-auto px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
//                     <LogOut size={16} /> Logout
//                 </button>
//             </div>

//             {/* Content Area */}
//             <div className="flex-1 ml-64 p-10">
//                 <header className="flex justify-between items-center mb-10">
//                     <h1 className="text-3xl font-serif text-nude-900 capitalize">{activeTab} Manager</h1>
//                     <div className="text-sm text-nude-400">Welcome back, Admin</div>
//                 </header>

//                 <main className="animate-fade-in">
//                     {activeTab === 'bookings' && <BookingManager />}
//                     {activeTab === 'services' && <ServiceEditor />}
//                     {activeTab === 'portfolio' && <PortfolioManager />}
//                     {activeTab === 'reviews' && <ReviewManager />}
//                     {activeTab === 'music' && <MusicManager />}
//                     {activeTab === 'content' && <div className="text-center text-nude-400 mt-20 italic">Page content editor (About/Home/Contact details) coming in v2.0</div>}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, Plus, Trash, LogOut, Calendar, Image as ImageIcon, Briefcase, FileText, Home, Star, Edit, X, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { content, updateContent, bookings, updateBookingStatus, logout } = useContent();
    const [activeTab, setActiveTab] = useState('bookings');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const BookingManager = () => {
        const pendingBookings = bookings.filter(b => b.status === 'pending');
        const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
        const completedBookings = bookings.filter(b => b.status === 'completed');

        const BookingCard = ({ booking }) => (
            <div className="bg-white p-4 rounded-lg border border-nude-200 shadow-sm mb-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-serif text-lg">{booking.name}</h4>
                        <p className="text-xs text-nude-900/50 uppercase tracking-wide">{booking.service}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-widest ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {booking.status}
                    </span>
                </div>
                <div className="text-sm text-nude-900/70 space-y-1 mb-4">
                    <p>📅 {booking.date}</p>
                    <p>📞 {booking.phone}</p>
                    <p>📧 {booking.email}</p>
                    {booking.message && <p className="italic">"{booking.message}"</p>}
                </div>
                <div className="flex gap-2">
                    {booking.status === 'pending' && (
                        <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="flex-1 bg-nude-900 text-gold-100 py-2 rounded text-xs uppercase tracking-widest hover:bg-gold-600 transition-colors"
                        >
                            Confirm
                        </button>
                    )}
                    {booking.status === 'confirmed' && (
                        <button
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="flex-1 bg-green-600 text-white py-2 rounded text-xs uppercase tracking-widest hover:bg-green-700 transition-colors"
                        >
                            Complete
                        </button>
                    )}
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="flex-1 bg-red-100 text-red-600 py-2 rounded text-xs uppercase tracking-widest hover:bg-red-200 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        );

        return (
            <div className="grid lg:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-xl font-serif mb-4 text-nude-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span> New Requests
                    </h3>
                    {pendingBookings.length === 0 ? <p className="text-sm text-nude-400 italic">No pending requests</p> : pendingBookings.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
                <div>
                    <h3 className="text-xl font-serif mb-4 text-nude-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Upcoming
                    </h3>
                    {confirmedBookings.length === 0 ? <p className="text-sm text-nude-400 italic">No upcoming appointments</p> : confirmedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
                <div>
                    <h3 className="text-xl font-serif mb-4 text-nude-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span> Past / Completed
                    </h3>
                    {completedBookings.length === 0 ? <p className="text-sm text-nude-400 italic">No history</p> : completedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
            </div>
        )
    }

    const PortfolioManager = () => {
        const [portfolio, setPortfolio] = useState(content.portfolio);
        const [newItem, setNewItem] = useState({ category: 'bridal', image: '', type: 'image' });
        const [hasChanges, setHasChanges] = useState(false);

        const handleAddItem = () => {
            if (!newItem.image) return;
            const item = { id: Date.now(), ...newItem };
            const updated = [...portfolio, item];
            setPortfolio(updated);
            setHasChanges(true); // Mark as changed
            // updateContent('portfolio', updated); // Removed immediate save
            setNewItem({ category: 'bridal', image: '', type: 'image' });
        };

        const handleDelete = (id) => {
            const updated = portfolio.filter(p => p.id !== id);
            setPortfolio(updated);
            setHasChanges(true); // Mark as changed
            // updateContent('portfolio', updated); // Removed immediate save
        };

        const savePortfolio = () => {
            updateContent('portfolio', portfolio);
            setHasChanges(false);
            alert('Portfolio saved successfully!');
        };

        const handleImageUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewItem({ ...newItem, image: reader.result });
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="space-y-8">
                {/* Header with Save Button (Top) */}
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-serif">Manage Portfolio</h3>
                    <button
                        onClick={savePortfolio}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${hasChanges ? 'bg-nude-900 text-gold-100 hover:bg-gold-600' : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-nude-200">
                    <h3 className="text-lg font-serif mb-4">Add New Item</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <select
                            value={newItem.category}
                            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                            className="p-3 border rounded text-sm bg-nude-50"
                        >
                            <option value="bridal">Bridal</option>
                            <option value="editorial">Editorial</option>
                            <option value="party">Party</option>
                        </select>
                        <select
                            value={newItem.type}
                            onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                            className="p-3 border rounded text-sm bg-nude-50"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>

                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                placeholder={newItem.type === 'video' ? "Video URL" : "Image URL"}
                                className="flex-1 p-3 border rounded text-sm"
                                value={newItem.image}
                                onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                            />
                            <div className="relative">
                                <input
                                    type="file"
                                    accept={newItem.type === 'video' ? "video/*" : "image/*"}
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                />
                                <button className="bg-nude-100 text-nude-900 px-4 py-3 rounded text-sm border border-nude-300 hover:bg-nude-200 whitespace-nowrap">
                                    Upload File
                                </button>
                            </div>
                        </div>

                        <button onClick={handleAddItem} className="bg-gold-500 text-white p-3 rounded hover:bg-gold-600 shadow-md">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {portfolio.map(item => (
                        <div key={item.id} className="relative group rounded-lg overflow-hidden border border-nude-100 shadow-sm">
                            {item.type === 'video' ? (
                                <video
                                    src={item.image}
                                    className="w-full h-40 object-cover"
                                    controls
                                />
                            ) : (
                                <img
                                    src={item.image}
                                    alt="portfolio"
                                    className="w-full h-40 object-cover"
                                />
                            )}

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg">
                                    <Trash size={14} />
                                </button>
                            </div>
                            <span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[10px] rounded uppercase tracking-wider font-bold shadow-sm">
                                {item.category}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Save Button (Bottom) - "Show in both" */}
                <div className="flex justify-end pt-4 border-t border-nude-200">
                    <button
                        onClick={savePortfolio}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${hasChanges ? 'bg-nude-900 text-gold-100 hover:bg-gold-600' : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        )
    }

    const ServiceEditor = () => {
        const [services, setServices] = useState(content.services);

        const handleServiceChange = (id, field, value) => {
            const updated = services.map(s => s.id === id ? { ...s, [field]: value } : s);
            setServices(updated);
        };

        const saveServices = () => {
            updateContent('services', services);
            alert('Services saved successfully!');
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif">Manage Services</h3>
                    <button onClick={saveServices} className="flex items-center gap-2 bg-nude-900 text-gold-100 px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors">
                        <Save size={16} /> Save Changes
                    </button>
                </div>

                <div className="grid gap-6">
                    {services.map(service => (
                        <div key={service.id} className="bg-white p-6 rounded-xl border border-nude-200 shadow-sm flex gap-6">
                            <div className="w-1/4">
                                <img src={service.image} alt="preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                                <input
                                    type="text"
                                    value={service.image}
                                    onChange={(e) => handleServiceChange(service.id, 'image', e.target.value)}
                                    className="w-full text-xs p-2 border rounded"
                                    placeholder="Image URL"
                                />
                            </div>
                            <div className="w-3/4 space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={service.title}
                                        onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                                        className="flex-1 p-2 border rounded font-serif text-lg"
                                        placeholder="Service Title"
                                    />
                                    <input
                                        type="text"
                                        value={service.price}
                                        onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                                        className="w-32 p-2 border rounded font-medium"
                                        placeholder="Price"
                                    />
                                </div>
                                <textarea
                                    value={service.description}
                                    onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                                    className="w-full p-2 border rounded h-20 text-sm"
                                    placeholder="Service description..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const ReviewManager = () => {
        const { deleteReview, updateReview } = useContent();
        const [editingId, setEditingId] = useState(null);
        const [editForm, setEditForm] = useState({});

        const startEdit = (review) => {
            setEditingId(review.id);
            setEditForm(review);
        };

        const cancelEdit = () => {
            setEditingId(null);
            setEditForm({});
        };

        const saveEdit = () => {
            updateReview(editForm);
            setEditingId(null);
        };

        return (
            <div className="space-y-6">
                <h3 className="text-2xl font-serif mb-6">Manage Reviews</h3>
                <div className="grid gap-4">
                    {content.reviews && content.reviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-xl border border-nude-200 shadow-sm">
                            {editingId === review.id ? (
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                            className="flex-1 p-2 border rounded font-serif"
                                            placeholder="Name"
                                        />
                                        <select
                                            value={editForm.rating}
                                            onChange={e => setEditForm({ ...editForm, rating: Number(e.target.value) })}
                                            className="p-2 border rounded"
                                        >
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num} Stars</option>
                                            ))}
                                        </select>
                                    </div>
                                    <textarea
                                        value={editForm.text}
                                        onChange={e => setEditForm({ ...editForm, text: e.target.value })}
                                        className="w-full p-2 border rounded text-sm"
                                        rows={3}
                                        placeholder="Review text"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button onClick={cancelEdit} className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">
                                            Cancel
                                        </button>
                                        <button onClick={saveEdit} className="px-3 py-1 text-sm bg-gold-500 text-white rounded hover:bg-gold-600">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-serif text-lg">{review.name}</h4>
                                            <div className="flex text-gold-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-nude-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-nude-900/70 text-sm mb-2">"{review.text}"</p>
                                        <span className="text-[10px] text-nude-400 uppercase tracking-widest">{review.date}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(review)}
                                            className="text-nude-500 hover:text-gold-600 p-2 hover:bg-nude-50 rounded-full transition-colors"
                                            title="Edit Review"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteReview(review.id)}
                                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            title="Delete Review"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {(!content.reviews || content.reviews.length === 0) && (
                        <p className="text-nude-400 italic">No reviews yet.</p>
                    )}
                </div>
            </div>
        );
    };

    const MusicManager = () => {
        const [config, setConfig] = useState(content.musicConfig || { url: '', volume: 0.5, autoPlay: false });

        const handleSave = () => {
            updateContent('musicConfig', config);
            alert('Music settings updated!');
        };

        const handleFileUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setConfig({ ...config, url: reader.result });
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="bg-white p-8 rounded-xl border border-nude-200 w-full max-w-2xl">
                <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                    <Music size={24} className="text-gold-500" /> Background Music Settings
                </h3>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-nude-900 mb-2">Music URL (or Upload File)</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={config.url}
                                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                                className="flex-1 p-3 border rounded text-sm bg-nude-50"
                                placeholder="https://example.com/song.mp3"
                            />
                            <div className="relative">
                                <button className="bg-nude-100 text-nude-900 px-4 py-3 rounded text-sm border border-nude-300 hover:bg-nude-200">
                                    Upload
                                </button>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-nude-900 mb-2">Default Volume: {(config.volume * 100).toFixed(0)}%</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={config.volume}
                            onChange={(e) => setConfig({ ...config, volume: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-nude-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="autoplay"
                            checked={config.autoPlay}
                            onChange={(e) => setConfig({ ...config, autoPlay: e.target.checked })}
                            className="w-4 h-4 text-gold-600 rounded border-gray-300 focus:ring-gold-500"
                        />
                        <label htmlFor="autoplay" className="text-sm text-nude-900">Auto-play on load (Note: Browsers may block this)</label>
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-nude-900 text-gold-100 px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors flex items-center gap-2"
                    >
                        <Save size={18} /> Save Settings
                    </button>
                </div>
            </div>
        );
    };

    const tabs = [
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'services', label: 'Services', icon: Briefcase },
        { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
        { id: 'reviews', label: 'Reviews', icon: Star },
        { id: 'music', label: 'Music Settings', icon: Music },
        { id: 'content', label: 'Page Content', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-nude-50 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-nude-200 p-6 flex flex-col fixed h-full z-10">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-serif text-nude-900">Harmony</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-gold-600">Admin Panel</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-nude-900 hover:bg-nude-100 transition-colors"
                    >
                        <Home size={18} />
                        Home Site
                    </button>
                    <div className="h-px bg-nude-100 my-2"></div>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-nude-900 text-white shadow-md' : 'text-nude-900 hover:bg-nude-100'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 mt-auto px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={16} /> Logout
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 ml-64 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-serif text-nude-900 capitalize">{activeTab} Manager</h1>
                    <div className="text-sm text-nude-400">Welcome back, Admin</div>
                </header>

                <main className="animate-fade-in">
                    {activeTab === 'bookings' && <BookingManager />}
                    {activeTab === 'services' && <ServiceEditor />}
                    {activeTab === 'portfolio' && <PortfolioManager />}
                    {activeTab === 'reviews' && <ReviewManager />}
                    {activeTab === 'music' && <MusicManager />}
                    {activeTab === 'content' && <div className="text-center text-nude-400 mt-20 italic">Page content editor (About/Home/Contact details) coming in v2.0</div>}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
