import usePokemon from "@/hooks/usePokemonHook"
import Image from "next/image";
import Link from "next/link";

export default function PokeEntry({ name }: { name: string }) {
    const { pokemon, isLoading } = usePokemon(name);
    return (<div className="min-w-1/4 border">

        {
            isLoading ? <p>Loading...</p> :
                pokemon &&
            <Link href={'/' + pokemon.name}>
                        <div className="flex w-full justify-center capitalize text-gray-300">{`(${pokemon.id}) ${pokemon.name}`}</div>
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={"Pokemon: " + pokemon.name}
                            width={350}
                            height={300}
                        />
            </Link>
        }
    </div>
    )
}
