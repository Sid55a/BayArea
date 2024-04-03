"use client";
import { useModal } from "@/hooks/use-model-store";
import { PlusSquare } from "lucide-react";
import ActionTooltip from "../action-tooltip";
const AddServer = () => {
  const { onOpen } = useModal();
  


  return (
    <>
      <ActionTooltip side="right" align="center" lable="Add a Hub">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className=" h-[2.3rem] w-[2.3rem]    flex justify-between items-center rounded-lg">
        <PlusSquare className="h-8 w-8 text-center hover:text-green-600 "></PlusSquare>
          </div>
        </button>
      </ActionTooltip>
    </>
  );
};

export default AddServer;
