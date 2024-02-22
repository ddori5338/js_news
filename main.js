const API_KEY = `f51330bd283d46f7b4060f2419d2d67c`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getNews = async (category, keyword) => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us${category ? "&category=" + category : ""}${keyword ? "&q=" + keyword : ""}&apiKey=${API_KEY}`);
    const url = new URL(`https://ddori5338-news.netlify.app/top-headlines?${category ? "&category=" + category : ""}${keyword ? "&q=" + keyword : ""}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
}

const getLatestNews = async () => {
    getNews('', '');
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    getNews(category, '');
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    getNews('', keyword);
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

// const validateImageUrl = (imageUrl) => {
//     const image = new Image();
//     image.src = imageUrl;
//     let res = image.complete || (image.width + image.height) > 0;
//     return res;
// };

const imgError = (image) => {
	image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
    const newsHTML = newsList.map(news => {
        // let imageUrl = news.urlToImage;
        // imageUrl = validateImageUrl(imageUrl) ? imageUrl : "assets/no_image.jpeg";
        let description = news.description;
        description = description == null || description == ""
            ? "내용 없음"
            : description.length > 200
            ? description.substring(0, 200) + "..."
            : description;
        const source_name = news.source.name ? news.source.name : "no source";
        return `<div class="row news">
                    <div class="col-lg-4">
                        <img src="${news.urlToImage}" alt="뉴스 이미지" class="news-img-size" onerror="imgError(this)">
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