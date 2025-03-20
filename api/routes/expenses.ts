import { Hono } from "hono";

const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ message: "hello 💵💸" });
  })
  .post("/", (c) => {
    return c.json({ message: "expense created" });
  });
// .put
// .delete

export { expenses };
