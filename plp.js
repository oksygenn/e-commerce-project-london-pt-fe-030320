const visibleOnPage = 6;
const numberOfPages = Math.ceil(PRODUCTS.length / visibleOnPage);

let currentPage = 0;

const setup = () => {
  setupPagination();
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

const renderProducts = () => {
  const sortedProducts = PRODUCTS;
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
    productPrice.innerText = product.price;

    productsContainer.appendChild(productDiv);
  }
};

setup();
