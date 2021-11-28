import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { currentUser, sortBy } = JSON.parse(req.body);
  // console.log(sortBy);

  if (req.method === "POST") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Bar:Barpassword@cluster0.wnq2f.mongodb.net/tasks?retryWrites=true&w=majority"
      );
      const db = client.db();
      const taskCollection = db.collection(currentUser);
      const sortedTasks = await taskCollection
        .find()
        .sort({ [sortBy]: 1 })
        .toArray();
      //   .forEach((e) => {
      //     taskCollection.insert(e);
      //   });
      taskCollection.drop();
      const sortedTasksFinal = await taskCollection.insertMany(sortedTasks);
      console.log(sortedTasksFinal);
      client.close();
      res.status(200).json({ sortedTasks });
    } catch (error) {
      console.error(error.message);
    }
  }
};
export default handler;
