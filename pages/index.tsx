import Head from "next/head";
import Link from 'next/link'
import clientPromise from "../lib/mongodb";
import { differenceInMinutes, formatDistance } from "date-fns";

const setColor = (rating: number) => {
  if (rating >= 250) {
    return "text-warning text-opacity-100";
  }
  if (rating >= 200) {
    return "text-warning text-opacity-85";
  }
  if (rating >= 150) {
    return "text-warning text-opacity-50";
  }
  if (rating >= 100) {
    return "text-success text-opacity-100";
  }
  if (rating >= 75) {
    return "text-success text-opacity-75";
  }
  if (rating >= 50) {
    return "text-primary text-opacity-100";
  }
  if (rating >= 25) {
    return "text-primary text-opacity-75";
  }
  if (rating <= 24) {
    return "text-secondary text-opacity-50";
  }
};

export default function Stocks({ stocks }: { stocks: any }) {
  return (
    <>
      <div className="container mt-4">
        <Head>
          <title>Faavne</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="container mt-4"> FAAVNE </h1>
        <div className="row row-cols-1 row-cols-md-3">
          {stocks.map((stock: any, index: any) => (
            <div className="col mt-4" key={index}>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="card-title font-weight-bold">
                      {stock.instrument_info.symbol}
                    </h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {stock.instrument_info.long_name}
                    </h6>
                  </div>
                  <div
                    className={
                      stock.price_info.diff_pct > 0
                        ? "text-success text-right"
                        : "text-danger text-right"
                    }
                  >
                    <h4>{stock.price_info.last.price.toFixed(2)}NOK</h4>
                    <h6>
                      {stock.price_info.diff_pct}%{" "}
                      <i
                        className={
                          stock.price_info.diff_pct > 0
                            ? "bi bi-arrow-up-circle"
                            : "bi bi-arrow-down-circle"
                        }
                      ></i>
                    </h6>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h6>Utbytte per aksje:</h6>
                  <h1>{stock.key_ratios_info.dividend_per_share}</h1>
                  <h6 className="">Rating:</h6>
                  <h1
                    className={`${setColor(
                      (stock.key_ratios_info.dividend_per_share /
                        stock.price_info.last.price) *
                        1000
                    )}`}
                  >
                    {stock.key_ratios_info.hasOwnProperty(
                      "dividend_per_share"
                    ) &&
                    stock.price_info.last.hasOwnProperty("price") &&
                    stock.price_info.last.price > 0
                      ? Math.round(
                          (stock.key_ratios_info.dividend_per_share /
                            stock.price_info.last.price) *
                            1000
                        )
                      : <h1 className="text-danger bg-dark rounded bg-opacity-75">No data</h1>}
                  </h1>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <h6
                      className={
                        differenceInMinutes(
                          new Date(stock.company_info.excluding_date),
                          new Date()
                        ) < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {stock.company_info.excluding_date
                        ? `EX: ${formatDistance(
                            new Date(stock.company_info.excluding_date),
                            new Date(),
                            { addSuffix: true }
                          )}`
                        :  <h6 className="text-black-50">EX date not set</h6>}
                    </h6>
                    <h6
                      className={
                        differenceInMinutes(
                          new Date(stock.company_info.dividend_date),
                          new Date()
                        ) < 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {stock.company_info.dividend_date
                        ? `DD: ${formatDistance(
                            new Date(stock.company_info.dividend_date),
                            new Date(),

                            { addSuffix: true }
                          )}`
                        : <h6 className="text-black-50">Divident date not set</h6>}
                    </h6>
                  </div>
                  <div>
                    <h6>
                      {stock.company_info.dividend_date
                        ? new Date(
                            stock.company_info.excluding_date
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </h6>
                    <h6>
                      {stock.company_info.excluding_date
                        ? new Date(
                            stock.company_info.dividend_date
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center m-5 bg-black-25">
        <Link href="https://github.com/toremann" className="link-dark"> <h3 className="bi bi-github"/> </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("faavne");

    const stocks = await db.collection("stocks").find({}).toArray();

    return {
      props: { stocks: JSON.parse(JSON.stringify(stocks)) },
    };
  } catch (e) {
    console.error(e);
  }
}
