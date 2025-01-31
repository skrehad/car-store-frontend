const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold">CarShop</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop destination for the best cars.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-gray-300 text-sm">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Services
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facecar-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-xs mt-4">
        &copy; {new Date().getFullYear()} CarShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
