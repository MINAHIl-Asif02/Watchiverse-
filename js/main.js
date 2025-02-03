//
//

let nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (scrollY >= nav.offsetTop - 10) {
    nav.classList.add("scroll");
  }
  if (scrollY == 0) {
    nav.classList.remove("scroll");
  }
});

////
//

let shopIcon = document.querySelector(".more-icons .shop-icon");
let market = document.querySelector(".market");

shopIcon.addEventListener("click", () => {
  market.classList.add("show");
});
market.querySelector(".close-icon").addEventListener("click", () => {
  market.classList.remove("show");
});

let buyButtons = document.querySelectorAll(".buy-icon, .featured .my-btn");
buyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const imgSrc = btn.parentElement.querySelector("img").getAttribute("src");
    const name = btn.parentElement.querySelector(".box-title").textContent;
    const price = btn.parentElement.querySelector(".box-price").textContent;

    checkToAddAndManageOperations(imgSrc, name, price);
  });
});

function checkToAddAndManageOperations(imgSrc, name, price) {
  let exist = false;
  let allProduct = market.querySelectorAll(".my-product");
  allProduct.forEach((product) => {
    if (product.querySelector("h5").textContent == name) {
      exist = true;
      product.querySelector(".number").textContent++;
      return;
    }
  });
  if (!exist) {
    addProductToMarket(imgSrc, name, price);
    productControls();
  }
  calcTotal();
  itemsCount();
}

function addProductToMarket(imgSrc, name, price) {
  let myProducts = market.querySelector(".my-products");
  myProducts.innerHTML += `
    <div class="my-product">
      <div class="image me-3">
        <img src="${imgSrc}" alt="" />
      </div>
      <div class="content">
        <h5>${name}</h5>
        <span class="price mb-3">${price}</span>
        <div class="controls">
            <div class="minus me-3"><i class="fa-solid fa-minus"></i></div>
            <div class="number">1</div>
            <div class="plus ms-3"><i class="fa-solid fa-plus"></i></div>
            <span class="remove-product-icon ms-5">
              <i class="fa-solid fa-trash-can"></i>
            </span>
        </div>
      </div>
  </div>  
  `;
}

function productControls() {
  let minuses = market.querySelectorAll(".controls .minus");
  let pluses = market.querySelectorAll(".controls .plus");
  pluses.forEach((plus) => {
    plus.addEventListener("click", () => {
      if (plus.previousElementSibling.textContent == 0) {
        plus.previousElementSibling.previousElementSibling.classList.remove(
          "disabled"
        );
      }
      plus.previousElementSibling.textContent++;
      calcTotal();
      itemsCount();
    });
  });
  minuses.forEach((minus) => {
    minus.addEventListener("click", () => {
      if (minus.nextElementSibling.textContent == 1) {
        minus.nextElementSibling.textContent--;
        calcTotal();
        itemsCount();
        minus.classList.add("disabled");
      } else {
        minus.nextElementSibling.textContent--;
        calcTotal();
        itemsCount();
        minus.classList.remove("disabled");
      }
    });
  });
  market.querySelectorAll(".remove-product-icon").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.currentTarget.parentElement.parentElement.parentElement.remove();
      calcTotal();
      itemsCount();
    });
  });
}

function calcTotal() {
  let total = 0;
  let allProduct = market.querySelectorAll(".my-product");
  allProduct.forEach((product) => {
    let productPrice =
      +product.querySelector(".price").textContent.slice(1) *
      +product.querySelector(".number").textContent;
    total += productPrice;
  });
  market.querySelector(".info .total").innerHTML = `$${total}`;
}

function itemsCount() {
  let count = 0;
  let allProduct = market.querySelectorAll(".my-product");
  allProduct.forEach((product) => {
    count += +product.querySelector(".number").textContent;
  });
  market.querySelector(".info .product-count span").innerHTML = count;
  navShopIcon(count);
}

function navShopIcon(count) {
  document.querySelector("nav .shop-icon .count").innerHTML = count;
}
