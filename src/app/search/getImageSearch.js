
export default async function getImageSearch(q,page = 1) {
    let data  = await fetch("https://api.searchcivitai.com/api/images?sort_by=up&nsfw=None&q="+q+"&m=img&page="+page+"");
    data = await data.json();
    
    return data;
}
