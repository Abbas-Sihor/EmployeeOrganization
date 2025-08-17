import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchUser, logoutUser } from "@/lib/action/userAction";

const Sidebar = ({page,setPage})=> {
    const [user, setUser] = useState(null);

     useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem("userId"); 
      if (!userId) return;

      const res = await fetchUser(userId);
      if (res?.error) {
        console.error(res.error);
      } else {
        console.log("Fetched User:", res)
        setUser(res.data);
      }
    };

    getUser();
  }, []); 
  return (
    <div className="w-[252px] h-screen bg-brandBlue flex flex-col px-8 py-3
     text-white font-medium text-[16px] gap-6">
      
      <Image
        src="/logo.png" width={164} height={43} alt="logo"/>

      {/* Dashboard */}
      <div className="flex items-center gap-3 mt-15 cursor-pointer">
       {page==1? <span className="w-[3px] h-6 bg-white block"></span>:""}
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 22V12H15.5V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p onClick={()=>setPage(1)} className="">Dashboard</p>
      </div>

      {/* Employees */}
      <div className="flex items-center gap-3 cursor-pointer">
        {page==2? <span className="w-[3px] h-6 bg-white block"></span>:""}
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 21V19C16.5 17.9391 16.0786 16.9217 15.3284 16.1716C14.5783 15.4214 13.5609 15 12.5 15H6.5C5.43913 15 4.42172 15.4214 3.67157 16.1716C2.92143 16.9217 2.5 17.9391 2.5 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 11C11.7091 11 13.5 9.20914 13.5 7C13.5 4.79086 11.7091 3 9.5 3C7.29086 3 5.5 4.79086 5.5 7C5.5 9.20914 7.29086 11 9.5 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.5 20.9999V18.9999C22.4993 18.1136 22.2044 17.2527 21.6614 16.5522C21.1184 15.8517 20.3581 15.3515 19.5 15.1299" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 3.12988C17.3604 3.35018 18.123 3.85058 18.6676 4.55219C19.2122 5.2538 19.5078 6.11671 19.5078 7.00488C19.5078 7.89305 19.2122 8.75596 18.6676 9.45757C18.123 10.1592 17.3604 10.6596 16.5 10.8799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p onClick={()=>setPage(2)}>Employees</p>
      </div>

      {/* Attendance */}
      <div className="flex items-center gap-3 cursor-pointer">
        {page==3? <span className="w-[3px] h-6 bg-white block"></span>:""}
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 4H5.5C4.39543 4 3.5 4.89543 3.5 6V20C3.5 21.1046 4.39543 22 5.5 22H19.5C20.6046 22 21.5 21.1046 21.5 20V6C21.5 4.89543 20.6046 4 19.5 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 10H21.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 14H8.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5 14H12.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 14H16.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 18H8.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5 18H12.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 18H16.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p onClick={()=>setPage(3)}>Attendance</p>
      </div>

      {/* Task */}
      <div className="flex items-center gap-3 cursor-pointer">
        {page==4? <span className="w-[3px] h-6 bg-white block"></span>:""}
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 6H21.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.5 12H21.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.5 18H21.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 6L4.5 7L6.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 12L4.5 13L6.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 18L4.5 19L6.5 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p onClick={()=>setPage(4)}>Task</p>
      </div>

      {/* Settings */}
      <div className="flex items-center gap-3 cursor-pointer">
        {page==5? <span className="w-[3px] h-6 bg-white block"></span>:""}
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.72 2H12.28C11.7496 2 11.2409 2.21071 10.8658 2.58579C10.4907 2.96086 10.28 3.46957 10.28 4V4.18C10.2796 4.53073 10.1871 4.87519 10.0115 5.17884C9.83602 5.48248 9.58374 5.73464 9.28 5.91L8.85 6.16C8.54596 6.33554 8.20108 6.42795 7.85 6.42795C7.49893 6.42795 7.15404 6.33554 6.85 6.16L6.7 6.08C6.24107 5.81526 5.69584 5.74344 5.184 5.88031C4.67217 6.01717 4.23555 6.35154 3.97 6.81L3.75 7.19C3.48526 7.64893 3.41345 8.19416 3.55031 8.706C3.68717 9.21783 4.02154 9.65445 4.48 9.92L4.63 10.02C4.93228 10.1945 5.18362 10.4451 5.35905 10.7468C5.53448 11.0486 5.6279 11.391 5.63 11.74V12.25C5.6314 12.6024 5.53965 12.949 5.36405 13.2545C5.18844 13.5601 4.93521 13.8138 4.63 13.99L4.48 14.08C4.02154 14.3456 3.68717 14.7822 3.55031 15.294C3.41345 15.8058 3.48526 16.3511 3.75 16.81L3.97 17.19C4.23555 17.6485 4.67217 17.9828 5.184 18.1197C5.69584 18.2566 6.24107 18.1847 6.7 17.92L6.85 17.84C7.15404 17.6645 7.49893 17.5721 7.85 17.5721C8.20108 17.5721 8.54596 17.6645 8.85 17.84L9.28 18.09C9.58374 18.2654 9.83602 18.5175 10.0115 18.8212C10.1871 19.1248 10.2796 19.4693 10.28 19.82V20C10.28 20.5304 10.4907 21.0391 10.8658 21.4142C11.2409 21.7893 11.7496 22 12.28 22H12.72C13.2504 22 13.7591 21.7893 14.1342 21.4142C14.5093 21.0391 14.72 20.5304 14.72 20V19.82C14.7204 19.4693 14.8129 19.1248 14.9885 18.8212C15.164 18.5175 15.4163 18.2654 15.72 18.09L16.15 17.84C16.454 17.6645 16.7989 17.5721 17.15 17.5721C17.5011 17.5721 17.846 17.6645 18.15 17.84L18.3 17.92C18.7589 18.1847 19.3042 18.2566 19.816 18.1197C20.3278 17.9828 20.7645 17.6485 21.03 17.19L21.25 16.8C21.5147 16.3411 21.5866 15.7958 21.4497 15.284C21.3128 14.7722 20.9785 14.3356 20.52 14.07L20.37 13.99C20.0648 13.8138 19.8116 13.5601 19.636 13.2545C19.4604 12.949 19.3686 12.6024 19.37 12.25V11.75C19.3686 11.3976 19.4604 11.051 19.636 10.7455C19.8116 10.4399 20.0648 10.1862 20.37 10.01L20.52 9.92C20.9785 9.65445 21.3128 9.21783 21.4497 8.706C21.5866 8.19416 21.5147 7.64893 21.25 7.19L21.03 6.81C20.7645 6.35154 20.3278 6.01717 19.816 5.88031C19.3042 5.74344 18.7589 5.81526 18.3 6.08L18.15 6.16C17.846 6.33554 17.5011 6.42795 17.15 6.42795C16.7989 6.42795 16.454 6.33554 16.15 6.16L15.72 5.91C15.4163 5.73464 15.164 5.48248 14.9885 5.17884C14.8129 4.87519 14.7204 4.53073 14.72 4.18V4C14.72 3.46957 14.5093 2.96086 14.1342 2.58579C13.7591 2.21071 13.2504 2 12.72 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12C9.5 13.6569 10.8431 15 12.5 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p onClick={()=>setPage(5)}>Settings</p>
      </div>
      <div className="flex flex-row gap-1 items-center mt-65">
        <div className="flex flex-row items-center gap-3">
        <Image
          src={"/profile.png" || "/defaultProfile.png"}
          width={40}
          height={40}
          alt="profile"
          className="rounded-full"
        />
        </div>
        <div className="flex flex-col text-white">

        <p className="text-[16px] self-center">{user?.name || "User"}</p>
        <p className="text-neutral-300">{user?.role}</p>
        <p className="cursor-pointer text-red-100" onClick={()=>{logoutUser()}}>Logout?</p>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
