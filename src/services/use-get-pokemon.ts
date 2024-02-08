import { useQuery } from "react-query";
import axios, { GenericAbortSignal } from "axios";
import { getRandomNumber } from "../utils/random-number";
import { PokeAPI } from "pokeapi-types";
import { pokemonApiAdapter } from "./adapters/pokemon-adapter";
import { Pokemon } from "../interfaces/pokemon";

interface UseGetPokemon {
  onSuccess: (data: Pokemon) => void;
}

export const GET_POKEMON_QUERY_KEY = "get_pokemon";

const getPokemon = async (signal?: GenericAbortSignal) => {
  const randomId = getRandomNumber(1, 807);
  const { data } = await axios.get<PokeAPI.Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${randomId}`,
    {
      signal,
    }
  );
  const pokemon = pokemonApiAdapter(data);
  return pokemon;
};

export const useGetPokemon = ({ onSuccess }: UseGetPokemon) => {
  return useQuery([GET_POKEMON_QUERY_KEY], ({ signal }) => getPokemon(signal), {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess,
  });
};
