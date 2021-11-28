import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import { current } from "immer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, currentUser } = JSON.parse(req.body);

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Bar:Barpassword@cluster0.wnq2f.mongodb.net/tasks?retryWrites=true&w=majority"
      );
      const db = client.db();
      const taskCollection = db.collection(currentUser);
      const result = await taskCollection.deleteOne({
        _id: ObjectId(id),
      });
      console.log(result);
      client.close();
      res.status(201).json({ message: "worked" });
    } catch (error) {
      console.error(error.message);
    }
  }
};
export default handler;
