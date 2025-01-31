import { useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useGetAllCarDataQuery } from "../redux/features/carManagement/carApi";
import { Car } from "../constants/type";

const AllCars = () => {
  const { data, isLoading } = useGetAllCarDataQuery(undefined);
  console.log(data);

  // Filter state
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000000,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filtered Cars Logic
  const filteredCars =
    filters.name ||
    filters.brand ||
    filters.category ||
    filters.minPrice > 0 ||
    filters.maxPrice < 1000000
      ? data?.data?.filter((car: Car) => {
          const nameMatch = filters.name
            ? car.name.toLowerCase().includes(filters.name.toLowerCase())
            : true;
          const brandMatch = filters.brand
            ? car.brand.toLowerCase().includes(filters.brand.toLowerCase())
            : true;
          const categoryMatch = filters.category
            ? car.category
                .toLowerCase()
                .includes(filters.category.toLowerCase())
            : true;
          const priceMatch =
            car.price >= filters.minPrice && car.price <= filters.maxPrice;

          return nameMatch && brandMatch && categoryMatch && priceMatch;
        })
      : data?.data;

  console.log("🚀 After Filtering:", filteredCars);

  // Get current cars for the current page
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars?.slice(indexOfFirstCar, indexOfLastCar);

  // Pagination buttons
  const totalPages = Math.ceil(filteredCars?.length / carsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  return (
    <div className="text-white text-center mb-10  min-h-screen">
      <h1 className="text-4xl font-bold text-black mb-4 py-10">
        Explore All Cars
      </h1>

      {/* Filter Section */}
      <div className="mb-10 flex gap-2 mx-10 flex-wrap">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
          className="px-4 py-2 rounded-md border border-gray-400 text-black placeholder-black w-full md:w-auto md:flex-1"
        />
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          placeholder="Search by brand"
          className="px-4 py-2 rounded-md border border-gray-400 text-black placeholder-black w-full md:w-auto md:flex-1"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md border border-gray-400 text-black w-full md:w-auto md:flex-1"
        >
          <option value="">Select category</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
        </select>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="px-4 py-2 rounded-md border border-gray-400 text-black placeholder-black w-full md:w-auto md:flex-1"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="px-4 py-2 rounded-md border border-gray-400 text-black placeholder-black w-full md:w-auto md:flex-1"
        />
      </div>

      {/* Cars List */}
      <div className="grid my-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-5 justify-center">
        {currentCars?.map((item: Car) => (
          <div
            key={item._id}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex flex-col"
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={item?.image}
                alt={item?.name}
              />
            </div>

            <div className="p-3 flex-grow">
              <h5 className="text-2xl font-bold text-gray-300">
                Name: {item?.name}
              </h5>
              <p className="text-gray-400 text-sm mb-2">Brand: {item?.brand}</p>
              <p className="text-gray-500 text-sm mb-3">
                {item?.description.length > 200
                  ? item?.description.slice(0, 200) + "..."
                  : item?.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg font-bold text-blue-400">
                Price: ${item?.price}
              </span>
              <Link
                to={`/car-details/${item._id}`}
                className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-center gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 cursor-pointer py-2 ${
              currentPage === index + 1 ? "bg-blue-600" : "bg-blue-400"
            } text-white rounded-md`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCars;
