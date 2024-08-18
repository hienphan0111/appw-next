"use client";

import appwriteService from "@/appwrite/config";
import Blog from "@/components/Blog";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/authContext";

import UserProvider from "@/context/useAuth";
import { useEffect, useState } from "react";

const ProrectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    appwriteService
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false));
  }, []);
  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {!loader && (
        <div>
          <Header />
          <Blog />
          {children}
        </div>
      )}
    </AuthProvider>
  );
};

export default ProrectedLayout;
