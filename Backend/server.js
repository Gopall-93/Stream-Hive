import dotenv from "dotenv";
import { app } from "./src/app.js";
import { main } from "./src/Config/mongoose.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  main();
});
