const visibleOnPage = 6;
const numberOfPages = Math.ceil(PRODUCTS.length / visibleOnPage);

let currentPage = 0;
let sortBy = "best-match";
let colorFilters = [];

const setup = () => {
  setupPagination();
  setupSort();
  setupArrowButtons();
  setupColorFilter();
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

const setupColorFilter = () => {
  const filterInputs = document.querySelectorAll(".color-filter input");
  filterInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        colorFilters.push(input.id);
      } else {
        const index = colorFilters.indexOf(input.id);
        colorFilters.splice(index, 1);
      }
      renderProducts();
    });
  });
};

const renderProducts = () => {
  let sortedProducts = PRODUCTS.slice();
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
    const productImage = productDiv.querySelector(".product-image");
    productImage.src = product.image;
    // TODO: alt, h4 for name, a link to pdp
    productsContainer.appendChild(productDiv);
  }
};

setup();
