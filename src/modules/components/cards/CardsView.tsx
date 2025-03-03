"use client";

import React, { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import GOTCardV1 from "./components/GOTCardV1";
import ChipCardOptions from "./ChipOptions";
import NewChip from "./NewChip";
import ChipOverlay from "./ChipOverlay";
import { GameOfThroneCharacter } from "../../../shared/backend/got-characters/game-of-thrones-types";
import GOTCardViewV1 from "./GOTCardViewV1";

const CardsView: React.FC<{ data: GameOfThroneCharacter[] }> = ({ data }) => {
  const [value, setValue] = useState("THUMBNAIL");

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12 }}>
        {/* <ChipCardOptions
          value={value}
          onChange={(v) => setValue(v)}
          options={[
            {
              label: "Thumbnail",
              value: "THUMBNAIL",
            },
            {
              label: "Regular",
              value: "REGULAR",
            },
          ]}
        /> */}

        <NewChip label="Hello World!" />
        {/* <ChipOverlay /> */}
      </Grid2>
      <GOTCardViewV1 />
    </Grid2>
  );
};

export default CardsView;
