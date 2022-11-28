function inputComboChange(target) {
    const search = document.querySelector(".search");
    const images = document.querySelector(".images");

    if (target.value === "") {
        search.classList.add("display-selector");
        images.classList.add("display-selector");
    }
    else {
        search.classList.remove("display-selector");
        cleanSearchOptions()
        loadSearchOptions(target.value)
    }
}

function searchButtonCheck() {
    const searchCombo = document.getElementById("search-combo-items");
    const searchNumber = document.getElementById("search-number-items")
    const searchButton = document.getElementById("search-button")

    if (searchCombo.value !== "" && searchNumber.value > 0) {
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

    images.classList.remove("display-selector");
    removeImages()
    openSpinner()
    await eel.loadImages(inputCombo.value, searchCombo.value, searchNumber.value)((images) => {
        closeSpinner()
        showImages(images)
    })
}

function removeImages() {
    const carroussel = document.getElementById("images-carroussel-galery")

    while (carroussel.firstChild) {
        carroussel.removeChild(carroussel.lastChild);
    }
}

function openSpinner() {
    const carroussel = document.getElementById("images-carroussel-galery")
    const controls = document.querySelectorAll(".images-carroussel-arrow")

    carroussel.classList.add("justify-center")
    carroussel.innerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"
    controls.forEach(control => {
        control.classList.add("display-selector")
    });
}

function closeSpinner() {
    const carroussel = document.getElementById("images-carroussel-galery")
    const controls = document.querySelectorAll(".images-carroussel-arrow")

    carroussel.classList.remove("justify-center")
    carroussel.innerHTML = ""
    controls.forEach(control => {
        control.classList.remove("display-selector")
    });
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

function switchScreen() {
    const main = document.getElementById("main")
    const log = document.getElementById("log")
    const switchScreen = document.getElementById("switch-screen")

    if (main.classList.contains("display-selector") && !log.classList.contains("display-selector")) {
        main.classList.remove("display-selector")
        log.classList.add("display-selector")
        switchScreen.innerHTML = "<i class='fa-solid fa-database'></i>"
    }
    else if (!main.classList.contains("display-selector") && log.classList.contains("display-selector")) {
        main.classList.add("display-selector")
        log.classList.remove("display-selector")
        switchScreen.innerHTML = "<i class='fa-solid fa-house'></i>"
        refreshLogs()
    }
}

function refreshLogs() {
    cleanLogs()
    loadLogs()
}

function cleanLogs() {
    const tableBody = document.getElementById("log-table-body")

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

function loadLogs() {
    eel.getLogs()((logs) => {
        const empty = document.getElementById("empty-log")
        const table = document.getElementById("log-table")
        const tableBody = document.getElementById("log-table-body")

        if (logs.length === 0) {
            empty.classList.remove("display-selector")
            table.classList.add("display-selector")
            return
        }
        else {
            empty.classList.add("display-selector")
            table.classList.remove("display-selector")

            logs.forEach(log => {
                var row = document.createElement("tr")
                row.classList.add("log-table-row")

                var cellDate = document.createElement("td")
                cellDate.innerHTML = log[0]
                var cellHour = document.createElement("td")
                cellHour.innerHTML = log[1]
                var cellInput = document.createElement("td")
                cellInput.innerHTML = log[2]
                var cellQuery = document.createElement("td")
                cellQuery.innerHTML = log[3]
                var cellNumber = document.createElement("td")
                cellNumber.innerHTML = log[4]

                row.appendChild(cellDate)
                row.appendChild(cellHour)
                row.appendChild(cellInput)
                row.appendChild(cellQuery)
                row.appendChild(cellNumber)
                tableBody.appendChild(row)
            })
        }
    })
}

function downloadLogs() {
    eel.downloadLogs()((fileInfo) => {
        console.log(fileInfo[0])
        download(fileInfo)
    })
}

function download(fileInfo) {
    var element = document.createElement("a");
    element.setAttribute("href", fileInfo[0]);
    element.setAttribute("download", fileInfo[1]);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

window.addEventListener("load", () => {
    loadInputOptions()
});

