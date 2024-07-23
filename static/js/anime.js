function getFeaturedAnimes(container, Type, no){
  loading(true);
  fetch(`https://aniapi-eight.vercel.app/api/topAnimes?type=${Type}&page=1`)
  .then(response => {
    return response.json();
  }).then(data => {
    let list = data['items'];
    for (let i = 0; i < (no); i++) {
    let imgUrl = list[i]['imgs']["jpg"]['small'];
    let title = list[i]["title"];
    let type = list[i]["otherInfo"].split("\n")[0].split("(")[0];
    let epNo = list[i]["otherInfo"].split("\n")[0].split("(")[1].replace("eps)","");
    let score = list[i]["score"];
    container.innerHTML += `
    <div class="featured-anime-card" onclick='animeInfo(${list[i]["mal_id"]}, `+ `\`${title.replaceAll('"','')}\`` + `)'>
    <img draggable="false" src="${imgUrl}" alt="${title}">
    <div class="details">
        <strong class="featured-anime-card_name">
            ${title}
        </strong>
        <div class="featured-anime-card_otherInfo">
            <span class="ep_no fx fx-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m160-800 65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h80l65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h80l65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Z"/></svg> ${epNo}</span>
            <span class="dot"><svg style="fill: #fff;" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z"/></svg></span>
                <span class="rating fx fx-center"><svg style="fill: #FFD700 " xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg> ${score}</span>
            <span class="dot">
                <svg style="fill: #fff;" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z"/></svg></span>
            <span class="type">${type}</span>
        </div>
    </div>
</div>
    `;
    }
    loading(false);
  }).catch(error => {
    console.error(error);
    loading(false);
  });
}

function topAnimes(popularCards, Type, no){
  fetch(`https://aniapi-eight.vercel.app/api/topAnimes?type=${Type}&page=1`)
  .then(response => {
    return response.json();
  }).then(data => {
    let SlidesList = data['items'];
    for (let i = 0; i < no; i++) {
      popularCards.innerHTML += `
      <div onclick='animeInfo(${SlidesList[i]["mal_id"]}, \`${SlidesList[i]['title'].replaceAll('"','')}\`)' class="card fx" style="transform: translateX(${i}px)">
  <div class="rank">#${i+1}</div>
    <div class="image">
      <div class="card_bg2"></div>
      <div class="card_bg" style="background-image: url('${SlidesList[i]['imgs']["webp"]['medium']}');"></div>
      <img draggable="false" src="${SlidesList[i]['imgs']["webp"]['medium']}" alt="${SlidesList[i]['title']}">
    </div>
  <div class="card-title">${SlidesList[i]['title']}</div>
</div>`;
    }
  }).catch(error => {
    console.error(error)
  });
}

/////////// navbar  //////////////////////// 
let closeBtn = document.querySelector(".close_menu button");
let openBtn = document.querySelector(".nav_title .sidebar");
let sidebar_menu = document.querySelector(".sidebar_menu");
let slideBarOpenBG = document.querySelector(".slideBarOpenBG");
let opened = false;
function openCloseNav() {
  if (opened) {
    opened = false;
    sessionStorage.setItem("navOpened", false);
    sidebar_menu.style.width = "0";
    slideBarOpenBG.style.display = "none";
  }
  else if (!opened) {
    opened = true;
    sessionStorage.setItem("navOpened", true);
    sidebar_menu.style.width = "300px";
    slideBarOpenBG.style.display = "block";
  }
}
openBtn.addEventListener("click", openCloseNav);
closeBtn.addEventListener("click", openCloseNav);

/////////////////  Scroll-X click & drag  ////////////////////
function scrollX(slider){
  
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.style.scrollBehavior = "auto";
    slider.scrollLeft = scrollLeft - walk;
  });
}

/////  slider /////
let slider = document.querySelector('.slideShow .slider');
slider.style.height = `${1.3*(slider.offsetWidth)}px`;
let counter = 0;
  // image Slide show //
