'use client';
// src/app/page.js
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Joblist from "./component/joblist"; // Correctly import the 'Joblist' component
import { IoIosArrowDown } from "react-icons/io";

interface Job {
  title: string;
  company: string;
  description: string;
}

const HomePage = () => {
  alert(1111)
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetch('/api/jobs')
      .then(response => response.json())
      .then(data => setJobs(data.job_postings))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(jobs);

  return (
    <div className="w-full mt-[72px] px-4 md:px-[124px] lg:mr-[349px]">
      <div className="flex flex-col gap-[35px]">
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
          <Joblist index={index} key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
