// const linkPreviewGenerator = require("link-preview-generator");

// linkPreviewGenerator("https://fkrt.co/poSz4N").then(console.log);
const express = require("express");
const seeLink = require("see-link");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing 'url' parameter" });
    return;
  }
  seeLink(url)
    .then((result) => {
      res.json(result);
    })
    .catch(console.error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
