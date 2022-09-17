import { TextInput } from "@mantine/core";

export const FormTextInput = ({ name, handleInput, ...otherProps }) => {
  return (
    <div className="flex items-center  justify-center w-full">
      <label className="capitalize w-20  text-center">{name}:</label>
      <TextInput
        {...otherProps}
        onInput={(e) => handleInput(name, e.target.value)}
        name={name}
        className=" text-white p-2 text-xl w-full"
      />
    </div>
  );
};
