"use client";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  return (
    <div className="h-screen bg-green-400 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">blog</h1>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-4 px-2 rounded text-gray-600 bg-red-100 hover:bg-red-200 hover:text-gray-800"
        >
          login
        </button>
      </div>
    </div>
  );
}
