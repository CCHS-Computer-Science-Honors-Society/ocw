"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

type RelevantContent = {
  front: string;
  back: string;
  options: string[] | null;
  similarity: number;
}[];

interface QuestionCardProps {
  content: RelevantContent;
}

export function QuestionCards({ content }: QuestionCardProps) {
  return (
    <div className="space-y-6">
      {content.map((item, index) => (
        <QuestionCard key={index} item={item} index={index} />
      ))}
    </div>
  );
}

function QuestionCard({
  item,
  index,
}: {
  item: RelevantContent[0];
  index: number;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (item.options) {
      setIsCorrect(option === item.back);
    }
  };

  const toggleAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            Question {index + 1}
          </CardTitle>
          <Badge
            variant="outline"
            className={`${
              item.similarity > 0.8
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : item.similarity > 0.5
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {Math.round(item.similarity * 100)}% match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-medium">Question:</h3>
          <p className="text-slate-700 dark:text-slate-300">{item.front}</p>
        </div>

        {item.options ? (
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium">Options:</h3>
            <RadioGroup
              value={selectedOption ?? ""}
              onValueChange={handleOptionSelect}
              className="space-y-3"
            >
              {item.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`flex items-center space-x-2 rounded-md border p-3 ${
                    selectedOption === option && isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : selectedOption === option && isCorrect === false
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}-${optIndex}`}
                  />
                  <Label
                    htmlFor={`option-${index}-${optIndex}`}
                    className="flex-grow cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : null}

        <div className="mt-4">
          <Button
            variant="outline"
            onClick={toggleAnswer}
            className="flex w-full items-center justify-between gap-1"
            type="button"
          >
            <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
            {showAnswer ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          <div
            className={`mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 transition-all duration-200 ease-in-out dark:border-slate-700 dark:bg-slate-900 ${
              showAnswer
                ? "max-h-96 opacity-100"
                : "max-h-0 overflow-hidden border-0 p-0 opacity-0"
            }`}
          >
            <h3 className="mb-2 text-lg font-medium">Answer:</h3>
            <p className="text-slate-700 dark:text-slate-300">{item.back}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
