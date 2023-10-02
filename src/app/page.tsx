"use client";

import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLInputElement>(null);

  // after clicking on the button, add data of input to local storage
  function handleClick() {
    localStorage.setItem("search", ref?.current?.value || "Default");
  }

  function sendToServer() {
    const value = localStorage.getItem("search");
    fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({ search: value || "Default" }),
    })
      .then((res) => res.text())
      .then((text) => {
        document.querySelector(".response")!.innerHTML = text;
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <input
        className="w-full h-12 px-4 rounded-lg border border-gray-700 focus:outline-none bg-gray-800"
        type="text"
        ref={ref}
        placeholder="Search"
      />
      <button
        className="w-full h-12 px-4 rounded-lg border border-gray-700 focus:outline-none bg-gray-800"
        onClick={handleClick}
      >
        Set to local storage
      </button>
      <button
        className="w-full h-12 px-4 rounded-lg border border-gray-700 focus:outline-none bg-gray-800"
        onClick={sendToServer}
      >
        Send to server
      </button>
      <div className="response"></div>
    </main>
  );
}
