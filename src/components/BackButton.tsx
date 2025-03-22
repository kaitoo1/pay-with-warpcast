"use client";

import { FC } from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-1 text-white absolute left-0">
      <ArrowLeftIcon />
    </button>
  );
};

export default BackButton;
