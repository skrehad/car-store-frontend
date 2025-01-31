import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-10">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gray-800 text-white rounded-lg shadow-lg mx-6">
        <h1 className="text-4xl font-bold text-yellow-400">Contact Us</h1>
        <p className="mt-3 text-lg">
          Have questions? Get in touch with us today.
        </p>
      </div>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaMapMarkerAlt className="text-3xl text-red-500" />
          <h3 className="text-lg font-semibold mt-3">Location</h3>
          <p>Dhaka, Bangladesh</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaPhoneAlt className="text-3xl text-green-500" />
          <h3 className="text-lg font-semibold mt-3">Call Us</h3>
          <p>+880 1234-567890</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaEnvelope className="text-3xl text-blue-500" />
          <h3 className="text-lg font-semibold mt-3">Email Us</h3>
          <p>support@carshop.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg mt-10 text-white">
        <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
        <form>
          <input
            className="w-full p-3 mb-4 rounded bg-gray-900 border border-gray-600"
            type="text"
            placeholder="Your Name"
          />
          <input
            className="w-full p-3 mb-4 rounded bg-gray-900 border border-gray-600"
            type="email"
            placeholder="Your Email"
          />
          <textarea
            className="w-full p-3 mb-4 rounded bg-gray-900 border border-gray-600"
            rows="4"
            placeholder="Your Message"
          ></textarea>
          <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold">
            Send Message
          </button>
        </form>
      </div>

      {/* Business Hours Section */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
        <FaClock className="text-3xl text-yellow-500" />
        <h3 className="text-lg font-semibold mt-3">Business Hours</h3>
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  );
};

export default ContactPage;
