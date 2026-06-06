"use client";

import CustomAlert from "@/components/feedback/Alert";
import { useUtilityStore } from "@/lib/zustand/utilityStore";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { alert, setAlert } = useUtilityStore(
    useShallow((state) => ({
      alert: state.alert,
      setAlert: state.setAlert,
    })),
  );

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        title: "",
        description: "",
        type: "success",
      });
    }, 2000);
  }, []);

  return (
    <>
      {children}

      {alert && alert?.title !== "" && (
        <CustomAlert
          title={alert.title}
          description={alert.description}
          type={alert.type}
        />
      )}
    </>
  );
};

export default AuthLayout;
