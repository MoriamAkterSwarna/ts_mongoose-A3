import express, { Application, Request, Response } from "express";
import { bookApi } from "./app/controllers/book.controller";
import { borrowApi } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", bookApi);
app.use("/api/borrow", borrowApi);

app.get("/", (req: Request, res: Response) => {
  res.send("Your library is Loading...");
});

export default app;
