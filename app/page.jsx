'use client'
import { useState } from "react";
import Dashboard from "./components/dashboard"
import Nav from "./components/Nav";
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
 
  return (
<div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
  <div className={` ${isMobile ? "w-full fixed top-0 left-0 z-50" : "w-64 fixed left-0 top-0"}`}>
    <Nav isMobile={isMobile} setIsMobile={setIsMobile} />
  </div>
  <div className={`flex-1 p-6 bg-gray-100 min-h-screen ${isMobile ? "ml-0 mt-16" : "ml-64"}`}>
    <Dashboard />
  </div>
</div>

  );
}
 