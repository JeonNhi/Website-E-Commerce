/** @format */

const ProductExtraInfo = ({ title, subtitle, icon }) => {
  return (
    <div className="flex gap-[10px] p-[10px] border-solid border-[1px] border-[#ccc]">
      <div className="w-[38px] h-[38px] flex items-center justify-center bg-[#505050] rounded-[50%] text-white text-[18px] ">
        {icon}
      </div>
      <div className="capitalize text-[#999]">
        <h3 className="leading-[18px] text-[14px] text-[#505050]">{title}</h3>
        <p className="text-[12px] leading-4 mt-1 line-clamp-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default ProductExtraInfo;
