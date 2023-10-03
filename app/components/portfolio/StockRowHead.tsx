'use client'

const StockRowHead = () => {
  return (
    <div className="flex flex-row">
    <div className="flex-grow">Navn</div>
    <div className="flex-grow">Utbytte</div>
    <div className="flex-grow">Antall</div>
    <div className="flex-grow">Kalkulert utbytte</div>
    <div className="flex-grow"></div>
    </div>
  )
}

export default StockRowHead