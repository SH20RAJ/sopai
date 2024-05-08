
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getData = async (page = 1) => {
  let data = await fetch("https://civitai.com/api/v1/images?cursor="+page);
  data = await data.json();
  return data;
};

export async function GET(req, res) {
  const url = new URL(req.url)

  if (req.method === "GET") {
    try {
      let images = await getData(generateRandomNumber(1,10000))
      images = images.items

      let xml = '<?xml version="1.0" encoding="UTF-8"?>';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

      images.forEach((image) => {
        xml += "<url>";
        xml += `<loc>${url.origin +"/image/"+ image.id}</loc>`;
        xml += "<changefreq>daily</changefreq>";
        xml += "<priority>1</priority>";
        xml += "</url>";
      });

      xml += "</urlset>";

      return new Response(xml, {
        headers: {
          "Content-Type": "application/xml",
        },
        status: 200,
      });
    } catch (error) {
      console.error("Error generating sitemap:", error);
    }
  } else {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: ["GET"],
      },
    });
  }
}
