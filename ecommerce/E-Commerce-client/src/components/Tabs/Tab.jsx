/** @format */

import React, { memo, useEffect, useRef } from "react";

const Tabs = ({
  tabs,
  heightContent,
  activeTab,
  handleTabClick,
  scrollPosition,
}) => {
  const tabRef = useRef();
  const lineRef = useRef();

  useEffect(() => {
    lineRef.current.style.left = tabRef.current.offsetLeft + "px";
    lineRef.current.style.width = tabRef.current.offsetWidth + "px";
  }, [activeTab]);
  console.log("ff", scrollPosition);
  return (
    <div className=" flex flex-col w-full">
      <div className={`${scrollPosition && "sticky__header"} flex relative `}>
        {tabs.map((tab, index) => (
          <div
            ref={activeTab === index ? tabRef : null}
            key={index}
            className={` text-[16px] w-full select-none  py-3 px-4 bg-white  border-b-[2px] border-solid border-b-[#ccc]  text-center cursor-pointer  transition-all duration-500 ease-in-out ${
              index === activeTab ? "text-main opacity-100" : "opacity-60"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
        <div
          ref={lineRef}
          className="absolute w-0 left-0 h-[2px] bottom-0 transition-all duration-200 ease-in-out bg-main"
        ></div>
      </div>
      <div className={`overflow-auto ${heightContent}`}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default memo(Tabs);
