
const accessKey = 'AgIOi8YzpBhcLPxcfuRxOgz8rB0kBz01guzjO1JH2Kk'
const Authentication = `https://api.unsplash.com/photos/?client_id=${accessKey}`

const select = document.querySelector('.header-select');

let startFoto = false;
let numPage = 1
let perPage = 24

let searchDefolt = 'strange'
let startUrl = `https://api.unsplash.com/search/photos?query=${searchDefolt}&per_page=${perPage}&page=${numPage}&orientation=landscape&client_id=${accessKey}`


let flag = true

const input = document.querySelector('.header-input')
const form = document.querySelector('.header-form')
const main = document.querySelector('.main')


if (!startFoto) {
  startFoto = true;

  start();

 
  getFoto(startUrl)
  
}
else {
  console.log(`startFoto = ${startFoto}`)

}



window.addEventListener('DOMContentLoaded', () => {
  let spinner = Array.from(document.querySelectorAll('.spinner'))
  let arrCoverContent = Array.from(document.querySelectorAll('.cover-content'))


  for (let i = 0; i < arrCoverContent.length; i++) {
    arrCoverContent[i].addEventListener('load', () => {
      spinner[i].style.display = 'none';
    });
  }


  for (let i = 0; i < arrCoverContent.length; i++) {
    spinner[i].style.display = 'block';
  }

});


form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  let search = input.value
  let lang = select.value
  console.log(`lang = ${lang}`)
  console.log(`Поиск = ${search}`)
  let searchRequest = `https://api.unsplash.com/search/photos?query=${search}&per_page=${perPage}&page=${numPage}&lang=${lang}&client_id=${accessKey}`
  
  getFoto(searchRequest)
  
  inputText.focus();
})



const inputText = document.querySelector('.header-input__text');
const clearButton = document.querySelector('.header-input__clear');


inputText.addEventListener('input', () => {
  clearButton.style.visibility = inputText.value ? 'visible' : 'hidden';
  clearButton.style.opacity = inputText.value ? '1' : '0';
  inputText.focus();
});


clearButton.addEventListener('click', () => {
  inputText.value = '';
  clearButton.style.visibility = 'hidden';
  clearButton.style.opacity = '0'
  inputText.focus();
});



function start() {

  for (let index = 0; index < perPage; index++) {
    main.innerHTML +=
  `
<div class="cover">
  <div class="cover-inner cover-inner--ratio">
    <div class="cover-content">

    </div>
    <div class="spinner"></div>
  </div>
</div>
`
  }
}


async function getFoto(url, arrCoverContent) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Version': 'v1'
      }
    });
    const data = await response.json();
    console.log(data)


    if (data.results.length < perPage) {
      main.innerHTML = '';

      for (let index = 0; index < data.results.length; index++) {
        main.innerHTML +=
      `
    <div class="cover">
      <div class="cover-inner cover-inner--ratio">
        <div class="cover-content">

        </div>
      </div>
    </div>
    `
      }

      flag = false
    } 
    else if (!flag) {
      flag = true

      main.innerHTML = '';

      for (let index = 0; index < perPage; index++) {
        main.innerHTML +=
      `
    <div class="cover">
      <div class="cover-inner cover-inner--ratio">
        <div class="cover-content">

        </div>
      </div>
    </div>
    `
      }
    }


    let arrCoverContent = Array.from(document.querySelectorAll('.cover-content'))

    for (let i = 0; i < arrCoverContent.length; i++) {
      let fotoUrl = data.results[i].urls.full;
      arrCoverContent[i].style.backgroundImage =`url(${fotoUrl})`
    }


  }
  catch (error) {
    console.log(error);
  }

}

