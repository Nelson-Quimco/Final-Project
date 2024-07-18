"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/utils/cookies";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const componentAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = getCookie("token");
      const user = getCookie("user");
      if (!token || !user) {
        router.replace("/login");
      }
    }, []);

    return React.createElement(WrappedComponent, props);
  };

  return componentAuth;
};

export default withAuth;
