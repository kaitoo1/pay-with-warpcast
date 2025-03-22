import React, { memo } from "react";
import { NavigationProvider } from "~/providers/NavigationContext";
import ScreenManager from "./ScreenManager";

const AppContainer: React.FC = memo(() => {
  return (
    <NavigationProvider>
      <ScreenManager />
    </NavigationProvider>
  );
});

export default AppContainer;
