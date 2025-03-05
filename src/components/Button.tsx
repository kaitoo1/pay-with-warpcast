import clsx from "clsx";
import { FC, useCallback } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, onClick, ...props }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        event.preventDefault();
        setTimeout(onClick, 75);
      }
    },
    [onClick]
  );

  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg w-full text-lg p-4 disabled:cursor-not-allowed",
        "transform select-none transition-transform duration-75 ease-in-out  active:scale-95",
        "text-gray-50 bg-gray-900 disabled:bg-gray-300 disabled:text-gray-500",
        props.className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
