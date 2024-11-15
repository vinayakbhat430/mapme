"use client";

import Link from "next/link";
import DynamicDialogWithTable from "./maps/savedModels";
 

const Navbar = ({currentUser}:{currentUser:any}) => {
  
  // Define the navigation links based on user authentication status
  const links = [
    currentUser && { label: 'Sign out', href: '/auth/logout' },
    !currentUser && { label: 'Sign in', href: '/auth/login' },
    !currentUser && { label: 'Sign up', href: '/auth/register' },
  ]
    .filter(linkConfig => linkConfig) // Remove falsy values (like null or undefined)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} className="text-gray-700 hover:text-blue-600">
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-blue-600">
        MapMe
      </Link>
      <div className="flex justify-end space-x-6">
        <ul className="flex space-x-6 items-center">
          {links}
        </ul>
        <DynamicDialogWithTable/>
      </div>
    </nav>
  );
};

export default Navbar;
