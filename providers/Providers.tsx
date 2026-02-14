"use client";

import { store } from "@/redux/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
