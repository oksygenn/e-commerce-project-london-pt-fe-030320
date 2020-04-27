const visibleOnPage = 6;
let colorFilters = [];
let categoryFilters = [];
let currentPage = 0;
let sortBy = "best-match";
let minPrice = 0;
let maxPrice = 1000;

const setup = () => {
  setupSort();
  setupArrowButtons();
  setupColorFilter();
  setupCategoryFilter();
  setupSliders();
  renderProducts();
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
      currentPage = 0;
      renderProducts();
    });
  });
};

const setupCategoryFilter = () => {
  const categoryInputs = document.querySelectorAll(".category-filter input");
  categoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        categoryFilters.push(input.id);
      } else {
        const index = categoryFilters.indexOf(input.id);
        categoryFilters.splice(index, 1);
      }
      currentPage = 0;
      renderProducts();
    });
  });
};

const setupSliders = () => {
  const sliderMin = document.querySelector(".slider-min");
  const sliderMax = document.querySelector(".slider-max");
  const sliderMinText = document.querySelector(".slider-min-text");
  const sliderMaxText = document.querySelector(".slider-max-text");

  const minValue = sliderMin.value;
  sliderMinText.innerHTML = `$${minValue}`;
  const maxValue = sliderMax.value;
  sliderMaxText.innerHTML = `$${maxValue}`;

  sliderMin.addEventListener("input", () => {
    const minValue = sliderMin.value;
    const maxValue = sliderMax.value;
    if (minValue >= maxValue - 100) {
      sliderMin.value = maxValue - 100;
      return;
    }
    sliderMinText.innerHTML = `$${minValue}`;
    minPrice = minValue;
    renderProducts();
  });
  sliderMax.addEventListener("input", () => {
    const value = sliderMax.value;
    sliderMaxText.innerHTML = `$${value}`;
    maxPrice = value;
    renderProducts();
  });
};

const renderProducts = () => {
  // copies products, sorts if needed
  // finds 6 products to render for current page
  // renders 6 products

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

  if (colorFilters.length > 0) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.colors.some((color) => colorFilters.includes(color));
    });
  }

  if (categoryFilters.length > 0) {
    sortedProducts = sortedProducts.filter((product) => {
      return categoryFilters.includes(product.type);
    });
  }

  sortedProducts = sortedProducts.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

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
    const productDiv = createProductDiv(productTemplate, product);
    productsContainer.appendChild(productDiv);
  }

  renderPagination(sortedProducts);
};

const createProductDiv = (template, product) => {
  let productDiv = template.cloneNode(true);
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
  const productCart = productDiv.querySelector(".product-add-to-cart");
  productCart.addEventListener("click", () => {
    addToCart(product);
  });
  // TODO: alt, h4 for name, a link to pdp
  return productDiv;
};

const renderPagination = (products) => {
  const numberOfPages = Math.ceil(products.length / visibleOnPage);
  const paginationUL = document.querySelector(".pagination");
  paginationUL.querySelectorAll("li").forEach((li) => li.remove());

  for (let page = 0; page < numberOfPages; page++) {
    const li = document.createElement("li");
    li.innerText = page + 1;

    li.className = "page";
    if (currentPage === page) {
      li.classList.add("page-active");
    } else {
      li.addEventListener("click", () => {
        currentPage = page;
        renderProducts();
      });
    }
    paginationUL.appendChild(li);
  }
};

setup();
