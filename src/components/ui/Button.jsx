import React, { memo } from "react";

const Button = ({ name, handleOnClick, style, fw }) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-red-500 text-semibold  my-2
                ${fw ? "w-full" : "w-fit"}`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {name}
    </button>
  );
};

export default memo(Button);
