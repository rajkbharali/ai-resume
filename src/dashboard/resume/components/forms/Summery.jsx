import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModal";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";
const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [summaryInput, setSummaryInput] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState();

  useEffect(() => {
    summaryInput &&
      setResumeInfo({
        ...resumeInfo,
        summery: summaryInput,
      });
  }, [summaryInput]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
    // console.log(result.response.text());
    setAiGeneratedSummary(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summaryInput,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        // console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Summary Updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-semibold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary flex gap-2"
              onClick={GenerateSummaryFromAI}
            >
              <Brain className="h-4 w-4" /> Generate using AI
            </Button>
          </div>
          <Textarea
            defaultValue={resumeInfo?.summery}
            required
            className="mt-5"
            onChange={(e) => setSummaryInput(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-5">
        {aiGeneratedSummary && (
          <div>
            <h2 className="font-bold text-lg">Suggestions</h2>
            {aiGeneratedSummary.map((item, index) => (
              <div key={index}>
                <h2 className="font-semibold my-1">
                  Level : {item.experience_level}
                </h2>
                <p className="text-sm">{item.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summery;
