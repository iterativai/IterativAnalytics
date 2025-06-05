import { Link } from "wouter";
import { User } from "@/lib/AuthProvider";

interface SidebarUser extends Omit<User, 'id'> {
  id: number | string;
}

interface SidebarProps {
  user: User;
  isOpen: boolean;
  currentPath: string;
}

export default function Sidebar({ user, isOpen, currentPath }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center px-4">
                <svg className="w-8 h-8 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <span className="text-lg font-semibold text-gray-900">Iterativ Planner</span>
              </div>
              <MobileSidebarContent user={user} currentPath={currentPath} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">Iterativ Planner</span>
            </div>
          </div>
          <DesktopSidebarContent user={user} currentPath={currentPath} />
        </div>
      </div>
    </>
  );
}

function MobileSidebarContent({ user, currentPath }: { user: User; currentPath: string }) {
  return (
    <div className="mt-5 px-2 space-y-1">
      <SidebarItems currentPath={currentPath} />
      
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            {user.avatarUrl ? (
              <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium text-lg">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">{user.name}</div>
            <div className="text-sm font-medium text-gray-500">{user.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSidebarContent({ user, currentPath }: { user: User; currentPath: string }) {
  return (
    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center px-4 mb-4">
        <div className="relative inline-block w-full">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            defaultValue={user.userType}
          >
            <option value="startup">Startup View</option>
            <option value="investor">Investor View</option>
          </select>
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-1 bg-white">
        <SidebarItems currentPath={currentPath} />
      </nav>
      
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div>
            {user.avatarUrl ? (
              <img className="inline-block h-9 w-9 rounded-full" src={user.avatarUrl} alt={user.name} />
            ) : (
              <div className="inline-block h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItems({ currentPath }: { currentPath: string }) {
  return (
    <>
      <Link href="/">
        <a className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
          currentPath === "/" ? "text-white bg-primary-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}>
          <svg 
            className={`w-6 h-6 mr-3 ${
              currentPath === "/" ? "text-white" : "text-gray-400 group-hover:text-gray-500"
            }`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
          Dashboard
        </a>
      </Link>
      
      <a 
        href="#" 
        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <svg 
          className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        My Documents
      </a>
      
      <a 
        href="#" 
        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <svg 
          className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        Analytics
      </a>
      
      <a 
        href="#" 
        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <svg 
          className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        Collaborators
      </a>
      
      <a 
        href="#" 
        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
      >
        <svg 
          className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
        Settings
      </a>
    </>
  );
}
