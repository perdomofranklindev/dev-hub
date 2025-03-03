import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";

interface ChipCardOptionsProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: {
    label: string;
    value: string;
  }[];
}

const ChipCardOptions: React.FC<ChipCardOptionsProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {options?.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          variant={value === option.value ? "filled" : "outlined"}
          icon={value === option.value ? <DoneIcon /> : undefined}
          color="secondary"
          onClick={() => {
            if (onChange) onChange(option.value);
          }}
          sx={{
            transition: 'width 3s ease!important',
          }}
        />
      ))}
    </Stack>
  );
};

export default ChipCardOptions;