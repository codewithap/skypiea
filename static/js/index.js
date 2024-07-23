/// tranding anime ///
let cards = document.querySelector(".xyz .cards");
let popularCards = document.querySelector(".popular .cards");
topAnimes(popularCards, "bypopularity", 25)
topAnimes(cards, "favorite", 25)
// scroll button
let popularScrollCount = 0
function nextPopular(){
    let x = 24 - Math.floor(document.body.offsetWidth / 195)
    if(popularScrollCount > x){
      popularScrollCount = x
  }
  popularScrollCount += 1;
  popularCards.style.scrollBehavior = "smooth";
  popularCards.scrollLeft = 196*popularScrollCount
}
function prevPopular(){
  if(popularScrollCount < 1){
    popularScrollCount = 1
  }
  popularScrollCount -= 1;
  popularCards.style.scrollBehavior = "smooth";
  popularCards.scrollLeft = 196*popularScrollCount
}
let trendingScrollCount = 0
function nextTrending(){
  let x = 24 - Math.floor(document.body.offsetWidth / 195)
  if(trendingScrollCount > x){
    trendingScrollCount = x;
  }
  trendingScrollCount += 1;
  cards.style.scrollBehavior = "smooth";
  cards.scrollLeft = 196*trendingScrollCount;
}
function prevTrending(){
  if(trendingScrollCount < 1){
    trendingScrollCount = 1
  }
  trendingScrollCount -= 1;
  cards.style.scrollBehavior = "smooth";
  cards.scrollLeft = 196*trendingScrollCount;
}

//   featured anime   //
let airing = document.querySelector(".airing .content");
let tv = document.querySelector(".tv .content");
let movie = document.querySelector(".movies .content");
let upcoming = document.querySelector(".upcoming .content");
getFeaturedAnimes(airing, "airing", 5)
getFeaturedAnimes(upcoming, "upcoming", 5)
getFeaturedAnimes(movie, "movie", 5)
getFeaturedAnimes(tv, "tv", 5)

//////   scroll X  ///////
scrollX(document.querySelector(".xyz .cards"));
scrollX(document.querySelector(".popular .cards"));
scrollX(document.querySelector(".myList .cards"));
scrollX(document.querySelector(".continueWatching .cards"));


function strip(string) {
  return string.replace(/^\s+|\s+$/g, '');
}

async function showAll(type, page){
  loading(true);
  document.querySelector(".pagination").style.display = "flex";
  if(sessionStorage.getItem("navOpened") == 'true'){
    document.querySelector(".close_menu button").click();
  }
  let allAnimeListContainer = document.querySelector(".allAnimeList");
  allAnimeListContainer.classList.add("allAnimeListActive");
  let param = `type=${type}&`;
  if(type == ""){
    param = "";
  }
  const response = await fetch(`https://aniapi-eight.vercel.app/api/topAnimes?${param}page=${page}`);
  const data = await response.json();
  let items = data.items;
  let html = "";
  let list = document.querySelector(".allAnimeList .list");
  for(let item of items){
    html += `
    <div onclick='animeInfo(${item.mal_id}, \`${item.title.replaceAll('"','')}\`)' class="card fx">
  <div class="rank">#${item.rank}</div>
    <div class="image">
      <div class="card_bg2"></div>
      <div class="card_bg" style="background-image: url('${item.imgs.webp.medium}');"></div>
      <img draggable="false" src="${item.imgs.webp.medium}" alt="${item.title}">
    </div>
  <div class="card-title">${item.title}</div>
</div>`;
  }

  list.innerHTML = html;
  pagination(data.pagination, type);
  loading(false);
}

function pagination(obj, type){
  let pages = document.querySelector(".pagination");
  let html = "";
  let currentPage = Number(obj.page);
  if(obj.prev_page == true){
    html += `<button onclick="showAll('${type}', ${currentPage - 1})"> ${currentPage - 1}</button>`;
  }
  html += `<button style="background: #252525; color: #FFF;"> ${currentPage}</button>`;
  if(obj.next_page == true){
    html += `<button onclick="showAll('${type}', ${currentPage + 1})"> ${currentPage + 1}</button>`;
  }
  pages.innerHTML = html;
}

function showAllSavedAnime(){
  let allAnimeListContainer = document.querySelector(".allAnimeList");
  allAnimeListContainer.classList.add("allAnimeListActive");
  let myanimelist = JSON.parse(localStorage.getItem("mylist"));
  let html = "";
  let list = document.querySelector(".allAnimeList .list");
  for(anime of myanimelist){
    html += `
    <div onclick='animeInfo(${anime.mal_id}, \`${anime.name.replaceAll('"','')}\`)' class="card fx">
    <div class="image">
      <div class="card_bg2"></div>
      <div class="card_bg" style="background-image: url('${anime.img}');"></div>
      <img draggable="false" src="${anime.img}" alt="${anime.name}">
    </div>
  <div class="card-title">${anime.name}</div>
</div>`;

  }
  document.querySelector(".pagination").style.display = "none";
  list.innerHTML = html;
}