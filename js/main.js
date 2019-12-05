const panel = document.getElementsByClassName('expansion-panel');
const sliderItems = document.querySelectorAll('.projects__slide');

let currentItem = 0;
let isEnabled = true;

for (let i = 0; i < panel.length; i++) {
  panel[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}

function hideItem(direction) {
  isEnabled = false;
  sliderItems[currentItem].classList.add(direction);
  sliderItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  sliderItems[currentItem].classList.add('next', direction);
  sliderItems[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function changeSliderItem(n) {
  currentItem = (n + sliderItems.length) % sliderItems.length;
}

function previousSliderItem(n) {
  hideItem('toright');
  changeSliderItem(n - 1);
  showItem('fromleft');
}

function nextSliderItem(n) {
  hideItem('toleft');
  changeSliderItem(n + 1);
  showItem('fromright');
}

document.querySelector('.projects__slider-controls.left').addEventListener('click', function () {
  if (isEnabled) {
    previousSliderItem(currentItem);
  }
});

document.querySelector('.projects__slider-controls.right').addEventListener('click', function () {
  if (isEnabled) {
    nextSliderItem(currentItem);
  }
});

const swipeDetect = (element) => {
  let area = element;
  let startX = 0;
  let startY = 0;
  let distanceX = 0;
  let distanceY = 0;

  let startTime = 0;
  let endTime = 0;

  let limit = 150;
  let limitationY = 100;
  let allowedTime = 300;

  area.addEventListener('touchstart', function(el) {
    let touchObj = el.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;

    startTime = new Date().getTime();
    
    el.preventDefault();
  });

  area.addEventListener('touchmove', function(el) {
    el.preventDefault();
  });

  area.addEventListener('touchend', function(el) {
    let touchObj = el.changedTouches[0];
    distanceX = touchObj.pageX - startX;
    distanceY = touchObj.pageY - startY;
    endTime = new Date().getTime() - startTime;

    if (endTime <= allowedTime) {
      if (Math.abs(distanceX) >= limit && Math.abs(distanceY) <= limitationY) {
        if (distanceX > 0) {
          if (isEnabled) {
            previousSliderItem(currentItem);
          } else {
            if (isEnabled) {
              nextSliderItem(currentItem);
            }
          }
        }
      }
    }
    
    el.preventDefault();
  });
}

let element = document.querySelector('.projects__slider');

swipeDetect(element);