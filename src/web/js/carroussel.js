const controls = document.querySelectorAll(".images-carroussel-arrow");
let currentItem = 0;

controls.forEach((control) => {
    control.addEventListener("click", (e) => {
        const items = document.querySelectorAll(".item");
        const maxItems = items.length;

        isLeft = e.target.classList.contains("arrow-left");

        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        if (currentItem >= maxItems) {
            currentItem = 0;
        }

        if (currentItem < 0) {
            currentItem = maxItems - 1;
        }



        items.forEach((item) => item.classList.remove("current-item"));

        items[currentItem].scrollIntoView({
            behavior: "smooth",
            inline: "center"
        });

        items[currentItem].classList.add("current-item");
    });
});