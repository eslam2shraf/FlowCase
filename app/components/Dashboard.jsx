'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchEmployee } from '../../redux/slices/EmployeesSlice';
import { selectCurrentUser } from '../../redux/slices/authSlice';
import CaseNumsCard from "./CaseNumsCard";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import EmployeesTable from "./EmployeesTable";
import { fetchCases } from "@/redux/slices/CasesSlice ";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [firebaseUser] = useAuthState(auth);
  const { employee } = useAppSelector((state) => state.employee);
  const { cases } = useAppSelector((state) => state.cases);
  const chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
  const chartData1 = [65, 59, 80, 81, 56, 55, 40, 70, 60]; 
  const chartData2 = [28, 48, 40, 19, 86, 27, 90, 50, 80]; 


  useEffect(() => {
    dispatch(fetchEmployee()).then((result) => {
        console.log("🚀 Employee Data from Redux:", result.payload);
    });
}, [dispatch]);


useEffect(() => {
  dispatch(fetchCases()).then((result) => {
      console.log("🚀 Cases Data from Redux:", result.payload);
  });
}, [dispatch]);


  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (!firebaseUser && !userSession) {
      router.push("/sign-in");
    }
  }, [firebaseUser, user, router]);
  const reviewCounts = () => {
    const counts = [0, 0, 0]; 
    cases.forEach(caseItem => {
      switch (caseItem.review) {
        case "satisfied":
          counts[0]++;
          break;
        case "nutriant ":
          counts[1]++;
          break;
        case "dis satisfied":
          counts[2]++;
          break;
        default:
          break;
      }
    });
    return counts;
  };
  


  const typeCounts = () => {
    const counts = [0, 0]; 
    cases.forEach(caseItem => {
      switch (caseItem.type) {
        case "critical":
          counts[0]++;
          break;
        case "out dated":
          counts[1]++;
          break;
        default:
          break;
      }
    });
    return counts;
  };
  const statusCounts = () => {
    const counts = [0, 0]; 
    cases.forEach(caseItem => {
      switch (caseItem.status) {
        case "open":
          counts[0]++;
          break;
        case "in progress":
          counts[1]++;
          break;
        default:
          break;
      }
    });
    return counts;
  };
  const [openCount,inProgressCount]=statusCounts();
  const [criticalCount,outDatedCount]=typeCounts();
  const [satisfiedCount, nutriantCount, disSatisfiedCount] = reviewCounts();



  return (
    <div className="w-full flex items-center justify-center rounded-2xl bg-gray-100 p-6">

  <div className="w-full h-full bg-white shadow-lg rounded-lg flex flex-col">
    
    <div className="h-[30%] bg-white flex justify-between items-center p-6 flex-col rounded-2xl">

  <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pb-0">
  <div className="md:flex-col justify-between items-center gap-4">
    <h1 className="text-2xl font-bold text-center md:text-center md:w-fit">Welcome Back 👋</h1>
    <p className="text-gray-500">Track, manage and forecast your data</p>
  </div>

  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
    Edit Dashboard
  </button>
  </div>
  <hr className="my-4 border-t border-gray-200 w-full" />
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <CaseNumsCard value={openCount} percentage={11} title={"Opened Cases Yesterday"} />
            <CaseNumsCard value={inProgressCount} percentage={24} title={"In Progress Cases"} />
            <CaseNumsCard value={criticalCount} percentage={32} title={"Critical Cases"} />
            <CaseNumsCard value={outDatedCount} percentage={-16} title={"Out Dated Cases"} />
  </div>
</div>


<div className="bg-white flex flex-col gap-4 md:flex-row justify-between items-center p-6 py-0 h-auto md:h-[40%] w-full md:gap-4">
  <div className="w-full md:w-[30%] flex items-center flex-col gap-8 rounded-lg shadow px-8 py-14 h-auto md:h-full">
    <p className="text-sm text-gray-600 pb-4">Total Cases Reviews</p>       
    <PieChart labels={["Satisfied", "Nutriant", "Dis Satisfied"]} data={[satisfiedCount, nutriantCount, disSatisfiedCount]} />
  </div>
  <div className="w-full md:w-[68%] rounded-lg shadow p-8 flex flex-col gap-2 items-center h-auto md:h-full">
    <p className="text-sm text-gray-600">Total Cases Type Last 10 Months</p> 
    <BarChart labels={chartLabels} data1={chartData2} data2={chartData1} label1="Critical" label2="Out Dated" />
  </div>
</div>


        <div className="p-6">
          <EmployeesTable data={employee} />
    </div>
  </div>
</div>
  );
}
