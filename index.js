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

// элементы
const galleryContainer = document.querySelector(".js-gallery");
const lightboxCloseBtn = document.querySelector(
  '[data-action="close-lightbox"]'
);
const lightbox = document.querySelector(".js-lightbox");
const lightboxImg = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");

// создание разметки
function createImageCardsMarkup(images) {
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

// рендер разметки
const galleryContainerMarkup = createImageCardsMarkup(images);
galleryContainer.insertAdjacentHTML("beforeend", galleryContainerMarkup);

galleryContainer.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  // определение области клика
  const isGalleryImageEl = event.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  }
  // открытиe модального окна, подмена значения атрибута src
  lightbox.classList.add("is-open");
  lightboxImg.src = event.target.dataset.source;

  window.addEventListener("keydown", onCloseLightboxByEsc);
}

lightboxCloseBtn.addEventListener("click", onCloseLightbox);

function onCloseLightbox() {
  // закрытие модального окна
  const openedLightbox = document.querySelector(".lightbox.is-open");
  if (openedLightbox) {
    openedLightbox.classList.remove("is-open");
  }
  lightboxImg.src = "";
  window.removeEventListener("keydown", onCloseLightboxByEsc);
}

function onCloseLightboxByEsc(event) {
  if (event.code === "Escape") {
    onCloseLightbox();
  }
}

overlay.addEventListener("click", onOverlayClick);

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseLightbox();
  }
}
