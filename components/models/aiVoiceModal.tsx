"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const AiVoiceModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type, aiVoiceLink } = useModal();
  const isModelOpen = isOpen && type === "aiTextToVoice";
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className={"bg-white text-black pb-6 overflow-hidden "}>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Text to Voice...
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {aiVoiceLink && (
                <div className="flex justify-center items-center mt-4">
                  <audio src={aiVoiceLink} controls></audio>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
