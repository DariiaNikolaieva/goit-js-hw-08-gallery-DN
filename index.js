const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// объявление переменных
const galleryList = document.querySelector(".js-gallery");
// console.log(galleryList);
const lightbox = document.querySelector(".js-lightbox");
const overlay = document.querySelector(".lightbox__overlay");
const lightboxImg = document.querySelector(".lightbox__image");
const lightboxCloseBtn = document.querySelector(
  '[data-action="close-lightbox"]'
);

// слушатели событий
lightboxCloseBtn.addEventListener("click", onCloseLightbox);

// создание разметки
function onGalleryListMarkupCreate(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}
// console.log(onGalleryListMarkupCreate);

// рендер разметки
const galleryListMarkup = onGalleryListMarkupCreate(images);
galleryList.insertAdjacentHTML("beforeend", galleryListMarkup);

// копия массива изображений
const arrayOfImg = galleryList.querySelectorAll(".gallery__image");
const newArrayOfImg = [...arrayOfImg];
// console.log(arrayOfImg);
// console.log(newArrayOfImg);

// событие по клику на изображение
galleryList.addEventListener("click", onImgClick);

function onImgClick(event) {
  event.preventDefault(); /*отмена действия по умолчанию*/

  // определение области клика
  const isGalleryImageEl = event.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  }

  onOpenLightbox(event.target);
}

function onOpenLightbox(img) {
  // открытиe модального окна, подмена значения атрибута src, определение index
  lightbox.classList.add("is-open");
  lightboxImg.src = img.dataset.source;
  lightboxImg.dataset.index = newArrayOfImg.indexOf(img);

  // console.log(lightboxImg.dataset.index);

  window.addEventListener("keydown", onArrowBtnPress);
  window.addEventListener("keydown", onCloseLightboxByEsc);
}

function onCloseLightbox() {
  // закрытие модального окна
  const openedLightbox = document.querySelector(".lightbox.is-open");
  if (openedLightbox) {
    openedLightbox.classList.remove("is-open");
  }
  lightboxImg.src = "";

  window.removeEventListener("keydown", onCloseLightboxByEsc);
  window.removeEventListener("keydown", onArrowBtnPress);
}

function onImgThumb(move) {
  const currentImgIndex = Number(lightboxImg.dataset.index);
  // console.log(currentImgIndex);
  let nextImgIndex = currentImgIndex + move;
  // console.log(nextImgIndex);
  if (nextImgIndex < 0) {
    nextImgIndex = newArrayOfImg.length - 1;
  }

  if (nextImgIndex > newArrayOfImg.length - 1) {
    nextImgIndex = 0;
  }

  lightboxImg.dataset.index = nextImgIndex;
  // console.log(lightboxImg.dataset.index);
  lightboxImg.src = newArrayOfImg[nextImgIndex].dataset.source;
  // console.log(lightboxImg.src);
}

function onCloseLightboxByEsc(event) {
  if (event.code === "Escape") {
    onCloseLightbox();
  }
}

function onArrowBtnPress(event) {
  if (event.code === "ArrowRight") {
    onImgThumb(1);
  }
  if (event.code === "ArrowLeft") {
    onImgThumb(-1);
  }
}
