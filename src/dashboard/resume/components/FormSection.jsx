import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(2);
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
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal Details */}
      <PersonalDetail />

      {/* summary */}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  );
};

export default FormSection;
