import { getPokemonByName } from "@/pages/network/pokemon-api";
import { AxiosError } from "axios";
import useSWR from "swr";

export default function usePokemon(pokemonName: string) {
    const { data  , isLoading , error , mutate} = useSWR(pokemonName, async () => {
        try {
            return await getPokemonByName(pokemonName);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                return null;
            } else throw error;
        }
    });
    
    return {
        pokemon: data,
        isLoading,
        error,
        pokemonMutate : mutate
  }
}
