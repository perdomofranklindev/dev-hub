import CardsView from "@dev-hub/modules/components/cards/CardsView";
import { getGameOfThronesCharacters } from "../../../../shared/backend/got-characters/game-of-thrones-services";
export default async function LoadingPage() {
  const data = await getGameOfThronesCharacters();

  return <CardsView data={data} />;
}
