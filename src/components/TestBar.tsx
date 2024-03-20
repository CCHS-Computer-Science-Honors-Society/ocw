"use client"
import React, { useState } from 'react';
import { ChevronDown, Play } from "lucide-react";
import Link from "next/link";
import { Button } from './ui/button';
import { PanelLeft, PanelRight } from 'lucide-react';
import { RouterOutputs } from '@/types/trpc';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


export default function Sidebar(props: {
  data: RouterOutputs["courses"]["getSidebar"];
  lessonId: number;
  courseId: number;
  unitId: number;
  isMobile?: boolean;
}) {
  const { data, lessonId, courseId, isMobile } = props;
  const [openUnits, setOpenUnits] = useState<string[]>([]);

  const handleOpenChange = (unitId: string) => {
    setOpenUnits((currentOpenUnits) =>
      currentOpenUnits.includes(unitId)
        ? currentOpenUnits.filter((id) => id !== unitId)
        : [...currentOpenUnits, unitId]
    );
  }
  // State to manage the visibility of the TestBar
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-row h-full">
      <div
        className={`absolute top-0  bg-white lg:bg-white/30 lg:backdrop-blur-xl h-full lg:h-auto lg:relative z-[999] duration-300 transition-all dark:bg-black lg:dark:bg-black/30 w-80 border-r border-r-neutral-200 dark:border-r-neutral-800 ${isVisible ? `block` : `hidden`} h-full`}
        style={{ transition: 'left 0.3s ease-in-out' }} // Ensure smooth transition
      >
        <div className="w-full h-full overflow-hidden">
          <div className='w-full h-full p-6 overflow-auto'>
            <div className="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
              Table of contents
              <div className="flex flex-col gap-1">
                {/* Contents go here */}
                {data.map((unit) => (
                  <div key={unit.id} className="px-10">
                    <Collapsible
                      open={openUnits.includes(unit.id.toString())}
                      onOpenChange={() => handleOpenChange(unit.id.toString())}
                      className="w-full space-y-2"
                    >
                      <div className="flex items-center justify-between space-x-4">
                        <CollapsibleTrigger asChild>
                          <div className="flex flex-row items-center">
                            <Button className="flex flex-row gap-2" variant="ghost" size="sm">
                              <h4 className={`text-lg font-bold ${props.unitId === unit.id ? `text-primary` : null}`}>{unit.name}</h4>
                              <ChevronDown className="h-4 w-4" />
                              <span className={`sr-only ${props.unitId === unit.id ? `bg-primary` : null}`}>Toggle</span>
                            </Button>
                          </div>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-2">
                        {unit.lessons.map((lesson) => (
                          <div className="flex flex-row items-center pl-2 gap-2">
                            <Play className="h-4 w-4" />
                            <Link
                              href={`/courses/${courseId}/units/${unit.id}/lessons/${lesson.id}`}
                              key={lesson.id}
                              className={`block py-2 text-sm ${lessonId === lesson.id
                                ? "font-semibold text-primary"
                                : "text-gray-600 hover:text-primary"
                                }`}
                            >
                              {lesson.name}
                            </Link>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={toggleVisibility}
        variant={"ghost"}
        style={{ transition: 'right 0.3s ease-in-out' }} // Smooth transition for the button as well
      >

        {isVisible ?
          <PanelLeft />
          : <PanelRight />}
      </Button>
    </div>

  );
}