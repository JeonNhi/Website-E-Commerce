/** @format */
import { useSelector } from "react-redux";
import {
  SideBar,
  Banner,
  BestSeller,
  Daily,
  FeatureProducts,
  CustomSlider,
  HotCollection,
} from "../../components";
const Home = () => {
  const { newProducts } = useSelector((state) => state.product);
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  return (
    <>
      <div className="w-main  flex mt-5 px-5 ">
        <div className="flex flex-col gap-[30px] w-[25%] ">
          <SideBar />
          <Daily />
        </div>
        <div className="flex flex-col gap-[30px] pl-5 w-[75%]  flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="w-main px-5 mt-5">
        <FeatureProducts />
      </div>
      <div className="w-main px-5 mt-5">
        <h2 className="flex gap-5 font-semibold text-[20px] py-5  text-heading uppercase border-b-2 border-main border-solid pb-[15px]">
          New Arrivals
        </h2>
        <div className="mt-5 mb-5 mx-[-10px] ">
          <CustomSlider products={newProducts} sizeImage={345} showDes={true} />
        </div>
      </div>
      <div className="w-main px-5 mt-5">
        <HotCollection />
      </div>
    </>
  );
};

export default Home;
