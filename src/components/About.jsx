import { memo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./shared/ProductCard";
import {
  FaShoppingBag,
  FaUsers,
  FaHandshake,
  FaAward,
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import s_1 from "../assets/sliders/s_1.png";
import s_4 from "../assets/sliders/s_4.png";
import "../styles/animations.css";

const products = [
  {
    productName: "Asus Zenbook A14",
    image: "images/5-Photoroom.png",
    description:
      "Laptop nhỏ gọn với bộ xử lý Snapdragon X, màn hình OLED 14 inch, RAM 16GB và SSD 1TB.",
    quantity: 6,
    price: 1100.0,
    discount: 0.1,
    specialPrice: 990.0,
    category: "laptop",
  },
  {
    productName: "Sony A7R V",
    image: "images/23-Photoroom.png",
    description:
      "Camera full-frame độ phân giải cao với cảm biến 61MP, chụp 10fps, video 8K và lấy nét tự động tiên tiến.",
    quantity: 2,
    price: 3998.0,
    discount: 0.05,
    specialPrice: 3798.1,
    category: "camera",
  },
  {
    productName: "Halliday Smart Glasses",
    image: "images/39-Photoroom.png",
    description:
      "Kính thông minh hiển thị màn hình kỹ thuật số, tích hợp AI và điều khiển bằng nhẫn thông minh.",
    quantity: 3,
    price: 499.99,
    discount: 0.05,
    specialPrice: 474.99,
    category: "other devices",
  },
];

const features = [
  {
    icon: FaShoppingBag,
    title: "Quality Products",
    description:
      "We carefully select each product to ensure the highest quality for our customers.",
    color: "from-orange-500 to-orange-400",
  },
  {
    icon: FaUsers,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We're here to provide the best shopping experience.",
    color: "from-blue-500 to-blue-400",
  },
  {
    icon: FaHandshake,
    title: "Trusted Service",
    description:
      "Building trust through reliable service and transparent business practices.",
    color: "from-green-500 to-green-400",
  },
  {
    icon: FaAward,
    title: "Best Value",
    description:
      "Competitive prices and exclusive deals to give you the best value for your money.",
    color: "from-purple-500 to-purple-400",
  },
];

const services = [
  {
    icon: FaShippingFast,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50",
    color: "bg-orange-100",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "bg-blue-100",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    description: "100% secure payment",
    color: "bg-green-100",
  },
  {
    icon: FaCreditCard,
    title: "Money Back",
    description: "30 days guarantee",
    color: "bg-purple-100",
  },
];

const About = memo(() => {
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate("/products");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section with Parallax */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden tech-bg font-sans">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40 backdrop-blur-sm"></div>
          <img
            src={s_1}
            alt="Hero Background"
            className="w-full h-full object-cover object-center animate-scale tech-image brightness-90 filter contrast-110"
            style={{ transform: "scale(1.1)" }}
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-orange-600 mb-6">
            Welcome to Gearvana
          </h1>
          <p className="text-2xl text-white mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200 hover-float font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Discover the Future of Technology
          </p>
          <button
            onClick={handleNavigateToProducts}
            className="tech-button btn-hover text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden tech-bg bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`tech-card p-8 rounded-2xl text-center transform transition-all duration-300 animate-fade-in bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-500/30 hover:-translate-y-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 font-medium">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-800 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Why Choose Tech Haven
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto hover-float font-medium">
              Experience the perfect blend of cutting-edge technology and
              exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl transition-all duration-300 bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-500/30 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative animate-slide-in-right">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src={s_4}
                  alt="About Us"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-slate-400/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 relative overflow-hidden tech-bg bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-800 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto hover-float font-medium">
              Discover our curated collection of premium tech products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <div
                key={`product-${index}`}
                className="transform transition-all duration-300 animate-fade-in bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-500/30 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  image={product.image}
                  productName={product.productName}
                  description={product.description}
                  specialPrice={product.specialPrice}
                  price={product.price}
                  about
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-slate-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-400/5"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Ready to Experience the Future?
            </h2>
            <p className="text-2xl text-slate-600 mb-12 hover-float font-medium">
              Join thousands of tech enthusiasts who trust us for their digital
              journey
            </p>
            <button
              onClick={handleNavigateToProducts}
              className="text-xl px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Shopping Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
});

About.displayName = "About";

export default About;
