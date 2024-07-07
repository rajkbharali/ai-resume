import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(params?.resumeId).then((res) => {
      setResumeInfo(res.data.data.attributes);
    });
  };

  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Your Resume is ready!
          </h2>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hi, please click url to view my resume",
                url:
                  import.meta.env.VITE_SHARE_URL +
                  "my-resume/" +
                  params?.resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " Resume",
              }}
              //   onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
