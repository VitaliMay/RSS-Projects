
// подключаю плейлист
import arrInfo from "./respInfo.js";

console.log(arrInfo)


const wrapper = document.querySelector('.wrapper')
const coverContent = document.querySelector('.cover-content')

/********************************************** */

const input = document.querySelector('.header-input')
const form = document.querySelector('.header-form')



let searchDefolt = `computer`
let numImg = 30   // количество фото на странице
let numPage = 4   // номер запрашиваемой страницы

// const searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${numImg}&orientation=landscape&client_id=${accessKey}`
let searchRequest = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${numImg}&page=${numPage}&orientation=landscape&client_id=${arrInfo[0]}`
// const searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${numImg}&orientation=landscape&client_id=${accessKey}`

/********************************************** */

form.addEventListener('submit', (event) => {
  event.preventDefault(); // чтобы не перегружало страницу
  let search = input.value
  console.log(`Поиск = ${search}`)
  let searchReq = `https://api.unsplash.com/search/photos?query=${search}&per_page=${numImg}&page=${numPage}&orientation=landscape&client_id=${arrInfo[0]}`
  getFoto(searchReq)
  // input.value = ''
})


/********************************************* */


// getFoto(searchRequest)

async function getFoto(url) {
  try {
    // const response = await fetch(url);
    const response = await fetch(url, {
      headers: {
        'Accept-Version': 'v1'
      }
    });
    const data = await response.json();
    console.log(data.total)
    const foto01 = data.results[0].urls.full;
    coverContent.style.backgroundImage =`url(${foto01})`
  }
  catch (error) {
    console.log(error);
  }

}




/*********************************************** */




//let currentSong = arrSong[songNum].src
//audio.src = currentSong;

// audio.addEventListener('loadeddata', function() {
//   timeDuration.innerHTML = `${timeFromSec(audio.duration)}`;
//   titleSinger.innerHTML = `${arrSong[songNum].group}`;
//   titleSong.innerHTML = `${arrSong[songNum].name}`;
//   wrapper.style.backgroundImage =`url(${arrSong[songNum].cover})`
//   playerContainer.style.backgroundImage =`url(${arrSong[songNum].cover})`

// });





//***Для кнопок*************************************
// Коды HTML

// &#9658;	►	Треугольная стрелка вправо
// &#9668;	◄	Треугольная стрелка влево

// ‖
// &#8214;
// \2016
// U+2016
// &Vert;
// Двойная вертикальная линия

// ⊲
// &#8882;
// \22B2
// U+22B2
// &vltri;
// Нормальная подгруппа
// ⊳
// &#8883;
// \22B3
// U+22B3
// &vrtri;
// Содержит как нормальную подгруппу


