import { format, isToday } from "date-fns";
import React from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";
import { FiUser, FiMail, FiFlag } from "react-icons/fi";
import { MdFingerprint } from "react-icons/md";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  return (
    <div className="mt-6 md:mt-10 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header Section - Gradient Background */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left side - Cabin Info */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
              <HiOutlineHomeModern size={24} className="md:size-8" />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-1">
                Accommodation
              </p>
              <p className="text-base md:text-lg font-bold">
                {booking?.numNights} night{booking?.numNights > 1 ? "s" : ""} in Cabin {booking.cabins.name}
              </p>
            </div>
          </div>

          {/* Right side - Dates */}
          <div className="text-left md:text-right">
            <p className="text-xs md:text-sm font-medium text-white/90">
              {format(new Date(booking.startDate), "EEE, MMM dd yyyy")}
              <span className="text-white/70 mx-1">
                ({isToday(new Date(booking.startDate))
                  ? "Today"
                  : formatDistanceFromNow(booking.startDate)})
              </span>
            </p>
            <p className="text-xs text-white/70 mt-1">
              to {format(new Date(booking.endDate), "EEE, MMM dd yyyy")}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Guest Information Card */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <FiUser className="text-[#4f46e5]" />
            Guest Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Nationality & Flag */}
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-md border border-gray-200">
                <img
                  src={booking.guests.countryFlag}
                  alt="flag"
                  className="w-6 h-4 object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Nationality</p>
                <p className="text-sm font-semibold text-gray-800">
                  {booking.guests.nationality || "N/A"}
                </p>
              </div>
            </div>

            {/* Full Name */}
            <div className="flex items-start gap-2">
              <div className="bg-white p-2 rounded-md border border-gray-200">
                <FiUser className="text-gray-600" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  {booking.guests.fullName}
                  {booking.numGuests > 1 && (
                    <span className="text-gray-500 text-xs ml-1">
                      + {booking.numGuests - 1} guest{booking.numGuests > 2 ? "s" : ""}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2">
              <div className="bg-white p-2 rounded-md border border-gray-200">
                <FiMail className="text-gray-600" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-xs md:text-sm text-gray-800 break-all">
                  {booking.guests.email}
                </p>
              </div>
            </div>

            {/* National ID */}
            <div className="flex items-start gap-2">
              <div className="bg-white p-2 rounded-md border border-gray-200">
                <MdFingerprint className="text-gray-600" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">National ID</p>
                <p className="text-sm text-gray-800">
                  {booking.guests.nationalId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Breakfast Option */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className={`p-2 rounded-full ${booking.hasBreakfast ? 'bg-green-100' : 'bg-gray-200'}`}>
            <FaRegCheckCircle 
              className={booking.hasBreakfast ? 'text-green-600' : 'text-gray-400'} 
              size={20} 
            />
          </div>
          <div>
            <p className="text-sm md:text-base font-semibold text-gray-800">
              Breakfast included?
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              {booking.hasBreakfast ? "Yes, breakfast is included" : "No breakfast"}
            </p>
          </div>
        </div>

        {/* Observations */}
        {booking.observations && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="text-blue-600">📝</span>
              Observations
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {booking.observations}
            </p>
          </div>
        )}

        {/* Payment Information */}
        <div
          className={`${
            booking.isPaid
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          } p-4 md:p-5 rounded-lg border-2`}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                booking.isPaid ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <CiDollar 
                  size={24} 
                  className={`md:size-8 ${
                    booking.isPaid ? 'text-green-600' : 'text-yellow-600'
                  }`} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                  Total Amount
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatCurrency(booking.totalPrice)}
                </p>
                {booking.hasBreakfast && (
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    ({formatCurrency(booking.cabinPrice)} cabin + {formatCurrency(booking.extrasPrice)} breakfast)
                  </p>
                )}
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
              booking.isPaid 
                ? 'bg-green-600 text-white' 
                : 'bg-yellow-600 text-white'
            }`}>
              {booking.isPaid ? '✓ Paid' : 'Will pay at property'}
            </div>
          </div>
        </div>

        {/* Booking Date Footer */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs md:text-sm text-gray-500 text-center md:text-right">
            <span className="font-semibold">Booked on:</span>{" "}
            {format(new Date(booking.created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingDataBox;