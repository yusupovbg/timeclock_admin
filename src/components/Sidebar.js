// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed top-0 z-0 left-0 h-full w-64 shadow-md bg-gray-50 p-2">
    <div className="flex mt-4 text-black justify-center items-center ext-black mb-2 font-bold text-xl"><Link to='/'>Admin</Link></div>
      <ul className="space-y-2 mt-4">
        <Link to="/user">
        <li>
          <button className=" bg-[#4b49ac] mt-2 shadow-sm hover:bg-black text-white font-medium hover:text-white  px-4 py-2 rounded-md w-full">
            Employee
          </button>
        </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
