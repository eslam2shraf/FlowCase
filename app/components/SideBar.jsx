'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar ({menuItems,handleLogout})  {
  const pathname = usePathname();

 return (
  
        <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col">

        <div className="flex flex-col items-left gap-4 p-4 pb-0 ">
          <h2 className="text-xl font-bold text-[#08115e] dark:text-[#08115e] w-full">CaseFlow</h2>
           <hr className="border-t border-gray-300 w-[80%]" />
        </div>
          

        <div className="p-4">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4">
                {section.title}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href="/"
                    // onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                      pathname === item.path
                        ? 'bg-indigo-50 text-white dark:bg-indigo-900 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
  
        <div className="absolute bottom-0 w-full flex flex-col item-left gap-4 p-4">
        <hr className="border-t border-gray-300 w-[80%]" />

          <div className="flex items-center">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</p>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

  );
}

