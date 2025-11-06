import axios from 'axios';

export type PokeItem = {
  name: string;
  url: string;
}

export type PokeListResponse = {
  results: PokeItem[];
  previous: string | null;
  next: string | null;
  count: number;
}

export async function getPokemonList(url?: string | null): Promise<PokeListResponse> {
  const apiUrl =
    url ?? 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

  const data = await axios.get<PokeListResponse>(apiUrl)
  .then(
    (response) => {
      console.log('Fetched Pokémon list:', response.data);
      return response.data;
    },
    (error) => {
      console.error('Error fetching Pokémon list:', error);
      throw error;
    }
  );
  return data;
}