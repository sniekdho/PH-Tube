function loadCategories() {
  // 1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. convert data to json
    .then((response) => response.json())

    // 3. send to displayCategories
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");

  // loop through the array of object
  for (let cat of categories) {
    // create element
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

    // append the element
    categoryContainer.appendChild(categoryDiv);
  }
}

loadCategories();
