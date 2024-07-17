//////////   Register User    ///////////////
let user_registered = localStorage.getItem("userRegistered");
if(user_registered == null){
  localStorage.setItem("userRegistered", true);
  localStorage.setItem("mylist", "[]");
  localStorage.setItem("continueWatching", "[]");
}

let mylistdata = JSON.parse(localStorage.getItem("mylist"));
if (mylistdata.length != 0){
  loadMyListData()
} else{
  document.querySelector(".myList").style.display = "none";
}

let CWLdata = JSON.parse(localStorage.getItem("continueWatching"));
if(CWLdata.length != 0){
  loadContinueWatchingData()
} else {
  document.querySelector(".continueWatching").style.display = "none";
}

function loadWatchedData(mal_id){
  let lastep = "1";
    let data = localStorage.getItem(mal_id);
    if (data != null){
      let arr = data.split(",");
      console.log(arr);
      lastep = localStorage.getItem(`${mal_id}_LastEp`);
      changeList(Math.floor(lastep/100));
      for(let item of arr){
        try{
          document.querySelector(`.ep${item}`).classList.add("btnActive");
        } catch(error){
          console.log(error);
        }
      }
      document.querySelector(`.ep${lastep}`).click();
    } else if(data == null){
      document.querySelector(`.ep${lastep}`).click();
      document.querySelector(`.ep${lastep}`).classList.add("btnActive");
    }
}

function addToMyList(mal_id, name, img){
  let inMl = localStorage.getItem(`${mal_id}_inML`);
  if(inMl == null){
    localStorage.setItem(`${mal_id}_inML`, "true");
    let myanimelist = JSON.parse(localStorage.getItem("mylist"));
    let data = {
      "name": name,
      "mal_id": mal_id,
      "img": img
    }
    myanimelist.push(data);
    console.log(myanimelist);
    localStorage.setItem("mylist", JSON.stringify(myanimelist));
    document.querySelector(".addToMyList").innerHTML = `
    <i style="font-size: 1.7rem; color: #20c997" class="bi bi-bookmark-check-fill"></i>
    `;
  }
  loadMyListData()
}

function loadMyListData(){
  let html = "";
  let myList = document.querySelector(".myList .cards");
  let data = JSON.parse(localStorage.getItem("mylist")).reverse();
  for(let x of data){
    html += `
    <div onclick='animeInfo(${x["mal_id"]}, \`${(  x['name']  ).replaceAll('"','')}\`)' class="card fx" style="transform: translateX(1px)">
  <div class="image">
    <div class="card_bg2"></div>
    <div class="card_bg" style="background-image: url('${x["img"]}');"></div>
    <img draggable="false" src="${x["img"]}" alt="${x['name']}">
  </div>
<div class="card-title">${x['name']}</div>
</div>`;
  }
  myList.innerHTML = html;
  document.querySelector(".myList").style.display = "block";
}

let mylist = document.querySelector(".myList .cards");
let count_ = 0;
function slide_next(){
  let x = (mylist.querySelectorAll(".card").length -1) - Math.floor(mylist.offsetWidth / 195); //24 - Math.floor(mylist.offsetWidth / 195);
  console.log(x)
  if(count_ > x){ count_ = x; }
  count_ += 1;
  mylist.style.scrollBehavior = "smooth";
  mylist.scrollLeft = 196*count_;
}

function slide_prev(){
  if(count_ < 1){ count_ = 1; }
  count_ -= 1;
  mylist.style.scrollBehavior = "smooth";
  mylist.scrollLeft = 196*count_;
}

function addToContinueWatching(mal_id, name, img){
  let inCNL = localStorage.getItem(`${mal_id}_inCNL`);
  if(inCNL == null){
    localStorage.setItem(`${mal_id}_inCNL`, "true");
    let myanimelist = JSON.parse(localStorage.getItem("continueWatching"));
    let data = {
      "name": name,
      "mal_id": mal_id,
      "img": img
    }
    myanimelist.push(data);
    if(myanimelist.length > 5){
      myanimelist.shift()
    }
    localStorage.setItem("continueWatching", JSON.stringify(myanimelist));
  }
  loadContinueWatchingData()
}

function loadContinueWatchingData(){
  let html = "";
  let continueWatching = document.querySelector(".continueWatching .cards");
  let data = JSON.parse(localStorage.getItem("continueWatching")).reverse();
  for(let x of data){
    html += `
    <div onclick='animeInfo(${x["mal_id"]}, \`${(  x['name']  ).replaceAll('"','')}\`)' class="card fx" style="transform: translateX(1px)">
  <div class="image">
    <div class="card_bg2"></div>
    <div class="card_bg" style="background-image: url('${x["img"]}');"></div>
    <img draggable="false" src="${x["img"]}" alt="${x['name']}">
  </div>
<div class="card-title">${x['name']}</div>
</div>`;
  }
  continueWatching.innerHTML = html;
  document.querySelector(".continueWatching").style.display = "block";
}