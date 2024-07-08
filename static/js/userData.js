//////////   Register User    ///////////////
let user_registered = localStorage.getItem("userRegistered");
if(user_registered == null){
  localStorage.setItem("userRegistered", true);
}




function loadWatchedData(mal_id){
  let lastep = "1";
    let data = localStorage.getItem(mal_id);
    if (data != null){
      let arr = data.split(",");
      console.log(arr);
      lastep = localStorage.getItem(`${mal_id}_LastEp`);
      changeList(Math.floor(lastep/100));
      // document.querySelector(`.ep${lastep}`).classList.add("btnActive");
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

/*

[mal-id]_mylist = true

mylist -  [
{
name - 
malid- 
imgLink- 
},

]

*/

function addToMyList(mal_id, name, img){
  localStorage.setItem(`${mal_id}_myList`, true);
  let myanimelist = localStorage.getItem("mylist");
  

}