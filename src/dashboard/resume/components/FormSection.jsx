import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
        <div className="flex items-center gap-2">
          {activeFormIndex > 1 && (
            <Button
              className=""
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal Details */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : null}
      {/* <PersonalDetail /> */}

      {/* summary */}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  );
};

export default FormSection;
