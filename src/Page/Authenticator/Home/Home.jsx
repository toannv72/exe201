
import { Link } from "react-router-dom";
import images from "../../../img";
import ComHeader from "../../Components/ComHeader/ComHeader";


export default function Home() {

    return (
        <div className="text-white relative isolate overflow-hidden bg-gray-900  sm:py-32">
            <img
                src={images.background}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            <ComHeader />
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 xl:grid-cols-2 ">
                <div className="p-12">
                    <img alt="Home1" src={images.Home1} />
                </div>
                <div className="flex flex-col p-12 px-36 w-[90%] gap-32 mt-12">

                    <div className="flex flex-col  gap-8">
                        <p className="font-medium text-4xl">PetSide Ul app Overview</p>
                        <p>In an age where pets are cherished members of the
                            family, ensuring their well-being is paramount. Enter
                            Petside - your comprehensive solution for all things
                            pet care. Petside is more than just an application it's a
                            lifeline for pet owners, offering a suite of indispensable
                            features designed to streamline and enhance the care
                            of your beloved companions.</p>

                    </div>

                    <div className="flex gap-8 ">
                        <Link to={"https://drive.google.com/drive/u/0/folders/1lAqEDVLjxR0-T5te2nDCPRxjemWuNI36"}>
                            <button className="bg-[#3A3F65] text-2xl p-4 rounded-lg border-2  border-zinc-50">Get Started</button>
                        </Link>
                        <Link to={"https://www.facebook.com/Petbyyourside"}>
                        <button className="bg-transparent text-2xl p-4 rounded-lg border-2  border-zinc-50">Try It Now</button>
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    )
}