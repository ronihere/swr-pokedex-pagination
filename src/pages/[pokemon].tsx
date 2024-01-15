import { useRouter } from "next/router"
import Head from "next/head";
import Link from "next/link";
import usePokemon from "@/hooks/usePokemonHook";
import Image from "next/image";
import { FormEvent } from "react";
import { updateNickname } from "./network/pokemon-api";
export default function PokemonByName() {
    const router = useRouter();
    const pokemonName = router.query.pokemon?.toString() || '';
    const { pokemon, isLoading, error, pokemonMutate } = usePokemon(pokemonName);
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const nickname = formData.get('nickname')?.toString().trim();
        if(!nickname || !pokemon)return 
        const update = await updateNickname(pokemon , nickname);
        pokemonMutate(update, { revalidate: false });
    }
    if (error) return <p>Error hain</p>;
    return (
        <>
            <Head>
                {pokemon && <title>{`${pokemon.name} - NextJS PokéDex`}</title>}
            </Head>
            

            <div>
                

                {isLoading  ?
                    <>
                        Loading...
                    </>
                    :
                    <>
                        {pokemon && <div className="flex flex-col gap-6 items-center justify-center p-10 w-full">
                            <div className="text-xl capitalize leading-10 ">{pokemon.name}</div>
                            <Image
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={"Pokemon: " + pokemon.name}
                                width={400}
                                height={400}
                            />
                            <div className="flex flex-col gap-6 text-gray-400">
                            <div>Types: {pokemon.types.map((type: {type: {name: string}}) => type.type.name).join(", ")}</div>
                            <div>Height: {pokemon.height * 10} cm</div>
                            <div>Weight: {pokemon.weight / 10} kg</div>
                            </div>

                            <form onSubmit={handleSubmit} className="text-gray-400">
                                <label htmlFor="nickname">Nickname: </label>
                                <input name="nickname" placeholder="NickName" className="text-black outline-none rounded-md px-2"/>
                            </form>
                        </div>}
                    </>
                    }
    </div>
      </>
  )
}
