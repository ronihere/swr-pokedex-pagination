import Link from "next/link";

export default function RootLayout({children}: {children : React.ReactNode}) {
    return (
      <>
      <div className="w-full flex items-center justify-center text-6xl pb-10">
          <Link href={'/'}>← PokéDex</Link>
      </div>
          { children }
    </>
  )
}
