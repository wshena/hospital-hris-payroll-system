import { create } from "zustand";

interface UtilityStoreProps {
  sidebar: boolean;
  toggleSidebar: () => void;
}

export const UtilityStore = create<UtilityStoreProps>((set) => ({
  sidebar: false,
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
}));
