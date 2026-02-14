"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  requireAuth?: boolean; // If true, redirects to login if not authenticated
  redirectTo?: string; // Where to redirect if not authorized
}

const AuthWrapper = ({
  children,
  requireAuth = false,
  redirectTo = "/login",
}: AuthWrapperProps) => {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !token) {
      router.push(redirectTo);
    }
  }, [token, requireAuth, redirectTo, router]);

  // If requiring auth and no token, don't render children
  if (requireAuth && !token) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};

export default AuthWrapper;
