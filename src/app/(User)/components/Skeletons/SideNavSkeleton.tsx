"use client";
import { AlignJustify, ChevronDown, ChevronRight } from "lucide-react";

const SideNavSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-300 w-full pl-10 flex justify-between">
          <div className="hidden lg:flex items-center justify-end space-x-2">
            <div className="h-5 w-16 bg-gray-300 rounded-md animate-pulse"></div>
            <ChevronRight className="text-gray-400" />
            <div className="h-5 w-12 bg-gray-300 rounded-md animate-pulse"></div>
          </div>

          <div className="lg:hidden flex-none">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <AlignJustify className="h-6 w-6" />
            </label>
          </div>

          <div className="flex-1 lg:hidden px-2 flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="btn btn-ghost btn-square w-12 h-12 animate-pulse"></div>
          </div>

          <div className="hidden lg:block w-full  items-end">
            <ul className="menu menu-horizontal space-x-4">
              <div className="btn btn-ghost btn-square w-12 h-12 animate-pulse"></div>
              <div className="flex items-center gap-4">
                <div className="dropdown">
                  <div className="btn m-1 w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                  <ul className="dropdown-content menu bg-base-100 rounded-box w-48 shadow">
                    <div className="w-full py-2 flex items-end">
                      <div className="w-10 h-10 mx-auto bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                    <div className="px-4 py-2 text-center">
                      <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="mt-2 border-t border-base-content"></div>
                    <div className="py-2">
                      <div className="w-full h-6 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="px-10 py-7">{children}</div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content w-80 p-4 space-y-4 min-h-screen">
          <div className="flex h-16 items-center justify-center space-x-3 border-b border-base-content">
            <div className="h-7 w-7 rounded-lg bg-gray-300 animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2 mt-10">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4 space-y-5">
                <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                <ChevronDown className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavSkeleton;
