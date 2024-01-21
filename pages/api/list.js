import { mongooseConnect } from "@/lib/mongoose";
import { List } from "@/models/List";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await List.findOne({ _id: req.query?.id }));
    } else {
      res.json(await List.find());
    }
  }

  if (method === "POST") {
    const { title, detail, date, remark, urgent } = req.body;
    const listDoc = await List.create({
      title,
      detail,
      date,
      remark,
      urgent,
    });

    res.json(listDoc);
  }

  if (method === "PUT") {
    const { title, detail, date, remark, urgent, _id } = req.body;
    await List.updateOne({_id}, { title, detail, date, remark, urgent });
    res.json(true);
  }

  if(method === "DELETE") {
    try {
      await List.deleteOne({ _id: req.query?.id });
      res.json(true);
    } catch (error) {
      console.error("Error deleting list:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }    
  }
}
