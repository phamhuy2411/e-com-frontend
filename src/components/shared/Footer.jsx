import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-800 to-red-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-orange-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Trade Assurance */}
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-orange-300">Trade Assurance</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  Safe and easy payments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  Money-back policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  On-time shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  After-sales protections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-300 transition-colors"
                >
                  Product monitoring services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-orange-300">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@gearvana.com</li>
              <li>Phone: +84 98 123 999</li>
              <li>Address: Số 141 đường Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội.</li>
              <li className="mt-4">
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-300 transition-colors"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-300 transition-colors"
                  >
                    <FaYoutube size={24} />
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-300 transition-colors"
                  >
                    <FaTiktok size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-300 transition-colors"
                  >
                    <FaInstagram size={24} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="md:col-span-3 text-center mt-8">
            <h3 className="text-2xl font-bold mb-4 text-orange-300">Gearvana</h3>
            <p className="text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Gearvana is your ultimate destination for high-quality products
              and an unparalleled online shopping experience. We offer a diverse
              range of items, from electronics to fashion, all carefully curated
              to meet your needs. Our commitment to customer satisfaction
              ensures secure payments, timely delivery, and excellent
              after-sales support. Shop with confidence and discover the future
              of online retail.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Gearvana – Your Trusted Tech
            Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
