import { memo } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

const Contact = memo(() => {
    return(
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{backgroundImage: "url('')"}}>
            
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
                <p className="text-gray-600 text-center mb-4">
                    We would love to hear from you! Please fill out the form below or contact us directly
                </p>

                <form className="space-y-4" autoComplete="off">
                    <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input 
                            id="contact-name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Your name"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                            id="contact-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@email.com"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea 
                            id="contact-message"
                            rows="4"
                            required
                            placeholder="Your message..."
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Send Message
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">Contact Information</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FiPhone className="text-blue-500 mr-2" aria-label="Phone" />
                            <span className="text-gray-600">+4 8961 944 149</span>
                        </div>

                        <div className="flex items-center">
                            <FiMail className="text-blue-500 mr-2" aria-label="Email" />
                            <span className="text-gray-600">embarkxofficial@gmail.com</span>
                        </div>

                        <div className="flex items-center">
                            <FiMapPin className="text-blue-500 mr-2" aria-label="Address" />
                            <span className="text-gray-600">123 Main, Town, USA</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
});

Contact.displayName = 'Contact';

export default Contact;