const visibleOnPage = 6;
const numberOfPages = Math.ceil(PRODUCTS.length / visibleOnPage);

let currentPage = 0;
let sortBy = "best-match";

const setup = () => {
  setupPagination();
  setupSort();
  renderProducts();
};

const setupPagination = () => {
  const paginationUL = document.querySelector(".pagination");
  for (let page = 0; page < numberOfPages; page++) {
    const li = document.createElement("li");
    li.className = "page";
    li.innerText = page + 1;
    li.addEventListener("click", () => {
      currentPage = page;
      renderProducts();
    });
    paginationUL.appendChild(li);
  }
};

const setupSort = () => {
  const sortSelect = document.querySelector("#sorting");
  sortSelect.addEventListener("change", () => {
    sortBy = sortSelect.value;
    renderProducts();
  });
};

const renderProducts = () => {
  let sortedProducts = PRODUCTS;
  switch (sortBy) {
    case "low-to-high":
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "high-to-low":
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  const beginProductIndex = currentPage * visibleOnPage;
  const endProductIndex = beginProductIndex + visibleOnPage;
  const currentPageProducts = sortedProducts.slice(
    beginProductIndex,
    endProductIndex
  );

  const productsContainer = document.querySelector(".products");
  const productTemplate = productsContainer.querySelector(".template");

  const oldProducts = productsContainer.querySelectorAll(".rendered");
  oldProducts.forEach((node) => node.remove());

  for (const product of currentPageProducts) {
    let productDiv = productTemplate.cloneNode(true);
    productDiv.classList.remove("template");
    productDiv.classList.add("rendered");
    const productName = productDiv.querySelector(".product-name");
    productName.innerText = product.name;
    const productType = productDiv.querySelector(".product-type");
    productType.innerText = product.type;
    const productPrice = productDiv.querySelector(".product-price");
    productPrice.innerText = `$${product.price}`;
    // TODO: alt, h4 for name, images, a link to pdp
    productsContainer.appendChild(productDiv);
  }
};

setup();
