import Link from "next/link";
import React from "react";
import { MdBookmark } from "react-icons/md";
import axios from "axios";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  index: number;
  logoUrl: string;
  bookmarked: Set<string>;
  token:string,
  setBookmarked: React.Dispatch<React.SetStateAction<Set<string>>>;
}


const addBookmark = async (id: string, token: string) => {
  console.log("Adding bookmark for job:", id,token);
  console.log(token,'token1')
  try {
    const response = await axios.post(
      `https://akil-backend.onrender.com/bookmarks/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error bookmarking job:", error);
    return false;
  }
};

const removeBookmark = async (id: string, token: string) => {
  console.log("Removing bookmark for job:", id);
  try {
    const response = await axios.delete(
      `https://akil-backend.onrender.com/bookmarks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return false;
  }
};



const Joblist: React.FC<Job> = (props) => { 
  const { token,id, description, company, title, logoUrl, bookmarked, setBookmarked, } = props;
  console.log(bookmarked, 'bookmarked')
  const isBookmarked = bookmarked.has(id);

  const handleBookmarkClick = async () => {
    if (!token) {
      console.log("No access token available");
      return; 
    }

    if (isBookmarked) {
      const result = await removeBookmark(id, token);
      if (result) {
        setBookmarked((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
        console.log("Removed bookmark for job:", id);
      }
    } else {
      const result = await addBookmark(id, token);
      if (result) {
        setBookmarked((prev) => {
          const updated = new Set(prev);
          updated.add(id);
          return updated;
        });
        console.log("Bookmarked job:", id);
      }
    }
  };

  return (
    <div
      className="font-[Epilogue] pt-[24px] pb-[24px] pl-[37.5px] pr-[37.5px] gap-24 width-[919px] border-[2px] rounded-[30px]"
      style={{
        position: "relative",
        borderColor: "rgba(214, 221, 235, 1)",
      }}
    >
      <div style={{ position: "absolute", right: "10px", top: "10px" }} onClick={handleBookmarkClick} data-testid="bookmark-button">
        <MdBookmark
          size={30}
          color={isBookmarked ? "rgba(255, 184, 54, 1)" : "rgba(124, 132, 147, 1)"}
        />
      </div>
      <div className="flex flex-row bg-white gap-[24px]">
        <div className="bg-white w-[70px]">
          <Link href={`/about/${id}`}>
            <img src={logoUrl} alt={title} />
          </Link>
        </div>
        <div className="bg-white w-[755px]">
          <div className="font-[Epilogue] text-[20px] leading-[24px] text-left font-bold">{title}</div>
          <div
            className="font-[Epilogue] text-[16px] font-normal leading-[25.6px] text-left"
            style={{ color: "rgba(124, 132, 147, 1)" }}
          >
            {company}
          </div>
          <div>{description}</div>
          <div className="flex gap-[13px] mt-2">
            <div
              className="p-[6px] px-[10px] rounded-full bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)]"
            >
              In person
            </div>
            <div
              className="p-[6px] px-[10px] rounded-full border-[1px] border-[rgba(255,184,54,1)] text-[rgba(255,184,54,1)]"
            >
              Education
            </div>
            <div
              className="p-[6px] px-[10px] rounded-full border-[1px] border-[rgba(70,64,222,1)] text-[rgba(70,64,222,1)]"
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
