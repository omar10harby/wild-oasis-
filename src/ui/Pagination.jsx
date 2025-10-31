import React from "react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const CurrentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  function next() {
    if (CurrentPage < pageCount) {
      searchParams.set("page", CurrentPage + 1);
      setSearchParams(searchParams);
    }
  }
  function prev() {
    if (CurrentPage > 1) {
      searchParams.set("page", CurrentPage - 1);
      setSearchParams(searchParams);
    }
  }
  if (pageCount <= 1) return null;
  return (
    <div className="flex justify-between items-center py-3 px-3">
      <p className="text-sm font-semibold">
        <span>
          Showing {(CurrentPage - 1) * PAGE_SIZE + 1} to{" "}
          {CurrentPage * PAGE_SIZE < count ? CurrentPage * PAGE_SIZE : count}{" "} of {count} results
        </span>
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={CurrentPage === 1}
          className={`flex items-center gap-1.5 cursor-pointer bg-gray-100 text-sm font-semibold px-2 py-1 
  rounded-md transition-all duration-300 
  hover:bg-[#4f46e5] hover:text-white 
  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed `}
        >
          <FaChevronLeft size={15} />
          Previous
        </button>
        <button
          onClick={next}
          disabled={CurrentPage === pageCount}
          className={`flex items-center gap-1.5 cursor-pointer bg-gray-100 text-sm font-semibold px-2 py-1 
  rounded-md transition-all duration-300 
  hover:bg-[#4f46e5] hover:text-white 
  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-200`}
        >
          Next
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
