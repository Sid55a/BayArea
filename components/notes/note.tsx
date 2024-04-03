"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoteCard } from "./note-card";
import { Bot, MessageCircleIcon, PlusCircle, Text } from "lucide-react";
import { useDebugValue, useState } from "react";
import { Noteeditor } from "./note-editor";
import { Note } from "@prisma/client";
import { NoteReader } from "./note-reader-card";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "@/hooks/use-model-store";

interface NotepageProps {
  notes: Note[];
}

export const Notepage = () => {
  const { notes } = useModal();
  const [isEditing, setisEditing] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [currentId, setCurrentId] = useState<any>();
  const edit = () => {
    setisEditing((curr) => !curr);
  };
  const current = async (data: any) => {
    setCurrentId(data);
    setisopen(true);
  };
  const open = () => {
    setisopen((curr) => !curr);
  };
  return (
    <div>
      {!isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className=" flex justify-start">
              <span>Notes...</span>
            </CardTitle>
            <CardDescription>Write a note to remember</CardDescription>
          </CardHeader>  
            <CardContent>
              <div className={cn(!isopen && " ml-3 space-y-4")}>
                {!isopen ? (
                  notes.map((note, i) => (
                    <div onClick={() => current(note)} key={note.id}>
                      <NoteCard note={note} index={i} />
                    </div>
                  ))
                ) : (
                  <ScrollArea>
                  <div className="w-[20rem] h-60 ">
                    <NoteReader open={open} note={currentId} />
                  </div>
                  </ScrollArea>
                )}
              </div>
            </CardContent>
         
          <CardFooter className="justify-end">
            {!isopen && (
              <PlusCircle
                onClick={() => setisEditing(!isEditing)}
                className=" h-8 w-8 cursor-pointer"
              />
            )}
          </CardFooter>
        </Card>
      )}

      {isEditing && (
        <div className="">
          <Noteeditor editF={edit} />
        </div>
      )}
    </div>
  );
};
