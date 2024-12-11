/** @format */
import { apiGetProducts } from "../../apis";
import { useEffect, useState } from "react";

import { getNewProducts } from "../../redux/products/productsAction";
import { useDispatch, useSelector } from "react-redux";
import CustomSlider from "../Slider/CustomSlider";

const tabs = [
  { id: 1, title: "Best Seller" },
  { id: 2, title: "New Arrivals" },
  // { id: 3, title: "Tablet" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [products, setProducts] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.product);
  const fetchProduct = async () => {
    const response = await apiGetProducts({ sort: "-sold" });

    if (response.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProduct();
    dispatch(getNewProducts());
  }, []);

  useEffect(() => {
    if (isActive === 1) setProducts(bestSellers);
    if (isActive === 2) setProducts(newProducts);
  }, [isActive]);
  return (
    <nav className="">
      <div className="flex gap-5  text-[#151515] border-b-2 border-main border-solid pb-[15px]">
        {tabs.map((tab) => (
          <span
            onClick={() => setIsActive(tab.id)}
            key={tab.id}
            className={`uppercase cursor-pointer border-solid  border-[#b1b1b1] font-semibold text-[20px] ${
              isActive === tab.id ? "opacity-100" : "opacity-50"
            } ${tab.id === 1 ? "" : "pl-5 border-l-[1px] "}`}
          >
            {tab.title}
          </span>
        ))}
      </div>
      <div className="mt-5 mb-5 mx-[-10px] ">
        <CustomSlider products={products} isActive={isActive} sizeImage={243} />
      </div>
      <div className="flex gap-5">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1"
        />
      </div>
    </nav>
  );
};

export default BestSeller;
