


const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const endpoint = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/lykon/dreamshaper-8-lcm`;




export default async  function getImage(prompt) {

    const requestData = {
        prompt: prompt || "cyberpunk cat"
      };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // The response is a binary PNG image, so we need to handle it appropriately
        const imageBuffer = await response.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');
        
        return Response.json({
            contentType: 'image/png',
            data: imageBase64
        });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message });
    }
}
