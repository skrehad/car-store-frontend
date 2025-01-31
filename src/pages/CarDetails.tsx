import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useGetAllCarDataQuery } from "../redux/features/carManagement/carApi";
import { useAppSelector } from "../redux/features/hook";
import { useAddOrderMutation } from "../redux/features/OrderManagement/orderApi";
import { Car } from "../constants/type";

const CarDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAllCarDataQuery(undefined);
  const [addOrder] = useAddOrderMutation();
  const carData = data?.data?.find((item: Car) => item._id === id);
  const user = useAppSelector(useCurrentUser);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] px-4">
        <RingLoader size={80} color="#1ca944" />
      </div>
    );
  }

  const handleProceedToBuy = async (id: string) => {
    if (!user) {
      alert("Please log in to proceed with the purchase.");
      return;
    }

    const productInfo = {
      productId: id,
      userInfo: {
        ...user,
      },
    };

    try {
      const result = await addOrder(productInfo).unwrap();
      window.location.replace(result.url);
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] text-white p-6">
        {/* Car Details Container */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 mt-20 p-10 bg-gray-800 rounded-lg shadow-2xl">
          {/* Car Image */}
          <div className="w-full md:w-1/3">
            <img
              src={carData?.image}
              alt="Car Image"
              className="w-full h-[300px] rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Car Information */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{carData?.name}</h1>

            {/* Additional Car Details */}
            <div className="space-y-3">
              <p className="text-gray-400 text-lg">
                <span className="font-semibold">Brand:</span>{" "}
                {carData?.brand || "N/A"}
              </p>
              <p className="text-gray-400 text-lg">
                <span className="font-semibold">Model:</span>{" "}
                {carData?.model || "N/A"}
              </p>
              <p className="text-gray-400 text-lg">
                <span className="font-semibold">Category:</span>{" "}
                {carData?.category || "N/A"}
              </p>
              <p className="text-gray-400 text-lg">
                <span className="font-semibold">Availability:</span>{" "}
                {carData?.availability ? "Available" : "Out of Stock"}
              </p>
              <p className="text-gray-400 text-lg">
                <span className="font-semibold">Stock:</span>{" "}
                {carData?.stock || "N/A"}
              </p>
              <p className="text-gray-400 text-lg">
                <span className="font-semibold">Year:</span>{" "}
                {carData?.year || "N/A"}
              </p>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-3xl font-bold text-blue-400">
                ${carData?.price || "0.00"}
              </span>
              <button
                onClick={() => handleProceedToBuy(carData?._id || "")}
                className="px-6 py-3 cursor-pointer text-lg font-medium transition text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
              >
                Proceed To Buy
              </button>
            </div>

            <div className="mt-8">
              <p className="text-gray-300 text-xl">{carData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
