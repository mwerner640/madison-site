
// used multiple times, so save a completely insignificant amount of time by getting them only once
const leftArrowContainerNode = document.querySelector('.arrow-left');
const rightArrowContainerNode = document.querySelector('.arrow-right');
const curImgNode = document.querySelector('#cur-img');
const curImgInfoNode = document.querySelector('#cur-img-info');

const slideInfo = {
    images: [],
    curIdx: 0,
    get curImg() {
        return this.images[this.curIdx];
    },
    predictedNext(from) {
        return (from + 1 >= this.images.length) ? 0 : from + 1;
    },
    predictedPrevious(from) {
        return (from - 1 < 0) ? this.images.length - 1 : from - 1;
    },
    next: function() {
        this.curIdx = this.predictedNext(this.curIdx);
    },
    previous: function() {
        this.curIdx = this.predictedPrevious(this.curIdx);
    }
};

(async function fetchSlideInfo() {

    const resp = await fetch('./images.json');
    const json = await resp.json();
    slideInfo.images = json.images;

    slideInfo.images.forEach(img => {
        img.lazyImg = new Image();
        img.cached = false;
    });

    loadSlide();
    slideInfo.curImg.lazyImg.onload = () => lazyLoad(1);

})();

/**
 * @param direction - whether to lazy load next images (positive num),
 * or previous images (negative num)
 */
function lazyLoad(direction) {

    const numberOfImagesToPreload = 4; // magic number
    let numberPreloadedSoFar = 0;

    let curLazyLoadIdx = 0;

    let loadNext = () => {

        curLazyLoadIdx = (direction > 0) ?
            slideInfo.predictedNext(curLazyLoadIdx) :
            slideInfo.predictedPrevious(curLazyLoadIdx);

        let img = addLazyImg(slideInfo.images[curLazyLoadIdx]);
        numberPreloadedSoFar++;

        if (numberPreloadedSoFar < numberOfImagesToPreload) {
            img.addEventListener('load', loadNext);
        }
    }

    loadNext();
}

/*
*/

function addLazyImg(imgInfo) {

    if (imgInfo.cached) return imgInfo.lazyImg;

    const img = imgInfo.lazyImg;
    img.src = `./assets/images/${imgInfo.src}`;
    imgInfo.cached = true;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.importance = 'low';
    img.classList.add('hidden');

    return imgInfo.lazyImg;
}

function loadSlide() {

    curImgNode.src =
        `./assets/images/${slideInfo.curImg.src}`;

    const {title, year, dimensions, medium} = slideInfo.curImg;
    const curImgInfo = `<div>${title} (${year})</div><div>${dimensions}</div><div>${medium}</div>`;
    curImgNode.alt = `${title} (${year}) ${dimensions}: ${medium}`;
    curImgInfoNode.innerHTML = curImgInfo;

    slideInfo.curImg.lazyImg = curImgNode;
    slideInfo.curImg.cached = true;
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
