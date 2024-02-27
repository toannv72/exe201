import { useEffect, useState } from "react";
import { getData } from "../../../api/api";
import { ComLink } from "../ComLink/ComLink";
import { textApp } from "../../../TextContent/textApp";
import images from "../../../img";
import "./ComAllCss.css";

export default function ComAllProducts({ text, link, getAll }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const productsPerPage = 16;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const calculateProductRange = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  useEffect(() => {
    getData(link)
      .then((data) => {
        setProducts(data.data.docs);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [link]);

  function formatCurrency(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
    });
  }

  function discount(initialPrice, discountedPrice) {
    if (initialPrice <= 0 || discountedPrice <= 0) {
      return "Giá không hợp lệ";
    }
    let discountPercentage =
      ((initialPrice - discountedPrice) / initialPrice) * 100;
    return discountPercentage.toFixed(0);
  }

  const filteredProducts = products.filter((product) => {
    const priceFilter =
      (!minPrice || product.reducedPrice >= minPrice) &&
      (!maxPrice || product.reducedPrice <= maxPrice);

    const materialFilter =
      !selectedMaterial || product.material+"" === selectedMaterial

    const nameFilter =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
      console.log("product.material", product.material+"" );
      console.log("searchQuery", searchQuery );
    return priceFilter && materialFilter && nameFilter;
    
  });
console.log ("selectedMaterial", selectedMaterial);
  const productRange = calculateProductRange();
  return (
    <div className="bg-white p-4">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="bg-red-500 h-12 flex items-center p-2 text-2xl font-bold tracking-tight text-white mb-4">
          {text}
        </h2>

        {/* Filter and Search Input Fields */}
        <div className="mx-auto">
  Tìm kiếm theo
</div>
<div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
  <div className="mb-4">
    <label>Giá từ:</label>
    <input
      className="bg-gray-100 border border-gray-400 text-gray-700 text-sm rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      type="number"
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(parseInt(e.target.value, 10))}
    />
    <label>đến:</label>

    <input
      className="bg-gray-100 border border-gray-400 text-gray-700 text-sm rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      type="number"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
      />
  </div>
  <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
    <select
      value={selectedMaterial}
      onChange={(e) => setSelectedMaterial(e.target.value)}
    >
      <option value="">Chất liệu</option>
      <option value="Gỗ">Gỗ</option>
      <option value="Nhựa">Nhựa</option>
      <option value="Kim loại">Kim loại</option>
    </select>
  </div>
  <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
    <input
      className="bg-gray-100 border border-gray-400 text-gray-700 text-sm rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      type="text"
      placeholder="Tìm kiếm theo tên"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
</div>

     
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productRange.map((product, index) => (
            <ComLink
              key={index}
              to={`/product/${product._id}`}
              className="shadow-md border-solid border-2 border-white hover:border-zinc-400"
            >
              <div className="relative h-80 overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border-solid border-2 border-stone-100">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full absolute"
                />
                <div className="relative w-14 h-14 mt-2 ml-2 flex justify-center items-center">
                  <img
                    src={images.discount}
                    alt={product.imageAlt}
                    className="w-14 h-14 object-cover object-center absolute"
                  />
                  <span className="absolute text-white">
                    -{discount(product.price, product.reducedPrice)}%
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-base h-12 ml-2 mr-2 text-gray-700 line-clamp-2">
                {product.name}
              </h3>
              <div className="">
                <p className="mt-1 ml-2 text-sm font-medium line-through text-slate-500">
                  {formatCurrency(product.price)}
                </p>
                <p className="ml-2 pb-4 text-2xl font-medium text-red-600">
                  {formatCurrency(product.reducedPrice)}
                </p>
              </div>
            </ComLink>
          ))}
        </div>
        <div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="page-info">
          Page {currentPage} of {totalPages}
        </div>
        </div>
        
      </div>
    </div>
  );
}
