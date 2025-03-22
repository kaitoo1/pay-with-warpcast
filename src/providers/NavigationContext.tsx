import React, { createContext, useContext, useState, ReactNode } from "react";

// Define all possible screens in the application
export type ScreenType = "Home" | "RequestPayment" | "SendPayment" | "About";

interface NavigationContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [screenStack, setScreenStack] = useState<ScreenType[]>(["Home"]);

  const navigateTo = (screen: ScreenType) => {
    setScreenStack((prevStack) => [...prevStack, screen]);
  };

  const goBack = () => {
    setScreenStack((prevStack) => {
      if (prevStack.length <= 1) {
        return ["Home"]; // Always keep at least Home in the stack
      }
      return prevStack.slice(0, -1);
    });
  };

  const currentScreen = screenStack[screenStack.length - 1];

  return (
    <NavigationContext.Provider value={{ currentScreen, navigateTo, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};
