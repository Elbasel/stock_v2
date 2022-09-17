import React from "react";
import { Table } from "@mantine/core";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { ActionButton } from "./ActionButton";
import { ImCross } from "react-icons/im";

export const DataTable = ({
  data,
  onItemIncrease,
  onItemDecrease,
  onItemDelete,
  buttonDisabled,
}) => {
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>{item.get("title")}</td>
      <td>{item.get("size")}</td>
      <td>{item.get("color")}</td>
      <td>{item.get("material")}</td>
      <td className="flex items-center gap-2 justify-center ">
        <ActionButton
          onClick={() => onItemDecrease(item)}
          loading={buttonDisabled}
        >
          <AiOutlineMinus size={10} />
        </ActionButton>
        <p className="w-10"> {item.get("amount")}</p>
        <ActionButton
          onClick={() => onItemIncrease(item)}
          loading={buttonDisabled}
        >
          <AiOutlinePlus size={10} />{" "}
        </ActionButton>
      </td>
      <td>
        <ActionButton
          onClick={() => onItemDelete(item)}
          loading={buttonDisabled}
          color="red"
          className="m-auto"
        >
          <ImCross size={10} />
        </ActionButton>
      </td>
    </tr>
  ));

  return (
    <div className="w-full p-6">
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th className="thead">Title</th>
            <th className="thead">Size</th>
            <th className="thead">Material</th>
            <th className="thead">Color</th>
            <th className="thead">Amount</th>
            <th className="thead">Delete</th>
          </tr>
        </thead>
        {data.length >= 1 ? (
          <tbody>{rows}</tbody>
        ) : (
          <tbody>
            <tr>
              <td className="text-center" colSpan={6}>
                No Results
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
};
