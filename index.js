const accessKey = "1BqTjNaSbY90R0OAj672aAW8ZTwPSLJvJzFgqafzO1c";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const searchResult = document.querySelector(".Search-results");
const showMoreBtn = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("Search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper); // Fixed this line
    });
    page++;
    if (page > 1) {
        showMoreBtn.style.display = 'block';
    }
}

formEl.addEventListener("submit", async (event) => { // Added "async" here
    event.preventDefault();
    page = 1;
    await searchImages(); // Added "await" here
});

showMoreBtn.addEventListener("click", async () => { // Added "async" here
    await searchImages(); // Added "await" here
});