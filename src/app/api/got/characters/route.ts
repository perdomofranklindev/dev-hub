import { getGameOfThronesCharacters } from "@dev-hub/shared/backend/got-characters/game-of-thrones-services";

export async function GET() {
  const data = await getGameOfThronesCharacters();

  return Response.json({ items: data });
}