fetch('https://aniapi-eight.vercel.app/api/topAnimes?page=1')
  .then(response => {
      return response.json();
  }).then(data => {
    let SlidesList = data['items'];
    for (let i = 0; i < SlidesList.length; i++) {
  slider.innerHTML += `<div class='a' style='left: ${i*100}%'>
  <div class="desktop_bg" style="background: url('${SlidesList[i]['imgs']['webp']['large']}')"> </div>
  <div class='btn'><span class='title'><p>${SlidesList[i]['title']}</p><br>
  <div class="topAnimeInfo">
      <div>
      <span style="background: none;color: #f3f3f3;">${SlidesList[i]['otherInfo'].split("\n")[0].split(" (")[0]}</span>
      <span style="height: 25px;"><span class="material-symbols-rounded" style="position: relative; top:2px">video_library
      </span>${SlidesList[i]['otherInfo'].split("\n")[0].split(" (")[1].replace(" eps)","")} &nbsp;</span>
      <span style="background: transparent; font-weight: bolder; color: #fff"><span class="material-symbols-rounded" style="color: #FFD700; background: transparent;scale: 1.4;position: relative; top: 3px">star</span> ${SlidesList[i]['score']}</span>
      <span style="background-color: transparent;"><span class="material-symbols-rounded">hd</span></span>
      </div>
      <div>
      <span>&nbsp;&nbsp; <span style="scale:1.3;position: relative; top: 3px" class="material-symbols-rounded">calendar_month</span>${SlidesList[i]['otherInfo'].split("\n")[1]}</span>
      
      </div>
  </div><br>
  <button onclick="animeInfo(${SlidesList[i]["mal_id"]}, \`${SlidesList[i]['title'].replaceAll('"','')}\`)" class='watchBtn'><span class="material-symbols-rounded">play_arrow</span> START WATCHING</button></span><span class='bg'></span><img src='${SlidesList[i]['imgs']['webp']['large']}'>
  </div></div>`;
}
  }).catch(error => {
    console.error(error)
  });

function slide() {
  let slides = slider.querySelectorAll('.a');
  if (Math.abs(counter) > 9) {
    counter = 0;
  }
  for (let i = 0; i < 10; i++) {
    slides[i].style.transform = `translateX(-${(Math.abs(counter))*100}%)`;
  } }
  
let prev = () => {
  if (counter > 0) {
    counter -= 1;
    slide()
  }
  
  else if (counter == 0) {
    counter = 9;
    slide()
  }
} 

let next = () => {
  counter += 1;
  slide()
}
setInterval(next, 8000);

//////// search  /////////
let searchBtn = document.querySelector('.nav-bar .search');
let searchBox = document.querySelector(".search-box");
let searchContainer = document.querySelector(".searchContainer");
searchOpened = false
searchBtn.addEventListener("click",()=>{
  if(searchOpened == false){
    searchBox.style.height = "60px";
    searchBtn.querySelector("span").style.color = "#a903d7ac";
    searchContainer.style.display = "flex";
    searchOpened = true;
  }
  else if(searchOpened == true){
    searchBox.style.height = "0";
    searchBtn.style.color = "#fff";
    searchBtn.querySelector("span").style.color = "#fff";
    searchContainer.style.display = "none";
    searchOpened = false;
  }
});

let sInput = searchBox.querySelector("input");
let sBtn = searchBox.querySelector("button");

sInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchAnime()
  }
});
sBtn.addEventListener('click', function(e){searchAnime()});


async function searchAnime(){
  loading(true);
  let input = searchBox.querySelector(".search-box input").value;
  closeWatchAnime();
  try {
    const response = await fetch(`https://aniapi-eight.vercel.app/api/search?q=${input}&page=1`);
    const data = await response.json();
    const pagesInfo = data.pagination;
    let html = "";
    for (let item of data.items){
      html += `<div onclick="animeInfo(${item.mal_id}, \`${item.title.replaceAll('"','')}\`); closeSearch()" class="card fx">
      <div class="rank" style="border-radius: 8px;"><i style="color: yellow" class="bi bi-star-fill"></i> &nbsp;${item.score}</div>
        <div class="image">
          <div class="card_bg2"></div>
          <div class="card_bg" style="background-image: url('${item.imgs.webp.medium}');"></div>
          <img src="${item.imgs.webp.medium}" alt="${item.title}">
        </div>
      <div class="card-title">${item.title}</div>
      </div>`;
    }
    searchContainer.innerHTML = html;
    loading(false);
    let x = document.querySelector('.allAnimeListActive');
    x.classList.remove('allAnimeListActive');
  } catch (error){
    console.error(error);
    loading(false);
  }
}

