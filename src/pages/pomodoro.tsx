import React, { useEffect, useState } from "react";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PomodoroPage: React.FC = () => {
  const { isRunning, start, stop, reset, set } = usePomodoroStore();
  const [customMinutes, setCustomMinutes] = useState(25);
  const [selectedOption, setSelectedOption] = useState("long");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        const { minutes, seconds } = usePomodoroStore.getState();
        if (seconds > 0) {
          set((state) => ({ ...state, seconds: state.seconds - 1 }));
        } else if (minutes > 0) {
          set((state) => ({
            ...state,
            minutes: state.minutes - 1,
            seconds: 59,
          }));
        } else {
          reset();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, reset, set]);

  const { minutes, seconds } = usePomodoroStore();

  const handleCustomMinutesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomMinutes(Number(e.target.value));
  };

  const handleSetCustomMinutes = () => {
    set((state) => ({ ...state, minutes: customMinutes, seconds: 0 }));
  };

  const handleSetLong = () => {
    setSelectedOption("long");
    set((state) => ({ ...state, minutes: 25, seconds: 0 }));
  };

  const handleSetShort = () => {
    setSelectedOption("short");
    set((state) => ({ ...state, minutes: 5, seconds: 0 }));
  };

  const handleSetCustom = () => {
    setSelectedOption("custom");
    handleSetCustomMinutes();
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Pomodoro Timer
          </h1>
          <p className="text-muted-foreground mt-2">
            Boost your productivity with the Pomodoro Technique
          </p>
        </div>

        <Card className="border-t-4 border-t-blue-500 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-500">Set Timer</CardTitle>
            <CardDescription>
              Set a custom timer for your Pomodoro sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex items-center space-x-2 justify-center">
              <Button
                onClick={handleSetLong}
                className={`bg-blue-500 hover:bg-blue-600 ${
                  selectedOption === "long" ? "ring-2 ring-blue-700" : ""
                }`}
              >
                Long (25 min)
              </Button>
              <Button
                onClick={handleSetShort}
                className={`bg-blue-500 hover:bg-blue-600 ${
                  selectedOption === "short" ? "ring-2 ring-blue-700" : ""
                }`}
              >
                Short (5 min)
              </Button>
              {selectedOption === "custom" && (
                <Input
                  type="number"
                  value={customMinutes}
                  onChange={handleCustomMinutesChange}
                  min="1"
                  max="59"
                  className="border-blue-200 focus-visible:ring-blue-400 w-16"
                />
              )}
              <Button
                onClick={handleSetCustom}
                className={`bg-blue-500 hover:bg-blue-600 ${
                  selectedOption === "custom" ? "ring-2 ring-blue-700" : ""
                }`}
              >
                Custom
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        <div className="text-center">
          <div className="text-6xl font-bold">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <div className="mt-4">
            {isRunning ? (
              <Button onClick={stop} className="btn btn-danger">
                Stop
              </Button>
            ) : (
              <Button onClick={start} className="btn btn-primary">
                Start
              </Button>
            )}
            <Button onClick={reset} className="btn btn-secondary ml-2">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage;
