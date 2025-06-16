import { memo } from 'react';
import { FiMail, FiMapPin, FiPhone, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaUsers } from 'react-icons/fa';

const Contact = memo(() => {
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-orange-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
                                <FiMail className="text-orange-500 w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-800">Send us a Message</h2>
                        </div>
                        <form className="space-y-6" autoComplete="off">
                            <div className="space-y-2">
                                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
                                    Your Name
                                </label>
                                <div className="relative">
                                    <input 
                                        id="contact-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300" 
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiUser className="text-slate-400 w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input 
                                        id="contact-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="support@gearvana.com"
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300" 
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiMail className="text-slate-400 w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
                                    Your Message
                                </label>
                                <div className="relative">
                                    <textarea 
                                        id="contact-message"
                                        rows="4"
                                        required
                                        placeholder="How can we help you?"
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 resize-none" 
                                    />
                                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                                        <FiMessageSquare className="text-slate-400 w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-orange-500/30 transition-all duration-300">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
                                    <FiMapPin className="text-orange-500 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-semibold text-slate-800">Contact Information</h2>
                            </div>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FiPhone className="text-orange-500 w-5 h-5" aria-label="Phone" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-700 font-medium text-lg">Phone</h3>
                                        <p className="text-slate-600 mt-1 text-base">+84 98 123 999</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FiMail className="text-orange-500 w-5 h-5" aria-label="Email" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-700 font-medium text-lg">Email</h3>
                                        <p className="text-slate-600 mt-1 text-base">support@gearvana.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FiMapPin className="text-orange-500 w-5 h-5" aria-label="Address" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-700 font-medium text-lg">Address</h3>
                                        <p className="text-slate-600 mt-1 text-base"> Address: Số 141 đường Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-orange-500/30 transition-all duration-300">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
                                    <FaUsers className="text-orange-500 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-semibold text-slate-800">Follow Us</h2>
                            </div>
                            <div className="flex space-x-4">
                                <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                                    <FaFacebook className="text-orange-500 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                                    <FaTwitter className="text-orange-500 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                                    <FaInstagram className="text-orange-500 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

Contact.displayName = 'Contact';

export default Contact;