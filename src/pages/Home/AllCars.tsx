import { useGetAllCarDataQuery } from "../../redux/features/carManagement/carApi";
import { Car } from "../../constants/type";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

const AllCars = () => {
  const { data, isLoading } = useGetAllCarDataQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const carsToShow = data?.data?.slice(0, 6);

  return (
    <div className="text-white text-center my-5 mx-15">
      <h1 className="text-4xl font-bold text-black mb-6 py-10">
        Explore Our Cars
      </h1>

      {/* Cars List */}
      <div className="grid my-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-5 justify-center">
        {carsToShow?.map((item: Car) => (
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

      <div>
        <Link
          to="/allCars"
          className="w-[150px] text-center my-10 py-2 px-12 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
        >
          <span className="text-white">All Cars</span>
        </Link>
      </div>
    </div>
  );
};

export default AllCars;
