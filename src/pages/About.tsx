const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 md:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">
          About Us
        </h1>
        <p className="mt-4 text-lg">
          We are dedicated to making car buying and selling easier and more
          reliable.
        </p>
      </div>

      {/* Our Mission & Vision */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission & Vision</h2>
        <p>
          At CarShop, our mission is to connect car buyers and sellers in a
          seamless, trustworthy, and efficient manner.
        </p>
      </div>

      {/* Why Choose Us? */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">Trusted Marketplace</h3>
          <p>
            We provide a secure platform for buying and selling cars with
            confidence.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">Best Deals</h3>
          <p>Find the best prices and offers on both new and used cars.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">Customer Support</h3>
          <p>
            Our team is always ready to assist you with your car buying or
            selling needs.
          </p>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border-l-4 border-blue-600 dark:border-yellow-400">
            <p>
              "CarShop made my car buying experience so easy. Highly
              recommended!"
            </p>
            <p className="mt-2 font-bold">- John Doe</p>
          </div>
          <div className="p-6 border-l-4 border-blue-600 dark:border-yellow-400">
            <p>"Selling my car was a breeze with CarShop. Great service!"</p>
            <p className="mt-2 font-bold">- Jane Smith</p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
        <p>We have a team of dedicated professionals ready to assist you.</p>
      </div>

      {/* Our Services */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">Car Buying Assistance</h3>
          <p>We help you find the best car that suits your needs and budget.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">Sell Your Car</h3>
          <p>Sell your car quickly and get the best value for it.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">Car Financing</h3>
          <p>We provide financing options to make your car purchase easier.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
