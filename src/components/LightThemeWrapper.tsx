import { ReactNode, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

interface LightThemeWrapperProps {
  children: ReactNode;
}

export function LightThemeWrapper({ children }: LightThemeWrapperProps) {
  const { setTheme } = useTheme();

  // Force light theme when component mounts
  useEffect(() => {
    const previousTheme = localStorage.getItem("vite-ui-theme");

    // Set theme to light
    setTheme("light");

    // Restore previous theme when unmounting
    return () => {
      if (previousTheme) {
        setTheme(previousTheme);
      }
    };
  }, [setTheme]);

  return <>{children}</>;
}
