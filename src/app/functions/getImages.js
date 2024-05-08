
export default async function getImages() {

    let data = await fetch("https://civitai.com/api/v1/images");
    data = await data.json();
    return data;
}