function closeSearch(){
  document.querySelector(".nav_btns .search").click()
}
/////////////////////////////////////////////////////

let watchAnimeBox = document.querySelector(".watchAnime");
let buttons = document.querySelectorAll(".navigation .otherButtons button");
let animeContainer = document.querySelectorAll(".animeBox");

function closeWatchAnime(){
  watchAnimeBox.style.display = "none";
  sessionStorage.removeItem("epIds_saved");
  sessionStorage.removeItem("currentAnimeName");
  sessionStorage.removeItem("subEpisHtml");
  sessionStorage.removeItem("dubEpisHtml");
  sessionStorage.removeItem("changelistValue");
  sessionStorage.removeItem("relationsHtml");
  animeContainer[1].innerHTML = ""
}

function nextCotainer(x){
  animeContainer.forEach(e =>{
    e.style.display = "none";
  });
  if(x == 4){
    animeContainer[x - 1].style.display = "flex";
  } else {
    animeContainer[x - 1].style.display = "block";
  }
  
  buttons.forEach(e => {
    e.style.color = "#fff";
  });
  buttons[x - 1].style.color = "limegreen";
}

function animeInfo(malId, name2){
  
  animeContainer[0].innerHTML = "";
  animeContainer[3].innerHTML = "";
  watchAnimeBox.style.display = "block";
  buttons[0].style.color = "limegreen";
  buttons.forEach(e => {
    e.style.color = "#fff";
  });
  buttons[0].style.color = "limegreen";
  animeContainer.forEach(e =>{
    e.style.display = "none";
  });
  animeContainer[0].style.display = "block";
  sessionStorage.removeItem("epIds_saved");
  sessionStorage.removeItem("currentAnimeName");
  sessionStorage.removeItem("fetched_charactersInfo");
  getInfo(malId, name2)
}

buttons[1].addEventListener("click", ()=>{
  if(sessionStorage.getItem("epIds_saved") == null){
    sessionStorage.setItem("epIds_saved", true);
    let name = sessionStorage.getItem("currentAnimeName");
    let name2 = sessionStorage.getItem("currentAnimeName2");
    getAnimeEpis(name, name2);
  }
});

buttons[2].addEventListener("click", ()=>{
  if(sessionStorage.getItem("fetched_charactersInfo") == null){
    sessionStorage.setItem("fetched_charactersInfo", true);
    let mal_id = sessionStorage.getItem("mal_id");
    getAnime_characters(mal_id);
  }
});

