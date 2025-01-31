import image1 from "./pictures/1.jpg";
import image2 from "./pictures/2.jpg";
import image3 from "./pictures/3.jpg";
import image4 from "./pictures/4.jpg";
import image5 from "./pictures/5.jpg";
import image6 from "./pictures/6.jpg";
import image7 from "./pictures/7.jpg";
import image8 from "./pictures/8.jpg";

const Gallery = () => {
  return (
    <div>
      <div className="text-3xl text-center  my-10">Gallery Section</div>
      <div className="mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image1}
              alt="image 1"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image6}
              alt="image 2"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image2}
              alt="image 3"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image1}
              alt="image 4"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image8}
              alt="image 5"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image3}
              alt="image 6"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image5}
              alt="image 7"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image2}
              alt="image 8"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image4}
              alt="image 9"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image8}
              alt="image 10"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image6}
              alt="image 11"
            />
          </div>
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image7}
              alt="image 12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gallery;
