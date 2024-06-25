import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PersonalDetail = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-semibold text-lg">Personal Details</h2>
      <p>Get started with some basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label>First Name</label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          <div>
            <label>Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label>Jon Title</label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label>Address</label>
            <Input name="address" required onChange={handleInputChange} />
          </div>
          <div className="">
            <label>Phone</label>
            <Input name="phone" required onChange={handleInputChange} />
          </div>
          <div className="">
            <label>Email</label>
            <Input name="email" required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
