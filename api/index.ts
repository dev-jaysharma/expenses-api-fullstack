import app from "./app.ts";

console.log("🚀 server runnnnning!!");
Bun.serve({
  fetch  : app.fetch
});


