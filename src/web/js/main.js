function inputComboChange(target) {
    const search = document.querySelector(".search");
    const images = document.querySelector(".images");

    if (target.value === "") {
        search.classList.add("dysplay-selector");
        images.classList.add("dysplay-selector");
    }
    else {
        search.classList.remove("dysplay-selector");
        cleanSearchOptions()
        loadSearchOptions(target.value)
    }
}

function searchComboChange(target) {
    const searchButton = document.getElementById("search-button")

    if (target.value === "") {
        searchButton.disabled = true;
        searchButton.classList.add("disabled");
    }
    else {
        searchButton.disabled = false;
        searchButton.classList.remove("disabled");
    }
}

function searchNumberChange(target) {
    const searchButton = document.getElementById("search-button")

    if (target.value > 0) {
        searchButton.disabled = false;
        searchButton.classList.remove("disabled");
    }
    else {
        searchButton.disabled = true;
        searchButton.classList.add("disabled");
    }
}

function uploadFile() {
    const selectedFile = document.getElementById("input-upload-file").files[0];

    (async () => {
        const fileContent = await selectedFile.text()
        const data = fileContent.replace(/(\r\n|\n|\r)/gm, "\n");
        console.log(data)
        eel.uploadFile(data, selectedFile.name)();
    })();
    location.reload()
}

function loadInputOptions() {
    const inputCombo = document.getElementById("input-combo-file");

    eel.inputComboOptions()((options) => {
        options.forEach(option => {
            var element = document.createElement("option");
            element.text = option.replace(".txt", "");
            element.value = option;
            inputCombo.options.add(element)
        });
    })
}

function loadSearchOptions(fileName) {
    const searchCombo = document.getElementById("search-combo-items");

    eel.searchComboOptions(fileName)((options) => {
        options.forEach(option => {
            var element = document.createElement("option");
            element.text = option;
            element.value = option;
            searchCombo.options.add(element)
        })
    })
}

function cleanSearchOptions() {
    const searchCombo = document.getElementById("search-combo-items");

    for (var i = 0; i < searchCombo.length; i++) {
        if (searchCombo.options[i].value !== "") {
            searchCombo.options.remove(i)
            i--
        }
    }
}

async function searchImages() {
    const images = document.querySelector(".images");
    const inputCombo = document.getElementById("input-combo-file");
    const searchCombo = document.getElementById("search-combo-items");
    const searchNumber = document.getElementById("search-number-items")

    images.classList.remove("dysplay-selector");
    await eel.loadImages(inputCombo.value, searchCombo.value, searchNumber.value)((images) => {
        showImages(images)
    })
}

function showImages(images) {
    const carroussel = document.getElementById("images-carroussel-galery")
    images.forEach((image, index) => {
        var element = document.createElement("img")
        element.src = image
        element.classList.add("item")
        if (index === 0) {
            element.classList.add("current-item")
        }
        carroussel.appendChild(element)
    });
}

window.addEventListener("load", () => {
    loadInputOptions()
});

