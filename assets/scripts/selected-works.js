
// used multiple times, so save a completely insignificant amount of time by getting them only once
const leftArrowContainerNode = document.querySelector('.left-arrow-container');
const rightArrowContainerNode = document.querySelector('.right-arrow-container');
const curImgNode = document.querySelector('#cur-img');
const imgContainerNode = document.querySelector('#img-container');

const slideInfo = {
    images: [],
    curIdx: 0,
    cached: 0,
    atStart: function() {
        return this.curIdx == 0;
    },
    atEnd: function() {
        return this.curIdx == this.images.length - 1 || this.images.length < 2;
    },
    next: function() {
        this.curIdx = (this.curIdx == this.images.length - 1) ? this.curIdx : this.curIdx + 1;
    },
    previous: function() {
        this.curIdx = (this.curIdx == 0) ? 0 : this.curIdx - 1;
    }
};

(async function fetchSlideInfo() {

    const resp = await fetch('./images.json');
    const json = await resp.json();
    slideInfo.images = json.images;

    loadSlide();
})();

function lazyLoad() {

    const imgsToPreload = Math.min(slideInfo.images.length, slideInfo.curIdx + 3);
    for (let i = slideInfo.cached; i < imgsToPreload; i++) {

        const img = new Image();
        img.src = `./assets/images/${slideInfo.images[i].src}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.classList.add('hidden');
        imgContainerNode.appendChild(img);
        slideInfo.cached = i;
    }
}

function loadSlide() {

    curImgNode.src =
        `./assets/images/${slideInfo.images[slideInfo.curIdx].src}`;

    lazyLoad();
}

rightArrowContainerNode.addEventListener('click', () => {
    slideInfo.next();
    loadSlide();
    controlArrowVisibility();

});

leftArrowContainerNode.addEventListener('click', () => {
    slideInfo.previous();
    loadSlide();
    controlArrowVisibility();
});

function controlArrowVisibility() {

    if (slideInfo.atEnd()) {
        rightArrowContainerNode.classList.add('invisible');
    } else {
        rightArrowContainerNode.classList.remove('invisible');
    }
    if (slideInfo.atStart()) {
        leftArrowContainerNode.classList.add('invisible');
    } else {
        leftArrowContainerNode.classList.remove('invisible');
    }
}