function getInfo(malid, name2){
  loading(true);
  fetch(`https://aniapi-eight.vercel.app/api/anime?id=${malid}`)
  .then(response => {
    return response.json();
  }).then(data => {
    sessionStorage.setItem("currentAnimeName", data["info"]["english"]);
    sessionStorage.setItem("currentAnimeName2", name2);
    sessionStorage.setItem("currentAnimeEpis", data["info"]["episodes"]);
    sessionStorage.setItem("mal_id", data["mal_id"]);
     let infoHtml = ``;
    let info = data["info"];
    for(let key in info){
      if(key == "score"){
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${(info[key]).split(" (scored by")[0]}</span> </div>`;
      }
      else if(key == "ranked"){
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${(info[key]).split("\n")[0]}</span> </div>`;
      }
      else if(key == "genres" || key == "demographic" || key == "themes"){
        let inputString = info[key];
        let splitWords = inputString.split(",");
        console.log(splitWords)
        let filteredWords = "";
        for (let word of splitWords){
          let z = word.replaceAll(" ","");
          let midPoint = Math.ceil(z.length / 2);
          filteredWords += " "+z.slice(0, midPoint) + ",";
        } 
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${filteredWords.replace(/,$/, "")}</span> </div>`;
      }
      else{
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${strip(info[key])}</span> </div>`;
      }
    }

    let animes = data["related_animes"];
    let relationsHtml = '';
    for (let anime of animes){
      if (anime.link.split("/")[3] != "manga"){
        let type = anime.type.split("\n")[1].replaceAll(" ", "")
        if (type == "Prequel" || type == "Sequel"){
          relationsHtml += `<div class="relatedAnime" onclick="closeWatchAnime(); animeInfo(${anime.link.split("/")[4]}, \`${anime.name.trim().replaceAll('"','')}\`)">
          <img src="${anime.img.split("?s=")[0].replace("r/50x70/", "")}">
          <div class="relatedAnimeInfo">
            ${anime.name} <br>
            <small>${type}</small>
          </div>
          </div>`;
        }
      }
    }

    let btnIcon = `<i style="font-size: 1.7rem" class="bi bi-bookmark-plus-fill"></i>`
    let isInMylist = localStorage.getItem(`${malid}_inML`);
    if(isInMylist != null){
      btnIcon = `<i style="font-size: 1.7rem; color: #20c997" class="bi bi-bookmark-check-fill"></i>`;
    }

    let extLinkHtml = "";
    let linksHtml = data["external_links"];
    for(let link of linksHtml){
      if(link.data != "#"){
        extLinkHtml += `
          <a target="_blank" href="${link.data}">${link.name}</a>
        `;
      }
    }

    let title__ = data["info"]["english"] == undefined ? data.title : data["info"]["english"];
    console.log(title__)
    animeContainer[0].innerHTML = `
    <div class="anisContent">

      <div class="title">
        <img src="${data["imgs"]["webp"]["large"]}">
        <h1>${title__}</h1>
        <div><button onclick='document.querySelectorAll(".navigation .otherButtons button")[1].click()'>Watch Now</button> <button class="addToMyList" onclick="addToMyList(${malid}, '${name2.replaceAll("'",'').replaceAll('"', "")}', '${data.imgs.webp.large}')">
        ${btnIcon}
        </button></div>
      </div>

      <div class="anisInfo">
        <h1>${title__}</h1>
        <p>${data["description"]}</p>
      </div>
    </div>

    <div class="anisItems">
      <div class="otherAniInfo">${infoHtml}</div>
      <br>
      <div class="wxyz">
        <div class="desc">${data["description"]}</div>
        <div class="relations">${relationsHtml}</div> <br>
        <div class="ext_links">
          <h3> External Links</h3>
          <div class="links">
            ${extLinkHtml}
          </div>
        </div>
      </div>
      <br>
    </div>
    `;
    sessionStorage.setItem("img_url", data.imgs.webp.large);
    sessionStorage.setItem("relationsHtml", relationsHtml);
    scrollX(document.querySelector(".otherAniInfo"));

    let openingSongs = data["theme_songs"]["opening"];
    let endingSongs = data["theme_songs"]["ending"];
    
    for(let i in openingSongs){
      let spotify, youtube ;
      if(openingSongs[i]["spotify"] != ""){
        spotify = `<a class="spotify" target="_blank" href="${openingSongs[i]["spotify"]}"><i class="bi bi-spotify"></i></a>`;
      } else {
        spotify = `<a class="spotify linkDisabled" target="_blank" href="#"><i class="bi bi-spotify"></i></a> `;
      }
      if(openingSongs[i]["youtube"] != ""){
        youtube = `<a class="youtube" target="_blank" href="${openingSongs[i]["youtube"]}"><i class="bi bi-youtube"></i></a>`;
      } else {
        youtube = `<a class="youtube linkDisabled" target="_blank" href="#"><i class="bi bi-youtube"></i></a> `;
      }

      animeContainer[3].innerHTML += `
      <div class="songsCard">
        <div class="name">${openingSongs[i]["name"].substring(3)}</div>
        <div class="links">${spotify} ${youtube}</div>
      </div>
    `;
    }
    for(let i in endingSongs){
      let spotify, youtube ;
      if(endingSongs[i]["spotify"] != ""){
        spotify = `<a class="spotify" target="_blank" href="${endingSongs[i]["spotify"]}"><i class="bi bi-spotify"></i></a>`;
      } else {
        spotify = `<a class="spotify linkDisabled" href="#"><i class="bi bi-spotify"></i></a> `;
      }

      if(endingSongs[i]["youtube"] != ""){
        youtube = `<a class="youtube" target="_blank" href="${endingSongs[i]["youtube"]}"><i class="bi bi-youtube"></i></a>`;
      } else {
        youtube = `<a class="youtube linkDisabled" href="#"><i class="bi bi-youtube"></i></a> `;
      }

      animeContainer[3].innerHTML += `
      <div class="songsCard">
        <div class="name">${endingSongs[i]["name"].substring(3)}</div>
        <div class="links">${spotify} ${youtube}</div>
      </div>
    `;
    }
    loading(false);
    
  }).catch(error => {
    console.error(error);
    loading(false)
  });
}

