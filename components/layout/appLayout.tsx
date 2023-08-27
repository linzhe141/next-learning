"use client";
import Nav from "@/components/layout/nav";
import Content from "@/components/layout/content";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  function resizeHandle (){
    setShowNav(false)
  }
  useEffect(()=>{
    window.addEventListener('resize', resizeHandle)
    return ()=>{
    window.removeEventListener('resize', resizeHandle)
    }
  },[])
  return (
    <main className="flex h-screen flex-col">
      <div className="h-10 flex items-center justify-between px-2 bg-gray-500 ">
        <span>linzhe-blog</span>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className=" px-2 rounded text-gray-600 bg-red-100 hover:bg-red-200 hover:text-gray-800"
        >
          logout!
        </button>
      </div>
      <div className="h-10 lg:h-0 overflow-hidden border-y-2 flex px-2 items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowNav(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="7" width="11" height="2" fill="#606266"></rect>
            <rect x="2" y="11" width="14" height="2" fill="#606266"></rect>
            <rect x="2" y="15" width="8" height="2" fill="#606266"></rect>
            <rect x="2" y="3" width="16" height="2" fill="#606266"></rect>
          </svg>
          <span className="ml-2">Menu</span>
        </div>
        <div
          onClick={() => setShowNav(false)}
          className={`cursor-pointer top-0 bottom-0 left-0 right-0 transition-all duration-300 ${
            showNav ? "fixed bg-gray-400 bg-opacity-60" : "static"
          }`}
        ></div>
      </div>
      <div className="flex flex-1 h-0 overflow-auto">
        <Nav show={showNav} />
        <Content>{children}</Content>
      </div>
    </main>
  );
}
