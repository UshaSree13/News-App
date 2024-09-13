let apikey = '477d1e7f0ebd83569601bd3a0797e059';
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

let url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;
fetch(url)
 .then(function (response)  {
 return response.json();
 })
 .then(function (data) {
 let articles = data.articles;  

 for ( let i = 0; i < articles.length; i++) {
    console.log("Title: " + articles[i].title);
    console.log("Description: " + articles[i].description);
 break;
 }
 });


const country = "in";
const options = [
    "general",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
];

let requestURL;
const generateUI = (articles) => {
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div> <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" /></div>
 <div class="news-content">
 <div class="news-title">
 ${item.title}
 </div>
 <div class="news-description">
 ${item.description || item.content || ""}
 </div>
 <a href="${item.url}" target="_blank" class="view-button">Read More</a>
 </div>`;
        container.appendChild(card);
    }
};

//News API Call
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

//Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;
    e.target.classList.add("active");
    getNews();
};

//Options Buttons
const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${
 i === "general" ? "active" : ""
 }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;
    init();
};
