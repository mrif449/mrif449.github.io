function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        elements[instance].scrollIntoView({ behavior: "smooth" });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener("click", () => {
    scrollToElement(".header");
});

link2.addEventListener("click", () => {
    scrollToElement(".header", 1);
});

link3.addEventListener("click", () => {
    scrollToElement(".column");
});

// cube
let isDragging = false;
let previousX;
let previousY;
let rotationX = 0;
let rotationY = 0;

const cube = document.getElementById("cube");

cube.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    cube.style.cursor = "grabbing";
    cube.style.animation = "none";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    cube.style.cursor = "grab";
    cube.style.animation = "";
});

document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousX;
        const deltaY = event.clientY - previousY;
        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        previousX = event.clientX;
        previousY = event.clientY;
    }
});

cube.addEventListener("mouseenter", () => {
    if (!isDragging) {
        cube.style.animation = "rotate 15s infinite linear";
    }
});

cube.addEventListener("mouseleave", () => {
    if (!isDragging) {
        cube.style.animation = "rotate 15s infinite linear";
    }
});

// JavaScript to create typing animationclass TypeWriter {
class TypeWriter {
    constructor(element, words, period) {
        this.element = element;
        this.words = words;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.isDeleting = false;
        this.type();
    }

    type() {
        const i = this.loopNum % this.words.length;
        const fullTxt = this.words[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Update the text content with a blinking cursor (no extra space)
        this.element.querySelector(".wrap").innerHTML =
            this.txt + '<span class="cursor"></span>';

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.type(), delta);
    }
}

// Initialize the typing effect on page load
window.onload = function () {
    const elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
        const words = JSON.parse(elements[i].getAttribute("data-type"));
        const period = elements[i].getAttribute("data-period");
        if (words) {
            new TypeWriter(elements[i], words, period);
        }
    }
};
