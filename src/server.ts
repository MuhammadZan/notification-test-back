import express, { Request, Response } from "express";
import cors from "cors";
import webPush, { PushSubscription } from "web-push";

const app = express();
app.use(express.json());
app.use(cors());
const subscriptions: PushSubscription[] = [];

const publicVapidKey: string =
  "BNZ4HSyfHTw_BuOH-7qHw5RgOQhQmneALpm2IuDdC0e66YE5urm3qKf6PBiQ473FYhbk_FzrOUEzGIgRl9o_MQ8";
const privateVapidKey: string = "QdT_oq9uMfTHcYWjE8v3kRjQri78jnOk0LjCw8gzG74";

webPush.setVapidDetails(
  "mailto:pebitest05@gmail.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req: Request, res: Response) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post("/notify", (req: Request, res: Response) => {
  const { title, message } = req.body;
  const payload = JSON.stringify({ title, message });

  subscriptions.forEach((subscription) => {
    webPush
      .sendNotification(subscription, payload)
      .catch((error) => console.error(error));
  });

  res.status(200).send("Notifications sent.");
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is working");
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
