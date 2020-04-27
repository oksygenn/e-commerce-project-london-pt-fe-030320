const visibleOnPage = 6;
let colorFilters = [];
let categoryFilters = [];
let currentPage = 0;
let sortBy = "best-match";

const setup = () => {
  setupSort();
  setupArrowButtons();
  setupColorFilter();
  setupCategoryFilter();
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

  renderPagination(sortedProducts);
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

function getVals() {
  // Get slider values
  var parent = this.parentNode;
  var slides = parent.getElementsByTagName("input");
  var slide1 = parseFloat(slides[0].value);
  var slide2 = parseFloat(slides[1].value);
  // Neither slider will clip the other, so make sure we determine which is larger
  if (slide1 > slide2) {
    var tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;
  }

  var displayElement = parent.getElementsByClassName("rangeValues")[0];
  displayElement.innerHTML = slide1 + " - " + slide2;
}

window.onload = function () {
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
  for (var x = 0; x < sliderSections.length; x++) {
    var sliders = sliderSections[x].getElementsByTagName("input");
    for (var y = 0; y < sliders.length; y++) {
      if (sliders[y].type === "range") {
        sliders[y].oninput = getVals;
        // Manually trigger event first time to display values
        sliders[y].oninput();
      }
    }
  }
};
