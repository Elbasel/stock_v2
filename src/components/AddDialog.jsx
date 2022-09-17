import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { ActionButton } from "./ActionButton";
import { FormTextInput } from "./FormTexttInput";

export const AddDialog = ({ onSubmit }) => {
  const [dialogHidden, setDialogHidden] = useState(true);

  const [formData, setFormData] = useState({});

  const handleFormDataChange = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setDialogHidden(true);
  };
  return (
    <>
      <div className="absolute top-2 right-2 ">
        <ActionButton onClick={() => setDialogHidden(false)} size="xl">
          <AiOutlinePlus size={20} />
        </ActionButton>
      </div>
      {!dialogHidden && (
        <div className="absolute w-full h-full backdrop-blur-lg flex flex-col items-center  z-10">
          <div className="absolute top-2 right-2">
            <ActionButton size="xl" onClick={() => setDialogHidden(true)}>
              <AiOutlineClose size={24} />
            </ActionButton>
          </div>
          <h1 className="mt-10 text-2xl font-mono mb-4">Add Item</h1>
          <form className="flex flex-col " onSubmit={(e) => handleSubmit(e)}>
            {["title", "size", "color", "amount"].map((name) => (
              <FormTextInput
                key={name}
                name={name}
                handleInput={handleFormDataChange}
                required={true}
                type={name === "amount" ? "number" : "text"}
              />
            ))}
            <input
              className="p-2 bg-blue-600 rounded-lg text-center text-white "
              type="submit"
              value="Add"
            />
          </form>
        </div>
      )}
    </>
  );
};
