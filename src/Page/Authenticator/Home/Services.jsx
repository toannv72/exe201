
import images from "../../../img";
import ComHeader from "../../Components/ComHeader/ComHeader";


export default function Services() {

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
                    <img alt="Home1" src={images.Home2} />
                </div>
                <div className="flex flex-col p-12 px-36 w-[88%] gap-8">
                    <div >
                        <p className="font-medium text-4xl">Monitoring Pet Health</p>
                        <p>In today's pet-loving era, ensuring their well-being is
                            paramount. Enter Petside - your ultimate pet care
                            solution. Beyond just an app, it's your lifeline, offering
                            essential features to enhance and simplify the care of
                            your cherished companions.</p>
                    </div>

                    <div >
                        <p className="font-medium text-4xl">Booking Clinics</p>
                        <p>With Petside, booking veterinary appointments is a
                            breeze. Say goodbye to scheduling hassles and endless
                            phone calls. Whether routine or urgent, finding trusted
                            clinics and scheduling appointments is effortless</p>
                    </div>
                    <div >
                        <p className="font-medium text-4xl">Providing Pet
                            Accommodation Services</p>
                        <p>Traveling and concerned about your pet's stay? Petside
                            offers curated pet-friendly accommodations, tailored to
                            your furry friend's needs. From cozy retreats to luxurious
                            stays, finding the ideal place is now effortless,</p>
                    </div>
                </div>

            </div>

        </div>
    )
}