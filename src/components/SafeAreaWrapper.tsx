import { memo } from "react";
import { FC } from "react";

type SafeAreaWrapperProps = {
  children: React.ReactNode;
};

const SafeAreaWrapper: FC<SafeAreaWrapperProps> = memo(({ children }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <div className="h-full overflow-y-auto bg-center bg-cover bg-no-repeat">
        {children}
      </div>
    </div>
  );
});

export default SafeAreaWrapper;
