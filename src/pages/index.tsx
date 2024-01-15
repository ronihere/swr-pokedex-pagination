import useSWR from 'swr'
import { getPokemonPage } from './network/pokemon-api'
import { useRouter } from 'next/router'
import PokeEntry from '@/components/PokeEntry';


export default function Home() {
  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || '1')
  const { data, isLoading } = useSWR(['getPokemonPage', page], () => getPokemonPage(page))
  return (
    <>
      {
        data &&
        <>
          <div className='flex gap-4 flex-wrap w-full'>
            {data.results.map((ele: any) => {
              return <PokeEntry name={ele.name} key={ele.name} />
            })}
          </div>
          <div className='flex justify-end w-full gap-4 mt-10'>

             <button disabled={!data.previous} className={`py-2 px-4 bg-slate-300 rounded-lg text-black ${!data.previous ? 'opacity-30' : ''}`} onClick={() => router.push({ query: { ...router.query, page: page - 1 } })}>Prev</button>
            
            <button disabled={!data.next} className={`py-2 px-4 bg-slate-300 rounded-lg text-black ${!data.next ? 'opacity-30' : ''}`} onClick={() => router.push({ query: { ...router.query, page: page + 1 } })}>Next</button>
            
          </div>
        </>
      }

    </>
  )
}
