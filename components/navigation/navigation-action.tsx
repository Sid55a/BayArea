"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-model-store";
import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import ICON from '../../public/g.json';
import ICON2 from '../../public/plus.json';
const NavigationAction = () => {
  const { onOpen } = useModal();

  const playerRef = useRef<Player>(null);
  
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

  return (
    <>
      <ActionTooltip side="right" align="center" lable="Add a Hub">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          {/* <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500"> */}
          <div>
          <Player 
            ref={playerRef} 
            icon={ ICON }
            size={62}
        />
          </div>
        </button>
      </ActionTooltip>
    </>
  );
};

export default NavigationAction;
