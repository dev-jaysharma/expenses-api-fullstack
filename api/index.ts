import app from "./app.ts";
import { handle } from 'hono/vercel'

console.log("🚀 server runnnnning!!");
Bun.serve({
  fetch  : app.fetch
});

