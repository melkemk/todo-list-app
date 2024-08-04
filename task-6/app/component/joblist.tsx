import Link from "next/link";
import React from "react";

interface Job {
  title: string;
  company: string;
  description: string;
  index: number;

  [key: string]: any; // This allows additional properties
}

const Joblist: React.FC<Job> = (props) => {
  const { index, description, company, title, ...rest } = props;
  console.log("Index:", index);

  return (
    <div className="font-[Epilogue] pt-[24px] pb-[24px] pl-[37.5px] pr-[37.5px]  gap-24 width-[919px]  custom-border-radius border-[2px] "     style={{
      borderRadius: "30px",
      borderColor:"rgba(214, 221, 235, 1)"
    }}>
      <div className="flex flex-row  bg-white gap-[24px] ">
        <div className="bg-white w-[70px] ">
          <Link href={{
            pathname: `/about/${index}`,
          }}
          > 
            <img src="photo.jpg" alt="df" /> 
          </Link>
        </div>
        <div className="bg-white w-[755px]  ">
          <div className="font-[Epilogue] text-[20px]  leading-[24px] text-left font-bold"></div>
          {title}
          {/* Social Media Assistant */}
          <div className="font-[Epilogue] text-[16px] font-normal leading-[25.6px] text-left " style={{color:"rgba(124, 132, 147, 1)"}}>
            {company}
            Young Men Christians Association . Addis Ababa, Ethiopia
          </div>
          {description}

          <div className="flex gap-[13px]">
            <div
              className=" p-[6px] px-[10px] gap-[8px] custom-border-radius"
              style={{
                borderRadius: "80px",
                background: "rgba(86, 205, 173, 0.1)",
                color:"rgba(86, 205, 173, 1)"
              }}
            >
              in person
            </div>
            <div
              className=" p-[6px] px-[10px] gap-[8px] custom-border-radius border-[1px] border-solid"
              style={{
                borderRadius: "80px",
                borderColor:"rgba(255, 184, 54, 1)",

                color:" rgba(255, 184, 54, 1)"
              }}
            >
              Education
            </div>
            <div
              className=" p-[6px] px-[10px]  custom-border-radius border-[1px] border-solid "
              style={{
                borderRadius: "80px",
                borderColor:"rgba(70, 64, 222, 1)",

                color:" rgba(70, 64, 222, 1)"
              }}
            >
              Education
            </div>
           

          </div>
        </div>
      </div>
    </div>
  );
};

export default Joblist;
