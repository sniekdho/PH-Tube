// categories
function loadCategories() {
  // 1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. convert data to json
    .then((response) => response.json())

    // 3. send to displayCategories
    .then((data) => displayCategories(data.categories));
}

// displayCategories ()
function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");

  // loop through the array of object
  for (let cat of categories) {
    // create element
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onClick="loadCategoryVideo(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

    // append the element
    categoryContainer.appendChild(categoryDiv);
  }
}

// videos
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

// displayVideos()
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
      <img src="./assets/Icon.png" alt="">
      <h1 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h1>
    </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
    <div class="card bg-base-100">

            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Image load soon" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black rounded px-2">3hrs 56 min ago</span>
            </figure>

            <div class="flex gap-3 px-0 py-3">

                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video["authors"][0]["profile_picture"]}" />
                        </div>
                    </div>
                </div>

                <div class="intro">
                    <h1 class="text-sm font-semibold">${video.title}</h1>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}<img class="w-5 h-5"
                            src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
        </div>
    `;

    videoContainer.appendChild(videoDiv);
  });
};

// categoryVideo
const loadCategoryVideo = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

// removeActiveClass()
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

loadCategories();
