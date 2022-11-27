import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("faavne");

       const stocks = await db
           .collection("stocks")
           .find({})
           .limit(10)
           .toArray();

       res.json(stocks);
   } catch (e) {
       console.error(e);
   }
};