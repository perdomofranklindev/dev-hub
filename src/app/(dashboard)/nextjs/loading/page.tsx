import { Grid2 } from "@mui/material";
import { getGameOfThronesCharacters } from "./components/game-of-thrones-services";
import GOTCardV2 from "./components/GOTCardV2";
import GOTCardV3 from "./components/GOTCardV3";
import GOTCardV4 from "./components/GOTCardV4";

export default async function LoadingPage() {
  const data = await  getGameOfThronesCharacters();

  return (
    <Grid2 container spacing={3}>
      {data.map((character) => (
        <Grid2 key={character.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <GOTCardV2 character={character} />
        </Grid2>
      ))}
    </Grid2>
  );
}
