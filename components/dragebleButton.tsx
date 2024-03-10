"use client";
import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
const CircularButton = ({ data }: { data: string }) => {
  const { setGroupSummary, onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: document.documentElement.clientWidth - 470,
    height: 0,
  });
  const [showMenu, setShowMenu] = useState(false); // State to toggle the dropdown menu
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown menu

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    // Update page size on mount and on window resize
    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    // Event listener to close dropdown menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", updatePageSize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDoubleClick = () => {
    setShowMenu(true);
    // Show the dropdown menu on double click
  };

  const handleOptionClick = async (path: string) => {
    switch (path) {
      case "groupSummary":
        {
          const options = {
            method: "POST",
            url: "https://open-ai21.p.rapidapi.com/summary",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key":
                "b2312bd8ecmshae814416cb20527p140500jsn4afff8e80a96",
              "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
            },
            data: {
              text: { data },
            },
          };

          try {
            setLoading(true);
            onOpen("groupSummaryModel");
            const response = await axios.request(options);
            console.log(response.data);
            {
              response && setGroupSummary(response.data.result);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
        break;
      case "groupQA":
        {
          onOpen("groupQAmodel", { aiGroupQAInput: data });
        }
        break;
      case "nextReply":
        {
          const options = {
            method: "POST",
            url: "https://open-ai21.p.rapidapi.com/qa",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key":
                "b2312bd8ecmshae814416cb20527p140500jsn4afff8e80a96",
              "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
            },
            data: {
              question:
                "What should be appropriate reply by me in this conversation?",
              context: data,
            },
          };

          try {
            setLoading(true);
            const response = await axios.request(options);
            onOpen("groupNextReply", { aiGroupQAInput: response.data.result });
            console.log(response.data.result);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <Draggable
      defaultPosition={{ x: pageSize.width, y: 0 }} // Initial position of the button
      bounds="body" // Restrict dragging within the bounds of the body
    >
      <div
        className="fixed z-[100] flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
        onDoubleClick={handleDoubleClick} // Double click event handler
      >
        <div className="relative" ref={dropdownRef}>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="bg-gray-300 text-gray-700  rounded-full text-sm px-1">
                    ?
                  </span>
                </div>
              </div>
            </div>
          </div>
          {showMenu && (
            <div className="absolute top-0 right-0 mt-2 mr-14 bg-gray-700 text-white rounded shadow">
              <div
                className="py-2 px-4 cursor-pointer hover:bg-gray-500"
                onClick={() => handleOptionClick("groupSummary")} // Handle click on option 1
              >
                Summarize
                <Bot className={cn("opacity-0", loading && "opacity-100")} />
              </div>
              <div
                className="py-2 px-4 cursor-pointer hover:bg-gray-500"
                onClick={() => handleOptionClick("groupQA")} // Handle click on option 2
              >
                Q/A
              </div>
              <div
                className="py-2 px-4 cursor-pointer hover:bg-gray-500"
                onClick={() => handleOptionClick("nextReply")} // Handle click on option 3
              >
                Next Reply
              </div>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default CircularButton;
