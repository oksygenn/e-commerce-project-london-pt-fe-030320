const header = `
    <nav>
          <ul class="header-left">
            <li><img class="logo hamburger" src="images/Logo.png" alt="logo" /></li>
            <li><a href="index.html" id="home">Home</a></li>
            <li><a href="plp.html" id="shop">Shop</a></li>
            <li><a href="#" id="magazine" class="magazine">Magazine</a></li>
          </ul>
    </nav>
    <nav class="mobile-only mobile-nav mobile-nav-hidden">
          <ul>
            <li><img class="logo-mobile" src="images/logo-white.png" alt="logo" /></li>
            <li><img class="cancel-button hamburger" src="images/cancel-button-white.png" alt="logo" /></li>
            <li class="mobile-nav-item"><a href="index.html" id="home">Home</a></li>
            <li class="mobile-nav-item"><a href="plp.html" id="shop">Shop</a></li>
            <li class="mobile-nav-item"><a href="#" id="magazine">Magazine</a></li>
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
  setupHamburger();
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

const setupHamburger = () => {
  const hamburgers = document.querySelectorAll(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  hamburgers.forEach((ham) =>
    ham.addEventListener("click", () => {
      mobileNav.classList.toggle("mobile-nav-hidden");
    })
  );
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

const setupCarousel = () => {
  const slideshow = document.querySelector(".slideshow");
  const slideNext = slideshow.querySelectorAll(".slide-next");
  const slidePrevious = slideshow.querySelector(".slide-previous");
  slideNext.forEach((el) => el.addEventListener("click", nextSlide));
  slidePrevious.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slideCount - 1;
    changeSlide();
  });

  const carouselButtons = slideshow.querySelectorAll(".carousel-button");
  slideshow.addEventListener("mouseenter", () => {
    carouselButtons.forEach((button) => button.classList.remove("hidden"));
  });
  slideshow.addEventListener("mouseleave", () => {
    carouselButtons.forEach((button) => button.classList.add("hidden"));
  });
};

const nextSlide = () => {
  currentSlide++;
  if (currentSlide === slideCount) currentSlide = 0;
  changeSlide();
};

const changeSlide = () => {
  const slideshow = document.querySelector(".slideshow");
  const slides = slideshow.querySelectorAll(".slide");
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
