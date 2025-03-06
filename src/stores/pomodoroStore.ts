import { create } from "zustand";

interface PomodoroState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  set: (updater: (state: PomodoroState) => PomodoroState) => void;
}

export const usePomodoroStore = create<PomodoroState>((set) => ({
  minutes: 25,
  seconds: 0,
  isRunning: false,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),
  reset: () => set({ minutes: 25, seconds: 0, isRunning: false }),
  set: (updater) => set(updater),
}));
