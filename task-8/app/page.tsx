"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Joblist from "./component/joblist"; // Correctly import the 'Joblist' component
import { IoIosArrowDown } from "react-icons/io";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { DiVim } from "react-icons/di";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Job {
  title: string;
  company: string;
  description: string;
}

const HomePage = () => {
  const userCookie = Cookies.get("user");
  const userName = userCookie ? JSON.parse(userCookie).name : null;
  const router = useRouter();
  const { data: session } = useSession(); // Get the session data
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetch("https://akil-backend.onrender.com/opportunities/search")
      .then((response) => response.json())
      .then((data) => setJobs(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function logout() {
    Cookies.remove("user");

    signOut();

    router.push("/component/signin");
  }

  return (
    <div className="w-full mt-[72px] px-4 md:px-[124px] lg:mr-[349px]">
      <div className="flex flex-col gap-[35px]">
      <div className="flex justify-between items-center p-4">
  <div className="text-lg font-semibold text-blue-600p-2 rounded">
    {userName
      ? `Welcome, ${userName}`
      : session?.user
      ? `Welcome, ${session.user.name}`
      : null}
  </div>
  <div className="text-lg">
    {!(Cookies.get("user") || session?.user) ? (
      <Link href="component/signin" className="text-blue-500 hover:text-blue-700 bg-green-100 p-2 rounded">
        Login
      </Link>
    ) : (
      <div onClick={logout} className="cursor-pointer text-red-500 hover:text-red-700 bg-red-100 p-2 rounded">
        Logout
      </div>
    )}
  </div>
</div>
        <div className="flex flex-col md:flex-row justify-between md:w-[919px]">
          <div>
            <div className="font-poppins text-[32px] font-extrabold leading-[38.4px] text-left text-[rgba(37,50,75,1)]">
              Opportunities
            </div>
            <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left text-[rgba(124,132,147,1)]">
              Showing {jobs.length} results
            </div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left text-[rgba(124,132,147,1)]">
              Sort by{" "}
            </span>
            <span className="font-poppins text-[16px] font-extrabold leading-[38.4px] text-left text-[rgba(37,50,75,1)] ml-1">
              : Most relevant
            </span>
            <IoIosArrowDown className="ml-1" />
          </div>
        </div>

        {jobs.map((job, index) => (
          <Joblist
            id={undefined}
            logoUrl={""}
            index={index}
            key={index}
            {...job}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
