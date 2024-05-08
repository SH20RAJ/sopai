
export default async function getImages() {

    let data = await fetch("https://SopAI.com/api/v1/images");
    data = await data.json();
    return data;
}
