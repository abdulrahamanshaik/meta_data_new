const express = require("express");
const unshort = require("url-unshorten");
const linkPreviewGenerator = require("link-preview-generator");

// linkPreviewGenerator("https://fkrt.co/poSz4N").then(console.log);

const app = express();
const port = process.env.PORT || 3000;
app.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "Missing 'url' parameter" });
    return;
  }
  var dd = { result: "none" };

  const un = await unshort(url)
    .then(async (res) => {
      const data = await linkPreviewGenerator(res.unshorten);
      dd = {
        title: data.title,
        description: data.description,
        url: res.unshorten,
        domain: data.domain,
        image: data.img,
        favicon: data.favicon,
      };
    })
    .catch(console.log);
  await res.json(dd);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
