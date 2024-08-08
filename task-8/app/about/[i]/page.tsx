"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MdOutlinePlace,
  MdOutlinePostAdd,
  MdOutlineLocalFireDepartment,
  MdOutlineLocationOn,
  MdOutlineEventNote,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  idealCandidate: string;
  categories: string[];
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  datePosted: string;
  [key: string]: any;
}

const AboutPage: React.FC = () => {
  const router = useRouter();
  const session = useSession()
  const userCookie = Cookies.get("user");
  const userName = userCookie ? JSON.parse(userCookie).name : null;
  const params = useParams();
  const { i } = params ?? {};
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://akil-backend.onrender.com/opportunities/search")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const job = jobs.find((job) => job.id === i);

  if (!job) {
    return <div>Job not found</div>;
  }

  function logout() {
    Cookies.remove("user");

    signOut();

    router.push("/component/signin");
  }

  const {
    description,
    responsibilities,
    idealCandidate,
    categories,
    startDate,
    endDate,
    deadline,
    location,
    requiredSkills,
    whenAndWhere,
    datePosted,
  } = job;
  const iconClasses = "text-blue-500 mr-[10px]";

  return (
    <div className="p-8 min-w-full">
      <div>
        <div className="flex justify-between items-center p-4 ">
          <div className="text-lg font-semibold text-blue-600 bg-yellow-100 p-2 rounded">
            {userName
              ? `Welcome, ${userName}`
              : session?.user
              ? `Welcome, ${session.user.name}`
              : null}
          </div>
          <div className="text-lg">
            {!(Cookies.get("user") || session?.user) ? (
              <Link
                href="/component/signin"
                className="text-blue-500 hover:text-blue-700 bg-green-100 p-2 rounded"
              >
                Login
              </Link>
            ) : (
              <div
                onClick={logout}
                className="cursor-pointer text-red-500 hover:text-red-700 bg-red-100 p-2 rounded"
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-16">
        <div className="p-8">
          {/* Description Section */}
          <div className="gap-4 mb-8">
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">
              Description
            </div>
            <br />
            <div>{description}</div>
          </div>
          {/* Responsibilities Section */}
          <div className="w-full gap-4 mb-8">
            <div className="font-poppins text-[24px] font-extrabold text-left text-[rgba(37,50,75,1)]">
              Responsibilities
            </div>
            <br />
            <div className="list-disc">
              {responsibilities.split("\n").map((responsibility, index) => (
                <div key={index} className="flex">
                  <MdOutlineCheckCircleOutline className="text-blue-500 mr-[10px]" />
                  <div>{responsibility}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Ideal Candidate Section */}
          <div className="w-full gap-4 mb-8">
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">
              Ideal Candidate We Want
            </div>
            <br />
            <div>{idealCandidate}</div>
          </div>
          {/* When & Where Section */}
          <div className="w-full gap-4 mb-8 flex items-start">
            <div>
              <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">
                When & Where
              </div>
              <br />
              <div className="flex">
                <MdOutlinePlace className="text-[rgba(37,50,75,1)] text-[24px] mr-2" />
                {whenAndWhere}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-[20px]">
            {/* About Section */}
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">
              About
            </div>
            <div>
              <div className="flex">
                <MdOutlinePostAdd className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">
                    Posted On
                  </div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">
                    {new Date(datePosted).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineLocalFireDepartment className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">
                    Deadline
                  </div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">
                    {new Date(deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineLocationOn className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">
                    Location
                  </div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">
                    {location.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineEventNote className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">
                    Start Date
                  </div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">
                    {new Date(startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineEventNote className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">
                    End Date
                  </div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">
                    {new Date(endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            {/* Categories Section */}
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">
              Categories
            </div>
            <div className="flex gap-[8px]">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`p-[6px] px-[10px] ${
                    index % 2 === 0
                      ? "custom-border-radius border-[1px] border-solid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "80px",
                    borderColor: index % 2 === 0 ? "rgba(70, 64, 222, 1)" : "",
                    color:
                      index % 2 === 0
                        ? "rgba(70, 64, 222, 1)"
                        : "rgba(86, 205, 173, 1)",
                    background:
                      index % 2 !== 0 ? "rgba(86, 205, 173, 0.1)" : "",
                  }}
                >
                  {category.length < 10 ? category : category.slice(0, 10)}
                </div>
              ))}
            </div>
            {/* Required Skills Section */}
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">
              Required Skills
            </div>
            <div className="flex flex-wrap gap-[10px]">
              {requiredSkills.map((skill, index) => (
                <p
                  key={index}
                  className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(70,64,222,1)] text-left"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
