import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div>
      <div className=" fixed top-0 left-0 w-full min-h-screen -z-10"></div>

      <div>
        <Navbar />
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
