
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComFooter from "../../Components/ComFooter/ComFooter";
import ComImage from "../../Components/ComImage/ComImage";
import images from "../../../img";
import ComProducts from "../../Components/ComProducts/ComProducts";
import { textApp } from "../../../TextContent/textApp";

export default function Home() {

    return (
        <>
            <ComHeader />
            <div className="mx-auto max-w-2xl px-4 py-2  sm:mt-4 sm:px-6 lg:py-2 lg:max-w-7xl ">
            <ComImage showThumbnails={false} product={images.Home} />
            </div>
            <ComProducts link={`/product?limit=9`} text={textApp.Home.text} getAll={'/product/new'}/>
            <ComProducts link={`/product/sold?limit=9`} text={'Sản phẩm bán chạy nhất'} getAll={'/product/sold'}/>
            <ComFooter />
        </>
    )
}