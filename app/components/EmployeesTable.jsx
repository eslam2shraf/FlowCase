"use client";
import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from "react-icons/ti";
import { IoFilter } from "react-icons/io5";


export default function EmployeesTable({ data }) {

  const RECORDPERPAGE = 5;
  const pages = Math.ceil(data.length / RECORDPERPAGE);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filter, setFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"; 
      case "Break":
        return "bg-yellow-100 text-yellow-800"; 
      case "Off":
        return "bg-red-100 text-red-800"; 
      default:
        return "bg-gray-100 text-gray-800"; 
    }
  };
  const sortedData = () => {
    let sortableData = [...data];
  

    if (selectedStatus) {
      sortableData = sortableData.filter(emp => emp.status === selectedStatus);
    }
  
    if (sortConfig.key && sortConfig.direction) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
  
    return sortableData;
  };

  const handleSort = (key) => {
  let direction = 'ascending';

  if (sortConfig.key === key) {
    if (sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.direction === 'descending') {
      direction = null; 
    }
  }

  setSortConfig({ key: direction ? key : null, direction });
};

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilter = (status) => {
    setSelectedStatus(status);
    setIsFilterOpen(false);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow rounded-lg p-8 pt-4">
  
      <div className="relative mx-4 mt-4 text-slate-700 bg-white rounded-none bg-clip-border mb-4">
        <div className="flex items-center justify-between ">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Employees List</h3>
            <p className="text-slate-500">Review each person before edit</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
          <button
          onClick={toggleFilter}
          className=" w-20 flex flex-row justify-between items-center rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex"
          >
          <IoFilter/>
          <span>Filter</span>
        </button>
        {isFilterOpen && (
        <div className="absolute bg-white border border-gray-300 rounded shadow-lg p-4 top-16 right-4 w-52 z-50">
          <p className="font-semibold">Filter by Status</p>
          <hr className="my-2" />
          {["Active", "Break", "Off"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              {status}
            </button>
          ))}
          <button
            onClick={() => setSelectedStatus("")}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      )}
    
            <button
              className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Add member
            </button>
          </div>
        </div>
      </div>
      <div className="p-0 overflow-x-auto md:overflow-x-scroll max-w-full">
      <table className="w-full mt-4 text-left table-auto min-w-max border border-slate-200">
          <thead>
            <tr>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100" onClick={() => handleSort('name')}>
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  Name
                  {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? <TiArrowSortedUp /> : <TiArrowSortedDown />) : <TiArrowUnsorted />}
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100" onClick={() => handleSort('id')}>
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  ID
                  {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? <TiArrowSortedUp /> : <TiArrowSortedDown />) : <TiArrowUnsorted />}
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100" >
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  Status
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100" >
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  Role
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100" onClick={() => handleSort('performance')}>
                <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                  Performance
                  {sortConfig.key === 'performance' ? (sortConfig.direction === 'ascending' ? <TiArrowSortedUp /> : <TiArrowSortedDown />) : <TiArrowUnsorted />}
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData().slice((currentPage - 1) * RECORDPERPAGE, currentPage * RECORDPERPAGE).map((emp) => (
              <tr key={emp.id} className="flex table-row">
                <td className="p-4 border-b border-slate-200 md:table-cell">
                  <div className="flex items-center gap-3">
                    <img src={emp.image} alt={emp.name} className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-700">{emp.name}</p>
                      <p className="text-sm text-slate-500">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200 md:table-cell">
                  <p className="text-sm font-semibold text-slate-700">{emp.id}</p>
                </td>
                <td className="p-4 border-b border-slate-200 md:table-cell">
                  <div className={`w-max ${statusClasses(emp.status)}`}>
                    <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap">
                      <span>{emp.status}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200 md:table-cell">
                  <p className="text-sm text-slate-500">{emp.role}</p>
                </td>
                <td className="p-4 border-b border-slate-200 md:table-cell">
                  <div className="relative group">
                    <div className="h-2 bg-gray-200 rounded">
                      <div className="h-full bg-[#09115e] rounded" style={{ width: `${emp.performance}%` }} />
                    </div>
                    <span className="absolute left-1/2 transform -translate-x-1/2 text-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {emp.performance}%
                    </span>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200 md:table-cell">
                  <button className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-3">
        <p className="block text-sm text-slate-500">Page {currentPage} of {pages}</p>
        <div className="flex gap-1">
          {hasPrevious && (
            <button className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => {
              setCurrentPage((prevPage) => {
                const newPage = prevPage - 1;
                setHasPrevious(newPage > 1);
                setHasNext(true);
                return newPage;
              });
            }}>
              Previous
            </button>
          )}
          {hasNext && (
            <button className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => {
              setCurrentPage((prevPage) => {
                const newPage = prevPage + 1;
                setHasNext(newPage < pages);
                setHasPrevious(newPage > 1);
                return newPage;
              });
            }}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
