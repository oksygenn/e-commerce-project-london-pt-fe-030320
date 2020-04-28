const addToCartBtn = document.querySelector(".pdp-add-to-cart-button");

addToCartBtn.addEventListener("click", () => {
  if (!addToCartBtn.classList.contains("green-button")) {
    addToCartBtn.classList.add("green-button");
    addToCartBtn.innerText = "Go to checkout";
    addToCart();
  }
});

setupArrowButtons();
setupCarousel();