async function getAnime_characters(malId) {
  loading(true);
  animeContainer[2].innerHTML = "";
  try {
      const response = await fetch(`https://aniapi-eight.vercel.app/api/characters?id=${malId}`);
      const data = await response.json();
      const characters = data.data;

      let html = "";
      for (const character of characters) {
        const voiceActorsHtml = `
        <div class="voice_actorsCard">
            <div class="voice_actorsInfo">
                <div class="voice_actorName">${character["voice_actors"]["name"]}</div>
                <div class="lang">${character["voice_actors"]["lang"]}</div>
            </div>
            <img src="https://cdn.myanimelist.net/images/${character["voice_actors"]["img"]}">
        </div>`
    
          html += `
              <div class="charactersCard">
                  <div class="character">
                      <img src="https://cdn.myanimelist.net/images${character.img}">
                      <div class="characterInfo">
                          <div class="charName">${character.name}</div>
                          <div class="type">${character.type}</div>
                      </div>
                  </div>
                  <div class="voice_actors">${voiceActorsHtml}</div>
              </div>`;
      }

      animeContainer[2].innerHTML = html;
      loading(false);
  } catch (error) {
      console.error("Error fetching character data:", error);
      loading(false);
  }
}

var epRangeOpened = false;
var epLangOpened = false;
async function getAnimeEpis(name1, name2){
  loading(true);
  addToContinueWatching(sessionStorage.getItem("mal_id"), name2.replaceAll("'",'').replaceAll('"', ""), sessionStorage.getItem("img_url"));
  try {
    let response = await fetch(`https://aniapi-eight.vercel.app/api/search/gogo?q=${name1}`);
    let data = await response.json();
    let response2, data2;
    let similarity1 = 0;
    let similarity2 = 0;
    if (data.length != 0){
      response2 = await fetch(`https://aniapi-eight.vercel.app/api/anime/epis?gogoid=${data[0]["id"]}`);
      data2 = await response2.json();
      similarity1 = stringSimilarity.compareTwoStrings(name1, data2.title)
    } else if (data.length == 0){
      try{
        console.log("retrying!!")
        response = await fetch(`https://aniapi-eight.vercel.app/api/search/gogo?q=${name2}`);
        data = await response.json();
        response2 = await fetch(`https://aniapi-eight.vercel.app/api/anime/epis?gogoid=${data[0]["id"]}`);
        data2 = await response2.json();
        let similarity2 = stringSimilarity.compareTwoStrings(name2, data2.title)
    } catch (error){
      console.log(error)
      data2 = {
        "error": error
      }
    }}
    let similarity = Math.max(similarity1.toFixed(2), similarity2.toFixed(2))*100;

    // console.log(similarity)
    // console.log(data[0]["id"].includes("dub"))
    
    let z;
    let epis = data2.episodes;
    var episHtml = "";
    var dubEpisHtml = "";
    let dubEpisData;
    if(data.length != 0 && data[0]["id"].includes("dub") != true){
      try{
      let response3 = await fetch(`https://aniapi-eight.vercel.app/api/anime/epis?gogoid=${data[0]["id"]}-dub`);
      dubEpisData = await response3.json();
      for (let i = 0; i < dubEpisData.episodes.length; i++) {
        if(i < 100){
          dubEpisHtml += `<button onclick='getEpisM3u8("${dubEpisData.episodes[i]}", ${i})' class="epBtn dub ep${i+1}"> ${i + 1} </button>`;
        } else {
          dubEpisHtml += `<button style="display: none" onclick='getEpisM3u8("${dubEpisData.episodes[i]}", ${i})' class="epBtn dub ep${i+1}"> ${i + 1} </button>`;
        }
      }
  
    } catch (error){
      console.log(error)
    }
    } else if (data.length != 0 && data[0]["id"].includes("dub") == true){
      try{
        z = true;
        let response3 = await fetch(`https://aniapi-eight.vercel.app/api/anime/epis?gogoid=${data[0]["id"].replace("-dub", "")}`);
        dubEpisData = await response3.json();
        for (let i = 0; i < dubEpisData.episodes.length; i++) {
          if(i < 100){
            dubEpisHtml += `<button onclick='getEpisM3u8("${dubEpisData.episodes[i]}", ${i})' class="epBtn sub ep${i+1}"> ${i + 1} </button>`;
          } else {
            dubEpisHtml += `<button style="display: none" onclick='getEpisM3u8("${dubEpisData.episodes[i]}", ${i})' class="epBtn sub ep${i+1}"> ${i + 1} </button>`;
          }
        }
    
      } catch (error){
        console.log(error)
      }
    }

    if(z != true){
      for (let i = 0; i < epis.length; i++) {
        if(i < 100){
          episHtml += `<button onclick='getEpisM3u8("${epis[i]}", ${i})' class="epBtn sub ep${i+1}"> ${i + 1} </button>`;
        } else {
          episHtml += `<button style="display: none" onclick='getEpisM3u8("${epis[i]}", ${i})' class="epBtn sub ep${i+1}"> ${i + 1} </button>`;
        }
      }
    }
    else if (z == true){
      for (let i = 0; i < epis.length; i++) {
        if(i < 100){
          episHtml += `<button onclick='getEpisM3u8("${epis[i]}", ${i})' class="epBtn dub ep${i+1}"> ${i + 1} </button>`;
        } else {
          episHtml += `<button style="display: none" onclick='getEpisM3u8("${epis[i]}", ${i})' class="epBtn dub ep${i+1}"> ${i + 1} </button>`;
        }
      }
    }
    
    sessionStorage.setItem("subEpisHtml", episHtml);
    sessionStorage.setItem("dubEpisHtml", dubEpisHtml);
    let relatedAnimes = sessionStorage.getItem("relationsHtml");
    let RAhtml = ``;
    if(relatedAnimes.length == 0){
      RAhtml = ``;
    } else {
      RAhtml = `<div class="relatedAnimes" onclick="expandRAHtml()">
          <h4>More Seasons</h4> <i class="bi bi-arrow-down-short"></i>
        </div>
        <div class="relatedAnimesHtml">${relatedAnimes}</div>`;
    }
    animeContainer[1].innerHTML =`
    <div class="video">
      <div class="currentAnime">
        <div class="m3u8">
      
        </div>
        <p> You Are Watching <b></b> </p> <br>
      </div>
      <div class="epis">
        ${RAhtml}
        <div class="controls">
          <div class="epRange">
            <div class="selectedValue"> <b>1 - 100</b><span class="material-symbols-rounded">expand_more</span></div>
            <span class="rangeList"></span>
          </div>

          <div class="epLang">
            <div class="epLangs">
            <div class="selectedLangValue"> <b>SUB</b><span class="material-symbols-rounded">expand_more</span></div>
            <span class="langList">
              <span onclick="changeLang('sub')"> SUB </span>
              <span onclick="changeLang('dub')"> DUB </span>
            </span>
            </div>
          </div>

          
        </div>
        <div class="epis_btns">${episHtml}</div>
        
      </div>
    </div>
    `;

    if(z == true){document.querySelector(".selectedLangValue b").innerHTML = "DUB";}
    
    let epNo = epis.length;
    let epPageNo = (Math.floor(epNo/100) + 1);
    let video = document.querySelector(".video .currentAnime");
    let w = video.offsetWidth;
    let pageOption = document.querySelector('.epis .controls .epRange .rangeList');
    let langOptions = document.querySelector('.epis .controls .epLang .langList');
    
    let epRange = document.querySelector(".epRange .selectedValue");
    let epLang = document.querySelector(".epLang .selectedLangValue");
    epRange.addEventListener("click", ()=>{
      if(!epRangeOpened){
        pageOption.style.height= "120px";
        epRangeOpened = true;
      } else {
        pageOption.style.height = "0";
        epRangeOpened = false;
      }
    });
    epLang.addEventListener("click", ()=>{
      if(!epLangOpened){
        langOptions.style.height= "75px";
        epLangOpened = true;
      } else {
        langOptions.style.height = "0";
        epLangOpened = false;
      }
    });
    
    for (let i = 0; i < epPageNo; i++) {
      pageOption.innerHTML += '<span onclick="changeList('+i+')">'+`${100*i + 1} - ${100*(i+1)}`+'</span>'
    }
    
    loadWatchedData(sessionStorage.getItem("mal_id"));
    loading(false);

  } catch (error){
    console.log(error)
    loading(false);
  }
}
let RAopened = false;
function expandRAHtml(){
  let relatedAnimesHtml = document.querySelector(".relatedAnimesHtml");
  if(!RAopened){
    relatedAnimesHtml.style.height = "180px";
    RAopened = true;
  } else if(RAopened){
    relatedAnimesHtml.style.height = "0";
    RAopened = false;
  }
}

