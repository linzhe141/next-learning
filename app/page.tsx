"use client";
import Nav from "@/components/layout/nav";
import Content from "@/components/layout/content";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
      <div className="flex flex-1 h-0 overflow-auto">
        <Nav />
        <Content />
      </div>
    </main>
  );
}
