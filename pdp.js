const addToCartBtn = document.querySelector(".pdp-add-to-cart-button");
// const detailsBtn = document.querySelector(".pdp-details-button");

addToCartBtn.addEventListener("click", () => {
  addToCartBtn.classList.add("green-button");
  addToCartBtn.innerText = "Go to checkout";
});

// detailsBtn.addEventListener("click", () => {
//   detailsBtn;
// });

setupArrowButtons();
