import React, { memo } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  // const [focus, setFocus] = useState(false);
  return (
    <div className="w-full flex flex-col relative mb-2">
      {value.trim() !== "" && (
        <label
          className="text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm"
          htmlFor={nameKey}
        >
          {nameKey?.charAt(0).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        id=""
        className="px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic"
        placeholder={
          nameKey?.charAt(0).toUpperCase() + nameKey?.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main  italic">
          {invalidFields?.find((el) => el.name === nameKey)?.message}
        </small>
      )}
      {/* <small className='text-main text-[10px] italic'>Required</small> */}
    </div>
  );
};

export default memo(InputField);
