
export default async function getImage(id) {

    let data = await fetch("https://civitai.com/api/v1/images?imageId="+id);
    data = await data.json();
    return data;
}
