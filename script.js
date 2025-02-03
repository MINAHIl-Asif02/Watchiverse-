let searchForm=document.querySelector('.search-form');
document.querySelector('.search-icon').onclick = () => {
    searchForm.classList.toggle('active');
}
function search() {
  // Get the search box input
  const searchInput = document.getElementById("search-box").value.toLowerCase();

  // Get all the product boxes
  const products = document.querySelectorAll(".product .box, .featured .box, .new .box");

  // Loop through the products and display only the ones that match the search
  products.forEach((product) => {
    const productTitle = product.querySelector(".box-title").textContent.toLowerCase();

    // Check if the product title includes the search input
    if (productTitle.includes(searchInput)) {
      product.style.display = "block"; // Show matching products
    } else {
      product.style.display = "none"; // Hide non-matching products
    }
  });
}




