//Scroll on animation
var skillElems = document.querySelectorAll(".inner");
var navLinks = document.querySelectorAll(".nav");

var skillLevels = [93, 90, 95, 70, 30, 80];
var skillIncrease = [];
var skillTiming = { duration : 1000, iteration : 1, fill : "forwards", direction : "normal" };

for(let i = 0; i < skillLevels.length; i++){
    skillIncrease.push([{ width : "0%" } , { width : `${skillLevels[i]}%` }]);
}
for(let i = 0; i < skillElems.length; i++){
    skillElems[i].animate(skillIncrease[i], skillTiming);
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('reveal-animation');
        return;
        }
        entry.target.classList.remove('reveal-animation');
    });
});
  
let elems = document.querySelectorAll(".reveal");
elems.forEach(elem=>{
    observer.observe(elem);
});
const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            for(let i = 0; i < skillElems.length; i++){
                skillElems[i].animate(skillIncrease[i], skillTiming);
            }
            return;
        }
    });
});
skillElems.forEach(elem=>{
    observer2.observe(elem);
});

// ** HEADER ANDROID BAR
var icon = document.querySelector(".icon");
var header = document.querySelector("header");
var isActive = false;
icon.addEventListener("click", (e)=>{
    if(!isActive) {
        isActive = true;
        header.classList.remove('hideheader');
        header.classList.add('revealheader');
        icon.classList.add("collapse-icon");

    }else {
        isActive = false;
        icon.classList.remove("collapse-icon");
        header.classList.remove("revealheader");
        header.classList.add('hideheader');
    }
});

navLinks.forEach(nav=>{
    nav.addEventListener("click", ()=>{
        isActive = false;
        icon.classList.remove("collapse-icon");
        header.classList.remove("revealheader");
        header.classList.add('hideheader');
    });
});

var aboutMeButton = document.querySelector(".about-me-button");
aboutMeButton.addEventListener("click", ()=>{
    console.log("hi")
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// **AUTOTYPING SKILLS
var skills  = document.querySelector(".skill");

var names = ["Full Stack Developer", "Student", "Python Developer"];

skills.innerHTML = "";

let globalTime = 0;

let singleTon = false, i = 0, j = 0;
let factor = 2, hitEnd = false, wait = 30;
function animateText(t) {
    if(hitEnd && globalTime > wait) { 
        hitEnd = false;
        factor = 2;
        skills.innerHTML = "&nbsp;";
        skills.classList.remove("flikker");
    }
    if(Math.floor(t) % factor == 0){
        if(!singleTon) {
            skills.innerHTML += names[j][i];
            i += 1;
            if(i >= names[j].length){
                i = 0;
                j += 1;
                j = j % names.length;
                factor = 30; // should equal to 'wait'
                hitEnd = true;
                skills.classList.add("flikker");
                globalTime = 0;
            }
            singleTon = true;
        }
    }else{
        singleTon = false;
    }
}

function random(min, max){
    return Math.random() * (max - min) + min;
}

let innerBars = document.querySelectorAll(".inner");
for(let i = 0; i < innerBars.length; i++){
    innerBars[i].style.backgroundColor = `rgb(${random(0, 200)}, ${random(0, 100)}, ${random(0, 255)})`;
}

let currentPro = 0;
let projects = document.querySelectorAll(".project-section");
let leftSlide = document.querySelector(".left-slide");
let rightSlide = document.querySelector(".right-slide");
let projectHolder = document.querySelector(".project-holder");

rightSlide.addEventListener("click", ()=>{
    currentPro += 1;
    currentPro = currentPro % projects.length;
    projectHolder.scrollTo({
        left: projects[currentPro].getBoundingClientRect().x,
        top: 0,
        behavior: "smooth"
    });
});

leftSlide.addEventListener("click", ()=>{
    currentPro -= 1;
    currentPro = -currentPro % projects.length;
    projectHolder.scrollTo({
        left: projects[currentPro].getBoundingClientRect().x,
        top: 0,
        behavior: "smooth"
    });
});

let t0 = performance.now(), t1 = 0, dt = 0;
function loop(){
    t1 = performance.now();
    dt = (t1 - t0) / 1000;
    dt = Math.max(1/60, dt);
    globalTime += dt * 15;
    animateText(globalTime);
    t0 = t1;
    requestAnimationFrame(loop);
}
loop();
