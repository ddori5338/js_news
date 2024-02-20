const API_KEY = `f51330bd283d46f7b4060f2419d2d67c`;
let news = [];

const getLatestNews = async () => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    let keyword = '아이유';
    let PAGE_SIZE = 20;
    const url = new URL(`https://ddori5338-news.netlify.app/top-headlines?q=${keyword}&country=kr&pageSize=${PAGE_SIZE}`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log('ddd', news);
}

getLatestNews();