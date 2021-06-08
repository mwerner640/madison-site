
// used multiple times, so save a completely insignificant amount of time by getting them only once
const leftArrowContainerNode = document.querySelector('.arrow-left');
const rightArrowContainerNode = document.querySelector('.arrow-right');
const imgContainerNode = document.querySelector('#img-container');
const curImgNode = imgContainerNode.querySelector('#cur-img');
const curImgInfoNode = document.querySelector('#cur-img-info');

const slideInfo = {
    images: [],
    curIdx: 0,
    cached: 0,
    get curImg() {
        return this.images[this.curIdx];
    },
    atStart: function() {
        return this.curIdx == 0;
    },
    atEnd: function() {
        return this.curIdx == this.images.length - 1 || this.images.length < 2;
    },
    next: function() {
        this.curIdx = (this.atEnd()) ? this.curIdx : this.curIdx + 1;
    },
    previous: function() {
        this.curIdx = (this.atStart()) ? 0 : this.curIdx - 1;
    }
};

(async function fetchSlideInfo() {

    const resp = await fetch('./images.json');
    const json = await resp.json();
    slideInfo.images = json.images;

    loadSlide();
})();

function lazyLoad() {

    const numberOfImagesToPreload = 3; // magic number

    // math...
    const imgsToPreload = Math.min(slideInfo.images.length, slideInfo.curIdx + numberOfImagesToPreload);
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
        `./assets/images/${slideInfo.curImg.src}`;

    const {title, year, dimensions, medium} = slideInfo.curImg;

    curImgInfoNode.textContent = `${title} (${year}) ${dimensions}: ${medium}`;

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
