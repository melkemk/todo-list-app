'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlinePlace, MdOutlinePostAdd, MdOutlineLocalFireDepartment, MdOutlineLocationOn, MdOutlineEventNote, MdOutlineCheckCircleOutline } from 'react-icons/md';

interface Job {
    title: string;
    company: string;
    description: string;
    responsibilities: string[];
    ideal_candidate: {
        age: number;
        gender: string;
        traits: string[];
    };
    when_where: string;
    about: {
        posted_on: string;
        deadline: string;
        location: string;
        start_date: string;
        end_date: string;
        categories: string[];
        required_skills: string[];
    };
    [key: string]: any; }

let word = ''

    const AboutPage: React.FC = () => {
        const params = useParams();
        const { i } = params ?? {};
        const jobid: number = Number(i);
        const [jobs, setJobs] = useState<Job[]>([]);
        const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          fetch('/api/jobs')
            .then(response => response.json())
            .then(data => {
              setJobs(data.job_postings);
              setLoading(false);
            }) 
            .catch(error => {
              console.error('Error fetching data:', error);
              setLoading(false);
            });
        }, []);
    const job = jobs[Number(i)] ;
  if (!job) {
    return <div>Loading...</div>;
  }

  console.log(job,11111111111);

  const { description, responsibilities, ideal_candidate, when_where, about }: { description: string, responsibilities: string[], ideal_candidate: { age: number, gender: string, traits: string[] }, when_where: string, about: { posted_on: string, deadline: string, location: string, start_date: string, end_date: string, categories: string[], required_skills: string[] } } = job;
  const iconClasses = "text-blue-500 mr-[10px]";

  return (
    <div className="p-8 min-w-full">
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
              {responsibilities.map((responsibility, index) => (
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
            <div className="list-disc">
              {ideal_candidate.traits.map((trait, index) => (
                <div key={index}>

                    <span style = {{fontWeight:"bold"}}>  {trait.substring(0,trait.search(':')) } </span>
                    <span>  {trait.substring(trait.search(':'),(trait.length)) } </span>
                </div>
              ))}
            </div>
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
                {when_where}
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
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">Posted On</div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">{about.posted_on}</p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineLocalFireDepartment className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">Deadline</div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">{about.deadline}</p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineLocationOn className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">Location</div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">{about.location}</p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineEventNote className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">Start Date</div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">{about.start_date}</p>
                </div>
              </div>
              <div className="flex">
                <MdOutlineEventNote className={iconClasses} />
                <div>
                  <div className="font-epilogue text-[16px] font-normal leading-[25.6px] text-left">End Date</div>
                  <p className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(81,91,111,1)]">{about.end_date}</p>
                </div>
              </div>
            </div>
            {/* Categories Section */}
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">Categories</div>
            <div className="flex gap-[8px]">
              {about.categories.map((category, index) => (
                <div
                  key={index}
                  className={`p-[6px] px-[10px] ${index % 2 === 0 ? 'custom-border-radius border-[1px] border-solid' : ''}`}
                  style={{
                    borderRadius: "80px",
                    borderColor: index % 2 === 0 ? "rgba(70, 64, 222, 1)" : "",
                    color: index % 2 === 0 ? "rgba(70, 64, 222, 1)" : "rgba(86, 205, 173, 1)",
                    background: index % 2 !== 0 ? "rgba(86, 205, 173, 0.1)" : "",
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
            {/* Required Skills Section */}
            <div className="font-poppins text-[24px] font-extrabold leading-[28.8px] text-left text-[rgba(37,50,75,1)]">Required Skills</div>
            <div className="flex flex-wrap gap-[10px]">
              {about.required_skills.map((skill, index) => (
                <p key={index} className="font-epilogue text-base font-normal leading-[25.6px] text-[rgba(70,64,222,1)] text-left">{skill}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );





return (<></>)
}


export default  AboutPage;