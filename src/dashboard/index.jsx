import React, { useState, useEffect } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import ResumeCardItems from "./components/ResumeCardItems";

const Dashboard = () => {
  const user = useUser();
  const [resumeList, setResumeList] = useState([]);
  // console.log(resumeList);
  useEffect(() => {
    getResumeList();
  }, [user.isLoaded]);

  const getResumeList = () => {
    GlobalApi.GetUserResumes(
      user?.user?.primaryEmailAddress?.emailAddress
    ).then((res) => {
      // console.log(res.data);
      setResumeList(res.data.data);
    });
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-2xl">My Resume</h2>
      <p>Start creating your next resume</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItems
                resume={resume}
                key={index}
                refreshData={getResumeList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
