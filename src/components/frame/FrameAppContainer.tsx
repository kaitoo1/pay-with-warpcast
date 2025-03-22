import React, { FC, memo } from "react";
import { NavigationProvider } from "~/providers/NavigationContext";
import ScreenManager from "./ScreenManager";

const FrameAppContainer: FC = memo(() => {
  return (
    <NavigationProvider>
      <ScreenManager />
    </NavigationProvider>
  );
});

export default FrameAppContainer;
