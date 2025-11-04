import React, { useState } from "react";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import {
  HiMiniArrowDownOnSquare,
  HiMiniArrowUpOnSquare,
} from "react-icons/hi2";
import DropMenu from "../../ui/DropMenu";
import { useNavigate } from "react-router-dom";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useCheckOut from "../check-in-out/useCheckOut";
function BookingRow({ booking }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { DeleteBooking, isDeleteing } = useDeleteBooking();
  const {CheckOut}=useCheckOut()
  const navigate = useNavigate();
  const statusColors = {
    unconfirmed: "bg-[#e0f2fe] text-[#0369a1]",
    "checked-in": "bg-[#dcfce7] text-[#15803d]",
    "checked-out": "bg-[#e5e7eb] text-[#374151]",
  };
  return (
    <>
      <tr className="border-b border-gray-200 ">
        {/* Cabin */}
        <td className="text-base py-3 px-3 text-left w-[8%] font-bold text-gray-700">
          {booking?.cabins?.name}
        </td>

        {/* Guest */}
        <td className="text-sm py-3 px-3 text-left w-[27%] text-gray-700">
          <div className="">
            <span className="block font-semibold mb-1">
              {" "}
              {booking?.guests?.fullName}
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              {booking?.guests?.email}
            </span>
          </div>
        </td>

        {/* Dates */}
        <td className="text-sm py-3 px-3 text-left w-[32%] text-gray-700">
          <span className="block font-semibold mb-1">
            {isToday(new Date(booking?.startDate))
              ? "Today"
              : formatDistanceFromNow(booking?.startDate)}{" "}
            &rarr; {booking?.numNights} night stay
          </span>
          <span className="text-xs text-gray-500 font-semibold">
            {format(new Date(booking?.startDate), "MMM dd yyyy")} –{" "}
            {format(new Date(booking?.endDate), "MMM dd yyyy")}
          </span>
        </td>

        {/* Status */}
        <td className={` text-xs py-3 px-3 font-semibold text-left w-[19%]  `}>
          <span
            className={`${
              statusColors[booking.status]
            } px-2 py-1 rounded-lg uppercase`}
          >
            {" "}
            {booking?.status}
          </span>
        </td>

        {/* Amount */}
        <td className="text-sm py-3 px-3 text-left w-[13%] font-semibold text-gray-900">
          {formatCurrency(booking?.totalPrice)}
        </td>

        {/* Actions */}
        <td className="text-sm py-3 px-3 text-right w-[3.2rem]">
          {/* مثلًا زر تفاصيل أو حذف */}
          <div className=" relative inline-block">
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              <HiOutlineDotsVertical size={20} />
            </button>
            <DropMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
              <button
                className="w-full flex items-center  gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(`/bookings/${booking.id}`);
                }}
              >
                <IoEye size={20} className="text-gray-500" />
                <span>See details</span>
              </button>

              {booking.status === "unconfirmed" && (
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                  onClick={() => navigate(`/checkIn/${booking.id}`)}
                >
                  <HiMiniArrowDownOnSquare
                    size={20}
                    className="text-gray-500"
                  />
                  <span>Check in</span>
                </button>
              )}
              {booking.status === "checked-in" && (
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all" onClick={()=>CheckOut(booking.id)}>
                  <HiMiniArrowUpOnSquare size={20} className="text-gray-500" />
                  <span>Check out</span>
                </button>
              )}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDeleteModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
              >
                <HiOutlineTrash size={20} className="text-gray-500" />
                <span>Delete</span>
              </button>
            </DropMenu>
          </div>
        </td>
      </tr>
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => DeleteBooking(booking.id)}
        resourceName={`Booking #${booking.id}`}
      />
    </>
  );
}

export default BookingRow;
