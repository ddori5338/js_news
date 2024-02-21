const API_KEY = `f51330bd283d46f7b4060f2419d2d67c`;
let newsList = [];

const getLatestNews = async (category) => {
    let categoryQuery = category ? `&category=${category}` : '';
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us${categoryQuery}&apiKey=${API_KEY}`);
    let keyword = '아이유';
    let PAGE_SIZE = 20;
    const url = new URL(`https://ddori5338-news.netlify.app/top-headlines?q=${keyword}&country=kr&pageSize=${PAGE_SIZE}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log('newsList', newsList);
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
  
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

const validateImageUrl = (imageUrl) => {
    const image = new Image();
    image.src = imageUrl;
    let res = image.complete || (image.width + image.height) > 0;
    return res;
}; 

const render = () => {
    const newsHTML = newsList.map(news => {
        let imageUrl = news.urlToImage;
        imageUrl = validateImageUrl(imageUrl) ? imageUrl : "assets/no_image.jpeg";
        let description = news.description;
        description = description == null || description == ""
            ? "내용 없음"
            : description.length > 200
            ? description.substring(0, 200) + "..."
            : description;
        const source_name = news.source.name ? news.source.name : "no source";
        return `<div class="row news">
                    <div class="col-lg-4">
                        <img class="news-img-size" src="${imageUrl}"/>
                    </div>
                    <div class="col-lg-8">
                        <h2>${news.title}</h2>
                        <p>
                            ${description}
                        </p>
                        <div>
                            ${source_name} * ${moment(news.publishedAt).fromNow()}
                        </div>
                    </div>
                </div>`
    }).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

getLatestNews();