function changeLang(lang){
  let epis_btns = document.querySelector(".epis_btns");
  let changelistValue = Number(sessionStorage.getItem("changelistValue"));
  
  if(lang == "sub"){
    epis_btns.innerHTML = sessionStorage.getItem("subEpisHtml");
    document.querySelector(".selectedLangValue b").innerHTML = "SUB";
  }
  else if(lang == "dub"){
    epis_btns.innerHTML = sessionStorage.getItem("dubEpisHtml");
    document.querySelector(".selectedLangValue b").innerHTML = "DUB";
  }
  epLangOpened = false;
  document.querySelector('.epis .controls .epLang .langList').style.height = "0";
  changeList(changelistValue);
  loadWatchedData(sessionStorage.getItem("mal_id"));
}

function changeList(i){
  document.querySelector(".epRange .selectedValue b").innerHTML = `${100*i + 1} - ${100*(i+1)}`;
  let pageOption = document.querySelector('.epis .controls .epRange .rangeList');
  let epis = document.querySelectorAll(".epis_btns button");
  pageOption.style.height = "0";
  sessionStorage.removeItem("changelistValue")
  sessionStorage.setItem("changelistValue", `${i}`);
  for (let x = 0; x < epis.length; x++) {
    if(x > (100*i - 1) && x < (100*(i+1)) ){
      epis[x].style.display = "block";
    } else {
      epis[x].style.display = "none";
    }
  }
  epRangeOpened = false;
}

