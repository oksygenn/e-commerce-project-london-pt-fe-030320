const header = `
    <nav>
          <ul class="header-left">
            <li><img class="logo" src="images/Logo.png" alt="logo" /></li>
            <li><a href="main_page.html" id="home">HOME</a></li>
            <li><a href="plp.html" id="shop">SHOP</a></li>
            <li><a href="#" id="magazine">Magazine</a></li>
          </ul>
    </nav>
      
    <div>
        <ul class="header-right">
            <li class="cart-image">
              <img
                class="cart-button"
                src="images/cart_button.png"
                alt="cart logo"
              />
              <span id="cartQuantity" class="hidden"></span>
            </li>
            <li><a id="login" href="#">Login</a></li>
        </ul>
    </div>`;

const footer = `
<div class="footer-nav">
          <nav>
            <ul>
              <li>About Us</li>
              <li>How can we help</li>
              <li>Shop by room</li>
              <li>Shop by style</li>
            </ul>
          </nav>
        </div>

        <div class="footer-icons">
          <ul>
            <li class="social-media instagram">
              <a href="https://www.instagram.com/" target="_blank"
                ><img src="images/instagram(1).png" alt="instagram logo"
              /></a>
            </li>
            <li class="social-media facebook">
              <a href="https://www.facebook.com/" target="blank"
                ><img src="images/facebook_logo.png" alt="facebook logo"
              /></a>
            </li>
            <li class="social-media twitter">
              <a href="https://twitter.com/" target="_blank"
                ><img src="images/twitter.png" alt="twitter logo"
              /></a>
            </li>
          </ul>
</div>`;

const commonSetup = () => {
  document.querySelector("header").innerHTML = header;
  document.querySelector("footer").innerHTML = footer;
  renderCart();
};

const setupArrowButtons = () => {
  let arrowDivs = document.querySelectorAll(".expandButton");
  arrowDivs.forEach((arrowDiv) => {
    arrowDiv.addEventListener("click", () => {
      const parent = arrowDiv.parentNode;
      const optionsDiv = parent.querySelector(".expandable");
      optionsDiv.classList.toggle("collapsed");
    });
  });
};

// local storage
const localStorage = window.localStorage;

const addToCart = () => {
  let itemsInCart = parseInt(localStorage.getItem("cart") || 0);
  localStorage.setItem("cart", itemsInCart + 1);
  renderCart();
};

const renderCart = () => {
  const itemsInCart = parseInt(localStorage.getItem("cart") || 0);
  if (itemsInCart < 1) return;
  const cartDiv = document.querySelector("#cartQuantity");
  cartDiv.classList.remove("hidden");
  cartDiv.innerHTML = itemsInCart;
};

let currentSlide = 0;
const slideCount = 4;

const slideshow = document.querySelector(".slideshow");
const slides = slideshow.querySelectorAll(".slide");

const setupCarousel = () => {
  const slideNext = slideshow.querySelectorAll(".slide-next");
  const slidePrevious = slideshow.querySelector(".slide-previous");
  slideNext.forEach((el) => el.addEventListener("click", nextSlide));
  slidePrevious.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slideCount - 1;
    changeSlide();
  });
};

const nextSlide = () => {
  currentSlide++;
  if (currentSlide === slideCount) currentSlide = 0;
  changeSlide();
};

const changeSlide = () => {
  slides.forEach((div, index) => {
    if (index === currentSlide) {
      div.classList.remove("slide-disappear", "slide-hidden");
      div.classList.add("slide-visible");
    } else {
      div.classList.add("slide-hidden");
      setTimeout(() => div.classList.remove("slide-disappear"), 1000);
      div.classList.remove("slide-visible");
    }
  });
};

commonSetup();
