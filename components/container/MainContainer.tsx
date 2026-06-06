"use client";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useUtilityStore } from "@/lib/zustand/utilityStore";
import CustomAlert from "../feedback/Alert";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { alert } = useUtilityStore(
    useShallow((state) => ({
      alert: state.alert,
    })),
  );

  return (
    <div className="relative min-h-screen w-full">
      {alert && alert?.title !== "" && (
        <CustomAlert
          title={alert.title}
          description={alert.description}
          type={alert.type}
        />
      )}
      {children}
    </div>
  );
};

export default MainContainer;
