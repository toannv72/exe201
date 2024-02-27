import { useEffect, useState } from "react";
import { getData } from "../../../api/api";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComFooter from "../../Components/ComFooter/ComFooter";
import ComImage from "../../Components/ComImage/ComImage";
import images from "../../../img";
import ComAllProducts from "../../Components/ComAllProducts/ComAllProducts";
import { textApp } from "../../../TextContent/textApp";

export default function ShowAll(props) {
  return (
    <>
      <ComHeader />
      {/* <div className="mx-auto max-w-2xl px-4 py-2  sm:mt-4 sm:px-6 lg:py-2 lg:max-w-7xl ">
                <ComImage showThumbnails={false} product={images.Home} />
</div> */}
      <ComAllProducts
        link={`/product?limit=999`}
        text={textApp.Home.text}
        getAll={"/"}
      />
      <ComFooter />
    </>
  );
}
