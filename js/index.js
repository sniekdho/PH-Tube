const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  // 1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. convert data to json
    .then((response) => response.json())

    // 3. send to displayCategories
    .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideo = (id) => {
  showLoader();
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

const loadVideoDetails = (videoID) => {
  console.log(videoID);
  const videoUrl = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;

  fetch(videoUrl)
    .then((response) => response.json())
    .then((data) => displayVideoDetails(data.video));
};

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
    hideLoader();
    return;
  }

  videos.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
    <div class="card bg-base-100">

            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${
                  video.thumbnail
                }" alt="Image load soon" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black rounded px-2">3hrs 56 min ago</span>
            </figure>

            <div class="flex gap-3 px-0 py-3">

                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${
                              video["authors"][0]["profile_picture"]
                            }" />
                        </div>
                    </div>
                </div>

                <div class="intro">
                    <h1 class="text-sm font-semibold">${video.title}</h1>
                    <p class="text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name}
                    ${
                      video.authors[0].verified === true
                        ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></img>`
                        : ``
                    }
                     </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>

            </div>

            <button onclick="loadVideoDetails('${video.video_id}')"
             class="btn btn-block">Show Details</button>

        </div>
    `;

    videoContainer.appendChild(videoDiv);
  });
  hideLoader();
};

const displayVideoDetails = (videoDetails) => {
  document.getElementById("video_details").showModal();

  const videoDetailsContainer = document.getElementById(
    "video-details-container"
  );

  videoDetailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">

  <figure>
    <img
      src="${videoDetails.thumbnail}"
      alt="Images will appear soon" />
  </figure>

  <div class="card-body">
    <h2 class="card-title">${videoDetails.title}</h2>
    <p>${videoDetails.authors[0].profile_name}</p>
    <small>${videoDetails.description}</small>
  </div>

</div>
  `;
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});

loadCategories();
