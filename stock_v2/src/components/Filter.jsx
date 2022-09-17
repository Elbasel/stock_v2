import React from "react";
import { FormTextInput } from "./FormTexttInput";

export const Filter = ({ onParamsChange }) => {
  return (
    <div className="pl-2 flex flex-col items-center justify-center w-full mt-2">
      {["title", "size", "material", "color"].map((name) => (
        <FormTextInput key={name} name={name} handleInput={onParamsChange} />
      ))}
    </div>
  );
};
