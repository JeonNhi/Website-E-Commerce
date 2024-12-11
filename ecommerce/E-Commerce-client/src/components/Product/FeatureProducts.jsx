/** @format */

import { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const FeatureProducts = () => {
  const [products, setProducts] = useState(null);
  const fetchDataFeatureProduct = async () => {
    const res = await apiGetProducts({
      limit: 9,
      // page: Math.round(Math.random() * 2),
      // totalRating: 4,
    });
    if (res.success) setProducts(res.products);
  };
  useEffect(() => {
    fetchDataFeatureProduct();
  }, []);
  return (
    <div>
      <h2 className="text-[20px] py-[15px] mb-[20px] font-semibold text-heading uppercase border-b-2 border-main border-solid ">
        Feature Products
      </h2>
      <div className="flex flex-wrap mx-[-10px]">
        {products?.map((prod) => (
          <Link
            to={`/${prod?.category}/${prod?._id}/${prod?.title}`}
            key={prod._id}
            className="w-1/3 px-[10px] mb-[20px] cursor-pointer"
          >
            <ProductCard
              title={prod.title}
              rating={prod.totalRating}
              price={prod.price}
              image={prod.images[0]}
            />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-4 grid-rows-2 h-[655px] gap-5">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="feature"
          className=" w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
          alt="feature"
          className=" w-full h-full object-cover col-span-1 row-span-1"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="feature"
          className=" w-full h-full object-cover col-span-1 row-span-2"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
          alt="feature"
          className=" w-full h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
