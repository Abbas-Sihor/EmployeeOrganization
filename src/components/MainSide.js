"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { ChartBarDefault } from './ChartBarDefault'
import { getEmployeeCount } from '@/lib/action/employeeAction';
import { countInterns } from '@/lib/action/userAction';


const MainSide = () => {
  const [interncount, setInternCount] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const totalemployee = async()=>{
      const res = await getEmployeeCount()
      setCount(res?.count || 0)

    }
    const totalinterns = async()=>{
      const res = await countInterns();
      setInternCount(res?.count || 0);
    }
    totalinterns();
    totalemployee()
  }, []);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      window.location.href = "/login";
      return;
    }

  },[]);
  return (
    <div className='flex flex-col gap-4 px-16 py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
  <Card title="Total Employees" count={count} percentage="12% from last month" img="/employeedashboard.png" />
  <Card title="Active Tasks" count="87" percentage="3% from last month" img ="/taskdashboard.png" />
  <Card title="Interns" count={interncount} percentage="5% from last month" img = "/interndashboard.png"/>
  
</div>
<ChartBarDefault/>

      
    </div>
  )
}

export default MainSide
