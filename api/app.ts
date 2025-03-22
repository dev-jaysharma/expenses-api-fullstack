import { Hono } from "hono";
import { expenses } from "./routes/expenses";
import { serveStatic } from 'hono/bun'
// import { handle } from 'hono/vercel'

const app = new Hono();

// app.get("/", (c) => {
//   return c.json({ message: "Hello World!" });
// });
const route = app.basePath("/api").route("/expenses", expenses);

app.use('*', serveStatic({ root: './frontend/dist' }));
app.use('*', serveStatic({ path: ' ./frontend/dist/index.html' }));

export default app;
export type AppType = typeof route