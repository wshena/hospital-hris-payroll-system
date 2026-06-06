import { AlertType } from "@/types";
import { create } from "zustand";

interface UtilityStoreProps {
  sidebar: boolean;
  toggleSidebar: () => void;

  alert: {
    title: string;
    description: string;
    type: AlertType;
  };
  setAlert: (alert: {
    title: string;
    description: string;
    type: AlertType;
  }) => void;
}

export const useUtilityStore = create<UtilityStoreProps>((set) => ({
  sidebar: false,
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),

  alert: {
    title: "",
    description: "",
    type: "info",
  },
  setAlert: (alert) => set({ alert }),
}));
