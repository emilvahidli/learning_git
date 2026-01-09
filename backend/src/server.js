import express from "express";

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
app.get("/api/health", (req, res) => {
  console.log("Health endpoint hit");
  res.json({ status: "ok" });
});
