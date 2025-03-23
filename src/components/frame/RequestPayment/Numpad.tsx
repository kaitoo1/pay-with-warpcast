import { memo, useCallback } from "react";

const buttons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
  "delete",
];

const Numpad = memo(
  ({ onNumpadPress }: { onNumpadPress: (value: string) => void }) => {
    const handleNumpadPress = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.dataset.value;
        if (value) {
          onNumpadPress(value);
        }
      },
      [onNumpadPress]
    );

    return (
      <div className="grid grid-cols-3 gap-4 w-full ">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={handleNumpadPress}
            className="h-16 rounded-full text-2xl font-medium bg-gray-900 text-white flex items-center justify-center"
            data-value={btn}
          >
            {btn === "delete" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8l4 4m0 0l-4 4m4-4H3"
                  transform="rotate(180 12 12)"
                />
              </svg>
            ) : (
              btn
            )}
          </button>
        ))}
      </div>
    );
  }
);

export default Numpad;
