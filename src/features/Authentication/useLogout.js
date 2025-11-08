import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLogout } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("user successfully logout");
      navigate("/login");
    },
    onError: () => {
      toast.error("faild to logout");
    },
  });
  return { logout, isLogout };
}

export default useLogout;
