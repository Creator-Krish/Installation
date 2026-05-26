"use client";

import { create } from "zustand";

type Breakpoint = "desktop" | "tablet" | "mobile";

type EditorState = {
  selectedComponent: string;
  breakpoint: Breakpoint;
  aiDockOpen: boolean;
  messages: Array<{ role: "assistant" | "user"; content: string }>;
  setSelectedComponent: (value: string) => void;
  setBreakpoint: (value: Breakpoint) => void;
  toggleAIDock: () => void;
  sendMessage: (message: string) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  selectedComponent: "hero-1",
  breakpoint: "desktop",
  aiDockOpen: true,
  messages: [
    {
      role: "assistant",
      content:
        "I can refine sections, adjust theme tokens, recommend accessibility fixes, or prepare the project for deployment.",
    },
  ],
  setSelectedComponent: (selectedComponent) => set({ selectedComponent }),
  setBreakpoint: (breakpoint) => set({ breakpoint }),
  toggleAIDock: () => set((state) => ({ aiDockOpen: !state.aiDockOpen })),
  sendMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { role: "user", content: message },
        {
          role: "assistant",
          content:
            "Applied conceptually: I would update the selected section, sync the design tokens, and queue a preview refresh for the chosen breakpoint.",
        },
      ],
    })),
}));
