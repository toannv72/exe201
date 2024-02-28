import { Link } from "react-router-dom";
import images from "../../../img";
import ComButton from "../ComButton/ComButton";



export default function ComHeader({ dataCart, updateCart }) {


  return (
    <>
      <div className="flex justify-between px-8 mt-0 justify-center">
        <div> <img
          src={images.LogoHome}
          alt=""
          className="w-52"
        /></div>
        <div className="flex gap-24 font-medium text-4xl">
          <Link to={'/'}>Home</Link>
          <Link to={'/services'}>Services</Link>
          <Link to={'/about'}>About</Link>
        </div>

        
        <div>
        <button className="bg-[#3A3F65] text-2xl p-6 rounded-full ">Download</button>
       
        </div>
      </div>
    </>
  );
}
