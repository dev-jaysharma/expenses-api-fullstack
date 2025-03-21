import { Hono } from "hono";
import { expenses } from "./routes/expenses";
import { serveStatic } from 'hono/bun'

const app = new Hono();

// app.get("/", (c) => {
//   return c.json({ message: "Hello World!" });
// });

app.route("/api/expenses", expenses);
app.use('*', serveStatic({ root: './frontend/dist' }));
app.use('*', serveStatic({ path: ' ./frontend/dist/index.html' }));

export default app;
