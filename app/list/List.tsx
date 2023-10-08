'use client'

import { Stock } from "@prisma/client"

import Container from "../components/Container"
import PageHeader from "../components/PageHeader"

import { useRouter } from "next/navigation"

interface ListProps {
  stocks: Stock[]
}

const List: React.FC<ListProps> = ({ stocks }) => {
const router = useRouter()

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-3">
          <PageHeader title={'Alle utbytte aksjer'} subtitle={'All utbytte aksjer'} />
          </div>
      {stocks.map((stock: any) => 
        <div key={stock.isin} className="w-full sm:w-auto hover:text-sky-700 cursor-pointer" onClick={() => router.push(`/stock/${stock.isin}`)}>
        {stock.name}
      </div>
      )}
      
      </div>
    </Container>
  )
}

export default List