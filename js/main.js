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