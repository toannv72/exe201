
import images from "../../../img";
import ComHeader from "../../Components/ComHeader/ComHeader";


export default function About() {

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
                    <img alt="Home1" className="w-full" src={images.Home3} />
                </div>
                <div className="flex flex-col p-12 px-36 w-[90%] gap-8">
                    <div >
                        <p className="font-medium text-4xl">Business Goals</p>
                        <p>The app's primary goal is to offer a comprehensive
                            platform that simplifies pet care while fostering a
                            sense of community among pet lovers.</p>
                    </div>
                    <div >
                        <p className="font-medium text-4xl">Business Goals</p>
                        <p>The app's primary goal is to offer a comprehensive
                            platform that simplifies pet care while fostering a
                            sense of community among pet lovers.</p>
                    </div>
                    <div >
                        <p className="font-medium text-4xl">Business Goals</p>
                        <p>The app's primary goal is to offer a comprehensive
                            platform that simplifies pet care while fostering a
                            sense of community among pet lovers.</p>
                    </div>
                    <div className="flex gap-8">
                        <button className="bg-[#3A3F65] text-4xl p-8 rounded-lg border-2 border-zinc-50">Get Started</button>
                        <button className="bg-transparent text-4xl p-8 rounded-lg border-2 border-zinc-50">Try It Now</button>

                    </div>
                </div>

            </div>

        </div>
    )
}