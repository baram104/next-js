import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Bar:Barpassword@cluster0.wnq2f.mongodb.net/tasks?retryWrites=true&w=majority"
      );
      const db = client.db();
      const taskCollection = db.collection("task");
      const result = await taskCollection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({ message: "worked" });
    } catch (error) {
      console.error(error.message);
    }
  }
};
export default handler;
