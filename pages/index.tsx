import Head from "next/head";
import Link from "next/link";
import clientPromise from "../lib/mongodb";
import Stocks from "../components/Stocks";
import Top from "../components/Top";

export default function Main({ stocks }: { stocks: any }) {
  return (
    <>
      <div className="container mt-4">
        <Head>
          <title>Faavne</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Faavne</h1>
            <p className="lead">
            Utbytte aksjer er aksjer som betaler ut en del av overskuddet til aksjonærene som utbytte. De kan gi en fast inntekt for investorer og kan også ses på som et tegn på et selskaps økonomiske helse.
            </p>
          </div>
        </div>
        <Top stocks={stocks} />
        <Stocks stocks={stocks} />
        <div className="text-center m-5 bg-black-25">
          <Link href="https://github.com/toremann" className="link-dark">
            <h3 className="bi bi-github" />
          </Link>
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
