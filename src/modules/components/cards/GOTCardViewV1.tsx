"use client";

import { useEffect, useState } from "react";
import GOTCardV1 from "./components/GOTCardV1";
import Grid2 from "@mui/material/Grid2";
import { GameOfThroneCharacter } from "@dev-hub/shared/backend/got-characters/game-of-thrones-types";

export default function GOTCardViewV1() {
  const [data, setData] = useState<GameOfThroneCharacter[]>([]);

  const init = async () => {
    const response = await fetch("/api/got/characters");
    const { items } = (await response.json()) as {
      items: GameOfThroneCharacter[];
    };
    setData(items);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {data?.map((character) => (
        <Grid2 key={character.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <GOTCardV1 character={character} />
        </Grid2>
      ))}
    </>
  );
}
