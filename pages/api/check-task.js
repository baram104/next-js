import { MongoClient } from "mongodb";
import { ObjectId } from "bson";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, checked, currentUser } = JSON.parse(req.body);

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Bar:Barpassword@cluster0.wnq2f.mongodb.net/tasks?retryWrites=true&w=majority"
      );
      const db = client.db();
      const taskCollection = db.collection(currentUser);
      const foundTask = await taskCollection.updateOne(
        {
          _id: ObjectId(id),
        },
        { $set: { checked: !checked } }
      );

      client.close();
      res.status(201).json({ message: "worked" });
    } catch (error) {
      console.error(error.message);
    }
  }
};
export default handler;
