"use client";
import React, { useEffect, useState } from "react";
import MainSide from "@/components/MainSide";
import Sidebar from "@/components/Sidebar";
import EmployeeTable from "@/components/EmployeeTable";

export default function Home() {
  const [page, setPage] = useState(1);
  

  const DisplayData = () => {
    switch (page) {
      case 1:
        return <MainSide />;
      case 2:
        return <EmployeeTable />;
      case 3:
        return <div className="p-6">Attendance component not implemented yet</div>;
      case 4:
       
        return <div className="p-6">Task component not implemented yet</div>;
      case 5:
        return  <div className="p-6">Settings component not implemented yet</div>;
      default:
     return <MainSide />;    
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <Sidebar page={page} setPage={setPage} />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <DisplayData />
      </main>
    </div>
  );
}

