import { useState } from "react";
import BookingDataBox from "../features/Bookings/BookingDataBox";
import useBooking from "../features/Bookings/useBooking";
import { useMoveBack } from "../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../ui/ConfirmDelete";
import { HiArrowLeft, HiOutlineTrash, HiOutlineDotsVertical } from "react-icons/hi";
import { HiMiniArrowDownOnSquare, HiMiniArrowUpOnSquare } from "react-icons/hi2";
import DropMenu from "../ui/DropMenu";
import useDeleteBooking from "../features/Bookings/useDeleteBooking";
import useCheckOut from "../features/check-in-out/useCheckOut";

function Booking() {
  const { booking, isLoading } = useBooking();
  const {DeleteBooking,isDeleteing}=useDeleteBooking()
  const {CheckOut}=useCheckOut()
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) return <p>loading...</p>;

  const { id: bookingId } = booking;

  const statusColors = {
    unconfirmed: "bg-[#e0f2fe] text-[#0369a1]",
    "checked-in": "bg-[#dcfce7] text-[#15803d]",
    "checked-out": "bg-[#e5e7eb] text-[#374151]",
  };

  const canCheckIn = booking.status === "unconfirmed";
  const canCheckOut = booking.status === "checked-in";
  const isCheckedOut = booking.status === "checked-out";

  // Handle Check-in
  function handleCheckIn() {
    navigate(`/checkIn/${bookingId}`);
    setIsMenuOpen(false);
  }

  // Handle Check-out
  function handleCheckOut() {
    CheckOut(bookingId)
    setIsMenuOpen(false);
  }

  // Handle Delete
  function handleDelete() {
    // TODO: Implement delete mutation
    DeleteBooking(bookingId)
    setIsDeleteModalOpen(false);
    moveBack();
  }

  return (
    <>
      <div className="flex flex-col">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              Booking #{bookingId}
            </h1>
            <p
              className={`${
                statusColors[booking.status]
              } text-xs px-2 py-1 rounded-lg font-semibold uppercase`}
            >
              {booking.status}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Buttons - Hidden on Mobile */}
            <div className="hidden md:flex gap-2">
              {canCheckIn && (
                <button
                  onClick={handleCheckIn}
                  className="flex items-center gap-2 px-4 py-2 bg-[#4f46e5] text-white rounded-lg font-semibold hover:bg-[#4338ca] transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                  <HiMiniArrowDownOnSquare size={18} />
                  <span>Check In</span>
                </button>
              )}

              {canCheckOut && (
                <button
                  onClick={handleCheckOut}
                  className="flex items-center gap-2 px-4 py-2 bg-[#4f46e5] text-white rounded-lg font-semibold hover:bg-[#4338ca] transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                  <HiMiniArrowUpOnSquare size={18} />
                  <span>Check Out</span>
                </button>
              )}

         
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md text-sm"

                >
                  <HiOutlineTrash size={18} />
                  <span>Delete</span>
                </button>

              <button
                onClick={moveBack}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 text-sm"
              >
                <HiArrowLeft size={18} />
                <span>Back</span>
              </button>
            </div>

            {/* Mobile Menu - Hidden on Desktop */}
            <div className="md:hidden flex items-center gap-2">
              {/* Back Button - Always visible on mobile */}
              <button
                onClick={moveBack}
                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                <HiArrowLeft size={20} />
              </button>

              {/* Dropdown Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  <HiOutlineDotsVertical size={20} />
                </button>

                <DropMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                  {canCheckIn && (
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all text-left"
                      onClick={handleCheckIn}
                    >
                      <HiMiniArrowDownOnSquare size={20} className="text-gray-500" />
                      <span>Check In</span>
                    </button>
                  )}

                  {canCheckOut && (
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all text-left"
                      onClick={handleCheckOut}
                    >
                      <HiMiniArrowUpOnSquare size={20} className="text-gray-500" />
                      <span>Check Out</span>
                    </button>
                  )}

                    <button
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all text-left"
                    >
                      <HiOutlineTrash size={20} className="text-red-500" />
                      <span>Delete</span>
                    </button>
                </DropMenu>
              </div>
            </div>
          </div>
        </div>

        <BookingDataBox booking={booking} />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        resourceName={`Booking #${bookingId}`}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default Booking;