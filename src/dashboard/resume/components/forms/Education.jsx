import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

const Education = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        // console.log(res);
        setLoading(false);
        toast("Education Details Updated");
      },
      (error) => {
        setLoading(false);
        toast("Something went wrong,Please Try again");
      }
    );
  };

  useEffect(() => {
    resumeInfo?.education.length > 0 &&
      setEducationalList(resumeInfo?.education);
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-semibold text-lg">Education</h2>
        <p>Add your educational qualification</p>
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label className="text-xs">University Name</label>
                  <Input
                    defaultValue={item?.universityName}
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">Degree</label>
                  <Input
                    defaultValue={item?.degree}
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">Major</label>
                  <Input
                    defaultValue={item?.major}
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    defaultValue={item?.startDate}
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    defaultValue={item?.endDate}
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Description</label>
                  <Textarea
                    defaultValue={item?.description}
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewEducation}
            >
              + Add More Education
            </Button>
            {educationalList.length > 1 ? (
              <Button
                // disabled={educationalList.length === 1}
                variant="outline"
                className="text-primary"
                onClick={RemoveEducation}
              >
                Remove
              </Button>
            ) : (
              ""
            )}
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;
