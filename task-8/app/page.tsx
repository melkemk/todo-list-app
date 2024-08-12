"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import Joblist from './component/jobCard';
import { IoIosArrowDown } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axiosInstance from './axiosConfig';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
}

async function fetchBookmarks(token: string) {
  console.log(token,'token1');
  try {
    const response = await axiosInstance.get('/bookmarks', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response.data,'response.data1');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
}

const HomePage = () => {
  const { data } = useSession();

  
  const userCookie = Cookies.get('user');
  const userName = userCookie ? JSON.parse(userCookie).name : null;
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false);
  console.log(data,'data1')
  
  useEffect(() => {
    console.log((data?.user.accessToken),'token34')
    if (data?.user?.accessToken) {
      fetchBookmarks(data.user.accessToken).then((result) => {
        if (Array.isArray(result.data)) {
          const bookmarkedJobs = new Set(result.data.map((job: Job) => job.eventID));
          setBookmarked(bookmarkedJobs);
          setJobs(jobs.filter((job) => bookmarkedJobs.has(job.id)));
        }
      });
    }
  }, [data?.user?.accessToken]);
  
  useEffect(() => {
    fetch('https://akil-backend.onrender.com/opportunities/search')
      .then((response) => response.json())
      .then((data) => setJobs(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  

  const logout = () => {
    Cookies.remove('user');
    signOut();
    router.push('/component/signin');
  };

  return (
    <div className="w-full mt-[72px] px-4 md:px-[124px] lg:mr-[349px]">
      <div className="flex flex-col gap-[35px]">
        <div className="flex justify-between items-center p-4">
          <div className="text-lg font-semibold text-blue-600 p-2 rounded">
            {userName 
              ? `Welcome, ${userName}`
              : data?.user
              ? `Welcome, ${data.user.name}`
              : null} 
          </div>
          <div className="text-lg">
            {!(Cookies.get('user') || data?.user) ? (
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
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "30px",
              textAlign: "right"
            }}
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="cursor-pointer p-2 rounded"
          >
            {showBookmarks ? 'Show All' : 'Show Bookmarks'}
          </div>

          <div>
            <div className="font-poppins text-[32px] font-extrabold leading-[38.4px] text-left text-[rgba(37,50,75,1)]">
              Opportunities
            </div>
            <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left text-[rgba(124,132,147,1)]">
              Showing { jobs?jobs.length:0} results
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
          (!showBookmarks || bookmarked.has(job.id)) ? <Joblist
            bookmarked={bookmarked}
            setBookmarked={setBookmarked}
            token = {data?.user?.accessToken}
            logoUrl={""}
            index={index}
            key={index}
            {...job}
          />:null
        ))}
      </div>
    </div>
  );
};

export default HomePage;
