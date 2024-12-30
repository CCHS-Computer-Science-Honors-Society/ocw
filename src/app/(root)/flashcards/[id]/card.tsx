"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clipboard, Check } from "lucide-react";

interface QuizCardProps {
  question: string;
  options: string[];
  image?: string;
}

export function QuizCard({ question, options, image }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Question: ${question}\n\nOptions:\n${options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join("\n")}`;
    void navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl shadow-lg">
      <div className="group relative">
        {image ? (
          <div className="group relative h-64 w-full">
            <Image
              src={image}
              alt="Quiz question image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 transition-opacity duration-300 group-hover:opacity-0" />
          </div>
        ) : null}
        <CardHeader
          className={`${image ? "absolute bottom-0 left-0 right-0 transition-all duration-300 group-hover:opacity-0" : ""} p-6`}
        >
          <CardTitle
            className={`text-2xl font-bold ${image ? "text-white drop-shadow-lg" : "text-primary"}`}
          >
            {question}
          </CardTitle>
        </CardHeader>
      </div>
      <CardContent className="p-6">
        <RadioGroup
          value={selectedOption ?? ""}
          onValueChange={setSelectedOption}
          className="grid grid-cols-2 gap-4"
        >
          {options.map((option, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D, E, F
            return (
              <div key={index} className="relative">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex cursor-pointer select-none items-center rounded-xl border-2 p-4 transition-all duration-200 ease-in-out hover:bg-secondary/20 peer-checked:border-primary peer-checked:bg-primary/10"
                >
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {letter}
                  </span>
                  <span className="text-lg">{option}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
