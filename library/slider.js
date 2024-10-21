
const BTN_LEFT = document.querySelector(".slider-btn--left");
const BTN_RIGHT = document.querySelector(".slider-btn--right");
const sliderInner = document.querySelector(".slider-inner");

// const imgLeft = document.querySelector(".card-active");
let imgArr = document.getElementsByClassName('slider-inner_item');
console.log(imgArr)

let index = 0

BTN_RIGHT.addEventListener('click', () => {
  BTN_RIGHT.classList.add('slider-btn--color')
  BTN_LEFT.classList.remove('slider-btn--color')
      
    for (let item of imgArr) {
      if (index === 0) {
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp01');
        console.log(item.classList)
        BTN_LEFT.classList.remove('slider-btn--disabled')
      }
       if (index === 1) {
        
        item.classList.add('card-exp02');
         console.log(item.classList)
         console.log(item.classList['2'])
         item.classList.remove(item.classList['2'])
         console.log(item.classList)
      }
      if (index === 2) {
        
        item.classList.add('card-exp03');
         console.log(item.classList)
         console.log(item.classList['2'])
         item.classList.remove(item.classList['2'])
         console.log(item.classList)
      }
      if (index === 3) {
        
        item.classList.add('card-exp04');
        console.log(item.classList)
        console.log(item.classList['2'])
        item.classList.remove(item.classList['2'])
        console.log(item.classList)
         
        BTN_RIGHT.classList.remove('slider-btn--color')
        BTN_RIGHT.classList.add('slider-btn--disabled')
      }
    }
  
  if (index < 4) {
    // console.log(`index=${++index}`)
    ++index
  }
    
  console.log(`index=${index}`)
  // index++
  // console.log(event.target)
  
  /*********************************************/
  sliderPgItems.forEach(item => {
      item.classList.remove('slider-pg_item--active');
    });
  
  sliderPgItems[index].classList.add('slider-pg_item--active');
  
  /********************************************/
  
})

BTN_LEFT.addEventListener('click', () => {
  BTN_RIGHT.classList.remove('slider-btn--color')
  BTN_LEFT.classList.add('slider-btn--color')
  // imgLeft.classList.toggle('card-exp')
  
  for (let item of imgArr) {
      console.log(item.classList['2'])
      
    // if (item.classList['2'] !== 'card-exp00'){
    
      if (item.classList['2'] === 'card-exp00'){
        BTN_LEFT.classList.add('slider-btn--disabled')
      }
      if(item.classList['2'] === 'card-exp01') {
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp00');
        
        BTN_LEFT.classList.remove('slider-btn--color')
        BTN_LEFT.classList.add('slider-btn--disabled')
      }
      if(item.classList['2'] === 'card-exp02') {
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp01');
      }
      if(item.classList['2'] === 'card-exp03') {
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp02');
      }
      if(item.classList['2'] === 'card-exp04') {
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp03');
        
        BTN_RIGHT.classList.remove('slider-btn--disabled')
      }
    // }
      // item.classList.toggle('card-exp02');
   }
  if(index > 0) {
    // console.log(`index=${--index}`)
    --index
  }
   console.log(`index=${index}`)
  
  /*********************************************/
  sliderPgItems.forEach(item => {
      item.classList.remove('slider-pg_item--active');
    });
  
  sliderPgItems[index].classList.add('slider-pg_item--active');
  
  /********************************************/
  
})

/*********************************************************/

const sliderPg = document.querySelector(".slider-pg");
const sliderPgItems = document.querySelectorAll('.slider-pg_item');

const sliderPgContainersArr = document.querySelectorAll('.slider-pg_container'); //для получения индекса кнопки



sliderPg.addEventListener('click', function(event) {
  const clickedSliderPgContainer = event.target.closest('.slider-pg_container');

  if (clickedSliderPgContainer) {
    const clickedSliderPgItem = clickedSliderPgContainer.querySelector('.slider-pg_item');

    sliderPgItems.forEach(item => {
      item.classList.remove('slider-pg_item--active');
    });

    clickedSliderPgItem.classList.add('slider-pg_item--active');

    // console.log(Array.from(sliderPgContainersArr).indexOf(clickedSliderPgContainer)); // получение индекса кнопки
    index = Array.from(sliderPgContainersArr).indexOf(clickedSliderPgContainer);
    console.log(index)
    
    for (let item of imgArr) {
      if (index === 0) {
        BTN_RIGHT.classList.remove('slider-btn--disabled')
        BTN_LEFT.classList.remove('slider-btn--color')
        BTN_LEFT.classList.add('slider-btn--disabled')
        
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp00');
        console.log(item.classList)
      }
       if (index === 1) {
         item.classList.remove(item.classList['2'])
         item.classList.add('card-exp01');
         
         BTN_LEFT.classList.remove('slider-btn--disabled')
         BTN_RIGHT.classList.remove('slider-btn--disabled')
      }
      if (index === 2) {
         item.classList.remove(item.classList['2'])
         item.classList.add('card-exp02');
        
         BTN_LEFT.classList.remove('slider-btn--disabled')
         BTN_RIGHT.classList.remove('slider-btn--disabled')
      }
      if (index === 3) {
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp03');
        
        BTN_LEFT.classList.remove('slider-btn--disabled')
        BTN_RIGHT.classList.remove('slider-btn--disabled')
      }
      if (index === 4) {
        BTN_LEFT.classList.remove('slider-btn--disabled')
        
        BTN_RIGHT.classList.remove('slider-btn--color')
        BTN_RIGHT.classList.add('slider-btn--disabled')
        item.classList.remove(item.classList['2'])
        item.classList.add('card-exp04');
      }
    }
    
        
  }
});

