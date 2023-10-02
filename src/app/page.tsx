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
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({ search: value || "Default" }),
    })
      .then((res) => res.text())
      .then((text) => {
        let prettifed = JSON.stringify(JSON.parse(text), null, 2);
        document.querySelector(".response")!.innerHTML = prettifed;
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
        Send to server to forward to httpbin.org to test, then get response
      </button>
      <pre className="response"></pre>
    </main>
  );
}
