import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const currentUser = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://Bar:Barpassword@cluster0.wnq2f.mongodb.net/tasks?retryWrites=true&w=majority"
    );
    const db = client.db();
    console.log(currentUser);
    const taskCollection = db.collection(currentUser);
    const tasks = await taskCollection.find().toArray();
    console.log(tasks);
    res.status(200).json(tasks);
    client.close();
    return tasks;
  }
};
export default handler;
