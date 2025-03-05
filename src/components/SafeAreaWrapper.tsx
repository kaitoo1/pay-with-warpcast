interface SafeAreaWrapperProps {
  children: React.ReactNode;
}

export function SafeAreaWrapper({ children }: SafeAreaWrapperProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-light-purple">
      <div className="h-full overflow-y-auto bg-center bg-cover bg-no-repeat">
        {children}
      </div>
    </div>
  );
}
