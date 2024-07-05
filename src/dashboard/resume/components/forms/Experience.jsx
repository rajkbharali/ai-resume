import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
const Experience = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [experiencedField, setExperiencedField] = useState([]);

  const handleChange = (index, e) => {
    const newEntries = experiencedField.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperiencedField(newEntries);
  };

  const AddNewExperience = () => {
    setExperiencedField([...experiencedField, formField]);
  };

  const RemoveExperience = () => {
    setExperiencedField((experiencedField) => experiencedField.slice(0, -1));
  };

  const handleRichTextEditorChange = (e, name, index) => {
    const newEntries = experiencedField.slice();
    newEntries[index][name] = e.target.value;
    setExperiencedField(newEntries);
  };

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperiencedField(resumeInfo?.experience);
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experiencedField,
    });
  }, [experiencedField]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-semibold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experiencedField.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    defaultValue={item?.title}
                    name="title"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    defaultValue={item?.companyName}
                    name="companyName"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    defaultValue={item?.city}
                    name="city"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    defaultValue={item?.state}
                    name="state"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    defaultValue={item?.startDate}
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    defaultValue={item?.endDate}
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  {/* <label className="text-xs">Job Summary</label> */}
                  <RichTextEditor
                    defaultValue={item?.workSummery}
                    index={index}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditorChange(e, "workSummery", index)
                    }
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
              onClick={AddNewExperience}
            >
              + Add More Experience
            </Button>
            <Button
              disabled={experiencedField.length === 1}
              variant="outline"
              className="text-primary"
              onClick={RemoveExperience}
            >
              Remove
            </Button>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
