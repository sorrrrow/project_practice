document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("toggle-btn");
    const p = document.getElementById("personality");

    if (btn) {
        btn.addEventListener("click", function() {
            if (p.textContent.includes("пушистая лапочка")) {
                p.textContent = "😾 С чужими — вреднючий командир!";
            } else {
                p.textContent = "😽 С семьей — пушистая лапочка!";
            }
        });
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}
