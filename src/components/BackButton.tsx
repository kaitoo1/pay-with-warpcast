"use client";

import { FC } from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="absolute top-0 left-0 p-4 text-black">
      <ArrowLeftIcon />
    </button>
  );
};

export default BackButton;
