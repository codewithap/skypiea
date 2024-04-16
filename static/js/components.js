// Featured Animes //
function getFeaturedAnimes(container, Type, no){
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
    <div class="featured-anime-card">
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
  }).catch(error => {
    console.error(error)
  });
}


//  Top Animes  //
function topAnimes(popularCards, Type, no){
  fetch(`https://aniapi-eight.vercel.app/api/topAnimes?type=${Type}&page=1`)
  .then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    let SlidesList = data['items'];
    for (let i = 0; i < no; i++) {
      popularCards.innerHTML += `
      <div class="card fx" style="transform: translateX(${i}px)">
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
    sidebar_menu.style.width = "0";
    slideBarOpenBG.style.display = "none";
  }
  else if (!opened) {
    opened = true;
    sidebar_menu.style.width = "300px";
    slideBarOpenBG.style.display = "block";
  }
}
openBtn.addEventListener("click", openCloseNav);
closeBtn.addEventListener("click", openCloseNav);

/////////////////  Scroll X click & drag  ////////////////////
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
let slider = document.querySelector('.slideShow_mobile .slider');
console.log(slider.offsetWidth)
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
  <div class='btn'><span class='title'><p>${SlidesList[i]['title']}</p>
  
  <button class='watchBtn'><span class="material-symbols-rounded">play_arrow</span> START WATCHING</button></span><span class='bg'></span><img src='${SlidesList[i]['imgs']['webp']['large']}'>
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
