const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");
const readline = require("readline");

const visited = new Set();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan link yang ingin diperiksa: ", async (website) => {
  if (!website) {
    console.log("❌ Link tidak boleh kosong!");
    rl.close();
    return;
  }

  async function getSize(link) {
    try {
      console.log(`🔗 Memeriksa ukuran: ${link}`);
      const response = await axios.get(link, {
        responseType: "arraybuffer",
        maxRedirects: 5,
      });
      const size =
        parseInt(response.headers["content-length"]) || response.data.length;
      return isNaN(size) ? 0 : size;
    } catch (error) {
      console.log(`Gagal akses ${link}: ${error.message}`);
      return 0;
    }
  }

  async function crawl(link) {
    if (visited.has(link)) return 0;
    visited.add(link);

    let totalSize = await getSize(link);
    try {
      const response = await axios.get(link);
      const $ = cheerio.load(response.data);

      const assets = $("link[href], script[src], img[src]")
        .map((_, el) =>
          url.resolve(link, $(el).attr("href") || $(el).attr("src"))
        )
        .get();

      for (const asset of assets) {
        totalSize += await getSize(asset);
      }
    } catch (error) {
      console.log(`Error saat akses ${link}: ${error.message}`);
    }

    console.log(
      `✅ Total ukuran untuk ${link}: ${(totalSize / 1024 / 1024).toFixed(
        2
      )} MB`
    );
    return totalSize;
  }

  const totalSize = await crawl(website);
  console.log(
    `\n🏁 Ukuran keseluruhan: ${(totalSize / 1024 / 1024).toFixed(2)} MB`
  );
  rl.close();
});