function getEpisM3u8(gogoEpId, i){
  fetch(`https://aniapi-eight.vercel.app/api/anime/ep?epid=${gogoEpId}`)
  .then(response => {
    return response.json();
  }).then(data => {
    let vidstreamingUrl = data[0]["video"];
    fetch(`https://aniapi-eight.vercel.app/api/extractors/vidstreaming?url=${vidstreamingUrl}`)
    .then(response => {
      return response.json();
    }).then(data => {
      document.querySelectorAll(`.ep1`)[0].classList.contains("btnActive");
      let malId = sessionStorage.getItem("mal_id");
      if(localStorage.getItem(`${malId}`) == null){
        localStorage.setItem(`${malId}`, [i+1]);
        localStorage.setItem(`${malId}_LastEp`, i+1); 
      } else{
        if(!document.querySelectorAll(`.ep${i+1}`)[0].classList.contains("btnActive")){
          let arr = localStorage.getItem(`${malId}`).split(",");
          arr.push(i+1);
          localStorage.setItem(`${malId}`, arr); 
          localStorage.setItem(`${malId}_LastEp`, i+1); 
        }
      }
      document.querySelectorAll(`.ep${i+1}`)[0].classList.add("btnActive");
      let file1 = data["source"][0]["file"];
      let file2 = data["source_bk"][0]["file"];
      let video = document.querySelector(".m3u8");
      html = `
      <iframe class="m3u8" frameborder="0" src="/play?m3u8=${file1}&m3u8_2=${file2}" style="width: 100%;height: 100%">
        </iframe>`;
        video.innerHTML = html;
        document.querySelector(".currentAnime b").innerHTML = `Episode ${i + 1}`;
        addEventListener('resize', () => {
          let w = document.querySelector(".m3u8").offsetWidth;
          document.querySelector(".m3u8").style.height = `${w/1.8 + 22}px`;
        });
        let w = video.offsetWidth;
        video.style.height = `${w/1.8 + 22}px`;
    }).catch(error => {
      console.error(error)
    });
  }).catch(error => {
    console.error(error)
  });
}