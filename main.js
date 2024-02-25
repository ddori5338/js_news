const API_KEY = `f51330bd283d46f7b4060f2419d2d67c`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
const sideMenus = document.querySelectorAll('.side-menu-list button');
sideMenus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
let category = '';
let keyword = '';
let totalResults = 0;
let page = 1;
const pageSize = 3;
const groupSize = 5;

const getNews = async () => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us${category ? "&category=" + category : ""}${keyword ? "&q=" + keyword : ""}&apiKey=${API_KEY}`);
    const url = new URL(`https://ddori5338-news.netlify.app/top-headlines?${category ? "&category=" + category : ""}${keyword ? "&q=" + keyword : ""}`);
    try {
        url.searchParams.set("page", page);  // &page = page
        url.searchParams.set("pageSize", pageSize);
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            console.log(data);
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message);
    }
}

const getLatestNews = async () => {
    getNews();
}

const getNewsByCategory = async (event) => {
    closeNav();
    page = 1;
    keyword = '';
    category = event.target.textContent.toLowerCase();
    getNews();
};

const getNewsByKeyword = async () => {
    page = 1;
    category = '';
    keyword = document.getElementById("search-input").value;
    document.getElementById("search-input").value = '';
    getNews();
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "200px";
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

const imgError = (image) => {
    // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.onerror = null;
	image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
    const newsHTML = newsList.map(news => {
        let title = news.title;
        title = title == null || title == ""
            ? "내용 없음"
            : title.length > 60
            ? title.substring(0, 60) + "..."
            : title;
        let description = news.description;
        description = description == null || description == ""
            ? "내용 없음"
            : description.length > 200
            ? description.substring(0, 200) + "..."
            : description;
        const source_name = news.source.name ? news.source.name : "no source";
        return `<div class="row news">
                    <div class="col-lg-4 img-area">
                        <img src="${news.urlToImage}" alt="뉴스 이미지" class="news-img-size" onerror="imgError(this)">
                    </div>
                    <div class="col-lg-8">
                        <h2 onclick="window.open('${news.url}')">${title}</h2>
                        <p>
                            ${description}
                        </p>
                        <div>
                            ${source_name} - ${moment(news.publishedAt).fromNow()}
                        </div>
                    </div>
                </div>`
    }).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
}

const paginationRender = () => {
    // 주어지는 것, 정하는 것: totalResults, page, pageSize, groupSize
    // 구해야 할 것: totalPages, pageGroup, lastPage, firstPage
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = Math.min(totalPages, pageGroup * groupSize);
    let firstPage = (pageGroup - 1) * groupSize + 1;

    let paginationHTML = ``;
    if (firstPage > 1) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${1})"><a class="page-link" aria-label="Previous">&laquo;</a></li>`;
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link">이전</a></li>`;
    }
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    if (lastPage < totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})"><a class="page-link">다음</a></li>`;
        paginationHTML += `<li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">&raquo;</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}

getLatestNews();