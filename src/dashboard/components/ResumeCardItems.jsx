import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

const ResumeCardItems = ({ resume, refreshData }) => {
  // console.log(resume);
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.id).then(
      (resp) => {
        // console.log(resp);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
        <div
          className="p-14 bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
       flex items-center justify-center h-[280px] border rounded-lg
        hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer
      "
        >
          <Notebook />
        </div>
        {/* <h2 className="text-center my-1">{resume.attributes.title}</h2> */}
      </Link>
      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.attributes?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.attributes.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate("/dashboard/resume/" + resume.id + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/my-resume/" + resume.id + "/view")}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/my-resume/" + resume.id + "/view")}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCardItems;
