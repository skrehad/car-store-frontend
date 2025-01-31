import AllCars from "./AllCars";
import Carousel from "./Carousel";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Gallery from "./Gallery";

export default function Home() {
  return (
    <div>
      <Carousel></Carousel>
      <AllCars></AllCars>
      <Gallery></Gallery>
      <FAQ></FAQ>
      <Footer></Footer>
    </div>
  );
}
