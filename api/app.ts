import { Hono } from "hono";
import { expenses } from "./routes/expenses";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});

app.route("/api/expenses", expenses);

export default app;
