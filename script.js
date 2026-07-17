// ===========================
// Animated Counter
// ===========================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

counter.innerText = "0";

const updateCounter = () => {

const target = +counter.getAttribute("data-target");

const count = +counter.innerText;

const increment = target / 100;

if(count < target){

counter.innerText = Math.ceil(count + increment);

setTimeout(updateCounter,20);

}else{

counter.innerText = target;

}

};

updateCounter();

});

// ===========================
// Image Slider
// ===========================

const slides = document.querySelectorAll(".slide");

if(slides.length > 0){

let current = 0;

setInterval(()=>{

slides[current].classList.remove("active");

current++;

if(current >= slides.length){

current = 0;

}

slides[current].classList.add("active");

},3000);

}

// ===========================
// Smooth Scroll
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ===========================
// Console
// ===========================

console.log("SKR INTERNATIONAL Loaded Successfully");
