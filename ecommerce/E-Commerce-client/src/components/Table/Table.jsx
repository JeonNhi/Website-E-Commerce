/** @format */

import React, { memo } from "react";
import Pagination from "../Paginate/Pagination";

const Table = ({ title, columns, data, groupButton, count, limit }) => {
  return (
    <>
      <div className="relative overflow-x-auto  font-lato text-[#000000E0]">
        <div className="flex items-center justify-between rounded-t-md bg-white py-2 px-4 ">
          <h3 className="capitalize text-[18px] font-semibold ">{title}</h3>
          <div className="flex items-center gap-2 font-normal">
            {groupButton?.map((btn) => (
              <div key={btn?.id}>{btn.button}</div>
            ))}
          </div>
        </div>
        <table className="w-full  text-left rtl:text-right">
          <thead className="text-[16px]  capitalize font-semibold bg-[#fafafa] py-2">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-4 py-3 ">
                  <div className="flex items-center justify-center">
                    {column?.title}
                    {column?.sort && (
                      <a href="#">
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white text-[14px] border-b border-[1px] border-gray-100 border-solid font-medium  hover:bg-gray-50 "
              >
                {columns.map((column, index) => (
                  <td
                    key={column?.key}
                    className="px-4 py-4 align-middle text-center"
                  >
                    {column.render
                      ? column.render(item[column.key], index)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="w-full bg-white px-4 py-1"
          aria-label="Table navigation"
        >
          {count > 0 ? (
            <Pagination totalCount={count} limit={limit} />
          ) : (
            <div className="leading-5 text-center min-h-[200px] flex items-center justify-center">
              Không có sản phẩm nào
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Table);
