// Global variables
const header = document.querySelector('.page__header');
const sections = document.querySelectorAll('[data-nav]');
const navUl = document.querySelector('#navbar__list');

let prevScrollpos = window.pageYOffset;

// Hide header on scroll down, show on scroll up - deactived in Event Listeners
function showHeaderOnScroll() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        header.classList.add('scrollUp');
        header.classList.remove('scrollDown');
    } else {
        header.classList.add('scrollDown');
        header.classList.remove('scrollUp');
    }
    prevScrollpos = currentScrollPos;
}


// Function for building the nav
function createMenu() {

    sections.forEach((section, index) => {
        let listItem = document.createElement('li');
        listItem.classList.add('list__item');
        navUl.appendChild(listItem);

        let link = document.createElement('a');
        listItem.appendChild(link);

        let linkTitle = section.getAttribute('data-nav');
        link.textContent = linkTitle;

        let linkTarget = section.getAttribute('id');

        // Set attributes for the links
        link.setAttribute("href", `#${linkTarget}`);
        link.setAttribute("data-nav", `${linkTarget}`);
        link.classList.add('menu__link');

    });
}

// Function for adding 'active' class to sections and links when in view
function addActiveClasses() {
    
    sections.forEach(function (section) {
        let activeLink = navUl.querySelector(`[data-nav=${section.id}]`);
        if(section.getBoundingClientRect().top >= -350 && section.getBoundingClientRect().top <= 150) {
            section.classList.add('active');
            activeLink.classList.add('active-link');
        } else {
            section.classList.remove('active');
            activeLink.classList.remove('active-link');
        }
    });

}

// Function for smooth scrolling to section when clicking on link
 function smoothScroll (e) {
    e.preventDefault();
    if (e.target.dataset.nav) {
        document.getElementById(`${e.target.dataset.nav}`).scrollIntoView({behavior: "smooth", duration: 2000})
        
    }
 }

 // Functionality for the Scroll-to-top-Button
const scrollToTopBtn = document.querySelector(".scroll-to-top-button");
const rootElement = document.documentElement;
const TOGGLE_RATIO = 0.10;

function handleScroll() {
    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if ((rootElement.scrollTop / scrollTotal) > TOGGLE_RATIO) {
        scrollToTopBtn.classList.add("show-scroll-btn");
    } else {
        scrollToTopBtn.classList.remove("show-scroll-btn");
    }
}

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



// The event listeners
document.addEventListener('DOMContentLoaded', createMenu);
window.addEventListener('scroll', addActiveClasses);

// deactivated because of unconvenience
// window.addEventListener('scroll', showHeaderOnScroll);

navUl.addEventListener('click', smoothScroll);
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

