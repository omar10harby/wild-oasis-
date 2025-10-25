import React from "react";
import logo from "../data/img/logo-light.png";
import user from "../data/img/default-user.jpg";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
function NavBar({onBarClick}) {
  return (
    <div className="flex justify-between items-center md:justify-end px-5 md:px-[5vw] py-2 border-b border-gray-100">
      <div className="w-16 md:hidden">
        <img src={logo} alt="" className="w-full" />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <div className="w-8 md:w-10">
            <img src={user} alt="" className="w-full" />
          </div>
          <p>user</p>
          <ul className="flex items-center gap-2">
            <li>
              <NavLink>
                <CiUser size={25} />
              </NavLink>
            </li>
            <li className="md:hidden" >
              <HiBars3 size={25} onClick={()=>onBarClick()}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
