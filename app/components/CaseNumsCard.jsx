'use client'
import { useEffect, useState } from "react";
import { BiRightTopArrowCircle, BiRightDownArrowCircle } from "react-icons/bi";

export default function CaseNumsCard({ title, value, percentage }) {
  const [count, setCount] = useState(0);
  const [showPercentage, setShowPercentage] = useState(false); 

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000; 
    const incrementTime = 50; 
    const totalSteps = Math.ceil(duration / incrementTime); 
    const increment = end / totalSteps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end; 
        if(start = end){
          setShowPercentage(true);
        }
      
      }
      setCount(Math.round(start)); 
    }, incrementTime);

    return () => clearInterval(counter); 
  }, [value]);

  return (
    <div className="rounded-lg bg-white shadow p-4 text-center transition-transform transform hover:scale-105 py-6 ">
      <div className="flex flex-row items-center justify-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className={`ml-3 px-2 flex flex-row justify-between items-center text-xs font-light rounded-lg h-6 transition-opacity duration-500 ease-in-out ${showPercentage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${percentage < 0 ? 
          'text-red-500 bg-red-100' 
          : 
          'text-green-500 bg-green-100'
        }`}>
          {
            percentage < 0 ?
              <BiRightDownArrowCircle className="text-red-500 inline-block mr-1" />
              :
              <BiRightTopArrowCircle className="text-green-500 inline-block mr-1" />
          }
          {Math.abs(percentage)}%
        </div>
      </div>
      {title && <div className="text-sm text-gray-400 mt-2">{title}</div>}
    </div>
  )
}