import React from "react";
import { ActionIcon } from "@mantine/core";

export const ActionButton = ({
  children,
  loading,
  onClick,
  color = "indigo",
  ...otherProps
}) => {
  return (
    <ActionIcon
      component="button"
      onClick={onClick}
      color={color}
      variant="filled"
      loading={loading}
      {...otherProps}
    >
      {children}
    </ActionIcon>
  );
};
