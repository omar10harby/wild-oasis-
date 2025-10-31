import React, { useState } from "react";
import {
  HiOutlineDotsVertical,
  HiOutlineDuplicate,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import DropMenu from "../../ui/DropMenu";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCabin from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import AddCabinForm from "./AddCabinForm";
import useCreateCabin from "./useCreateCabin";

function CabinCard({ cabin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { creatCabin } = useCreateCabin();

  function handleDuplicate() {
    creatCabin({
      name: `copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      image: cabin.image,
      discount: cabin.discount,
      description: cabin.description,
    });
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className=" relative bg-white rounded-lg shadow-md  border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className=" h-48 overflow-hidden">
          <img
            src={cabin.image}
            alt={cabin.name}
            className="w-full h-full object-cover"
          />
          {cabin.discount > 0 && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              -{formatCurrency(cabin.discount)}
            </div>
          )}
          
          {/* Menu Button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white shadow-md transition-all"
            >
              <HiOutlineDotsVertical size={20} className="text-gray-700" />
            </button>
            <DropMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                onClick={() => {
                  setIsEditModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <HiOutlinePencil size={20} className="text-gray-500" />
                <span>Edit</span>
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                onClick={handleDuplicate}
              >
                <HiOutlineDuplicate size={20} className="text-gray-500" />
                <span>Duplicate</span>
              </button>

              <button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
              >
                <HiOutlineTrash size={20} className="text-gray-500" />
                <span>Delete</span>
              </button>
            </DropMenu>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Cabin Name */}
          <h3 className="text-xl font-bold text-gray-800">{cabin.name}</h3>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-gray-600">
            <HiOutlineUsers size={18} className="text-gray-400" />
            <span className="text-sm">Fits up to {cabin.maxCapacity} guests</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-3"></div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(cabin.regularPrice)}
              </p>
            </div>

            {cabin.discount > 0 && (
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Discount</p>
                <p className="text-xl font-semibold text-green-600">
                  {formatCurrency(cabin.discount)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        resourceName={cabin.name}
        onConfirm={() => deleteCabin(cabin.id)}
      />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <AddCabinForm
          cabinToEdit={cabin}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default CabinCard;