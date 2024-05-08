
export default async function getImageSearch(q) {
    let data  = await fetch("https://api.searchcivitai.com/api/images?sort_by=default&nsfw=None&q="+q+"&m=img");
    data = await data.json();
    
    return data;
}
