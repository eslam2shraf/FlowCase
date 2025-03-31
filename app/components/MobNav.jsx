'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useAppDispatch } from '@/redux/hooks';
import { clearAuth } from '@/redux/slices/authSlice';
import { useState } from 'react';
import { Menu, X } from "lucide-react";

const MobNav = ({ handleLogout, menuItems }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 md:hidden">
      <div className="flex justify-between items-center">
        <div className="font-bold text-[#08115e]">CaseFlow</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#08115e] focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`mt-4 space-y-3 ${isMobileMenuOpen ? "block" : "hidden"} transition-all duration-300 ease-in-out`}
      >
        {menuItems.map((section, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 mb-2">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href="/"
                  className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                    pathname === item.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                 
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default MobNav;
