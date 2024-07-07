import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const Skills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        // console.log(resp);
        setLoading(false);
        toast("Skills Updated !");
      },
      (error) => {
        setLoading(false);
        toast("Something went wrong,Please Try again!");
      }
    );
  };

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-semibold text-lg">Add Skills</h2>
        <p>Rate your skills according to experience</p>
        <div>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-lg p-3 my-2 gap-2"
            >
              <div>
                <label className="text-xs">Name</label>
                <Input
                  defaultValue={item?.name}
                  className="w-full"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewSkill}
            >
              + Add More Skill
            </Button>
            {skillsList.length > 1 ? (
              <Button
                // disabled={skillsList.length === 1}
                variant="outline"
                className="text-primary"
                onClick={RemoveSkill}
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

export default Skills;
