
// used multiple times, so save a completely insignificant amount of time by getting them only once
const leftArrowContainerNode = document.querySelector('.arrow-left');
const rightArrowContainerNode = document.querySelector('.arrow-right');
const imgContainerNode = document.querySelector('#img-container');
const curImgNode = imgContainerNode.querySelector('#cur-img');
const curImgInfoNode = document.querySelector('#cur-img-info');

const slideInfo = {
    images: [], // note: besides for keys in images.json, there's a dynicamically added key, `cached`
    curIdx: 0,
    get curImg() {
        return this.images[this.curIdx];
    },
    next: function() {
        // tried with modulo operator, but basic math fails me
        this.curIdx++;
        this.curIdx = (this.curIdx >= this.images.length) ? 0 : this.curIdx;
    },
    previous: function() {
        this.curIdx--;
        this.curIdx = (this.curIdx < 0) ? this.images.length - 1 : this.curIdx;
    }
};

(async function fetchSlideInfo() {

    const resp = await fetch('./images.json');
    const json = await resp.json();
    slideInfo.images = json.images;

    loadSlide();
})();

/**
 * @param direction - whether to lazy load next images (positive num),
 * or previous images (negative num)
 */
function lazyLoad(direction = 1) {

    const savedIdx = slideInfo.curIdx;
    const numberOfImagesToPreload = 3; // magic number

    let i = 0;

    while (i < numberOfImagesToPreload) {
        addLazyImg(slideInfo.curImg);
        direction > 0 ? slideInfo.next() : slideInfo.previous();
        i++;
    }

    slideInfo.curIdx = savedIdx;
}

function addLazyImg(imgInfo) {

    if (imgInfo.cached) return;

    const img = new Image();
    img.src = `./assets/images/${imgInfo.src}`;
    console.log(img.src);
    imgInfo.cached = true;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.classList.add('hidden');
    imgContainerNode.appendChild(img);
}

function loadSlide() {

    curImgNode.src =
        `./assets/images/${slideInfo.curImg.src}`;

    const {title, year, dimensions, medium} = slideInfo.curImg;

    curImgInfoNode.textContent = `${title} (${year}) ${dimensions}: ${medium}`;
}

rightArrowContainerNode.addEventListener('click', () => {
    slideInfo.next();
    loadSlide();
    lazyLoad(1);
});

leftArrowContainerNode.addEventListener('click', () => {
    slideInfo.previous();
    loadSlide();
    lazyLoad(-1);
});
