
// image slider

let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    slides.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
}

function autoSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
}

setInterval(autoSlide, 5000);

// onload

document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector('.content');
    // Add the active class after a short delay to trigger the animation
    setTimeout(() => {
        content.classList.add('active');
    }, 100); // Delay in milliseconds before animation starts
});


// Static counter


const counters = document.querySelectorAll('.count');
const speed = 200; // The lower the number, the faster the counter

counters.forEach((counter, index) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('%', ''); // Remove '%' for calculation

        const increment = target / speed;

        if (count < target) {
            // Append '%' for the 3rd and 4th counters (index 2 and 3) during counting
            counter.innerText = Math.ceil(count + increment) + ((index === 2 || index === 3) ? '%' : '');
            setTimeout(updateCount, 10);
        } else {
            // Ensure the final number is displayed with the correct format
            counter.innerText = target + ((index === 2 || index === 3) ? '%' : '');
        }
    };

    updateCount();
});


// slidescards sections

const navDots = document.querySelectorAll('.nav-dot');
const cardsSlider = document.querySelector('.cards-slider');
let currentCardIndex = 0;
let cardsToShow = 3; // Default cards to show
let totalCards = 6; // Total number of cards

function updateCardsToShow() {
    if (window.innerWidth < 481) {
        cardsToShow = 1; // Show one card on mobile
        updateDots(6); // 6 dots for mobile
    } else if (window.innerWidth < 1030) {
        cardsToShow = 2; // Show two cards on screens less than 1030px
        updateDots(3); // 3 dots for screens between 700px and 1030px
    } else {
        cardsToShow = 3; // Show three cards on larger screens (greater than 1030px)
        updateDots(2); // 2 dots for larger screens
    }
}

function updateDots(dotCount) {
    navDots.forEach((dot, index) => {
        dot.style.display = index < dotCount ? 'inline-block' : 'none';
    });
}

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentCardIndex = index;
        updateSlider();
    });
});

function updateSlider() {
    const translateValue = currentCardIndex * -(100 / (totalCards / cardsToShow)); // Adjusting the translate value
    cardsSlider.style.transform = `translateX(${translateValue}%)`;

    navDots.forEach(dot => dot.classList.remove('active'));
    navDots[currentCardIndex].classList.add('active');
}

// Initialize slider on page load
updateCardsToShow();
updateSlider();

// Update cards to show on resize
window.addEventListener('resize', () => {
    updateCardsToShow();
    updateSlider();
});


// Service dropdown
document.querySelectorAll('.dropdown-section.services li').forEach((item) => {
    item.addEventListener('mouseover', function () {
        const imageSrc = this.getAttribute('data-image');
        const dropdownImage = document.querySelector('.dropdown-image img');
        const dropdownText = document.querySelector('.dropdown-image p');

        dropdownImage.src = imageSrc;

        // Updating text based on the selected service
        const serviceText = {
            "Web Application Security Testing": "  Vulnerability Assessment and Penetration Testing (VAPT) is the security service focused on discovering flaws in network, server, and system infrastructure. Organizational security is emphasized in vulnerability assessments, while real-world exploitation is the goal of penetration testing.",

            "Mobile Application Security Testing": "The process of mobile application security testing involves analysing them for the necessary levels of quality, functionality, compatibility, usability, and performance. It is a Linux based operating system which was primarily designed for touchscreen mobile devices like tablets, smartphones. ",

            "Network Penetration Testing": "A network vulnerability assessment and penetration test, or network VAPT, is a technical security assessment that goes beyond the usual port scanning and vulnerability enumeration to pinpoint security risks and their business ramifications on your network, whether it be wireless, internal, or external Network",

            "Cloud Penetration Testing": "This assessment's goals are to evaluate your cloud-based environment's cyber security posture using simulated attacks and to find and use weaknesses in your cloud security services. Our cloud security testing methodology prioritize the most vulnerable areas of your cloud Application and recommend actionable solutions.",

            "IoT Security Testing": "The protection techniques used to secure network-based or internet-connected devices are referred to as IoT security. IoT security is the area of technology concerned with defending the networks and linked devices in the internet of things (IoT).",

            "Secure Code Review": "A secure code review is a specialized procedure that entails manually and/or automatically examining the source code of an application to find weaknesses in the design, discover unsafe coding techniques, find backdoors, injection flaws, cross-site scripting problems, weak cryptography, etc.",

            "Medical Device Security Testing": "Medical Device Penetration Testing identifies potential design weaknesses in the hardware, software, and communication techniques that could compromise the device's security. It aids businesses in comprehending the security implications of their devices and how to raise their level of security maturity. ",

            "Threat Modeling": "Threat modeling pinpoints the attack vectors that threat agents could use and adopts the perspective of con actors to understand how much damage they can cause. We look beyond the typical canned list of attacks to think about new attacks or attacks that may not have otherwise been considered. ",

            "Root Cause Analysis": "Root cause analysis (RCA) stands out as a robust approach for pinpointing and resolving business issues by identifying underlying inefficiencies or flaws and implementing corrective measures to prevent issue recurrence."
        };

        dropdownText.textContent = serviceText[this.textContent.trim()] || "Service description unavailable.";
    });
});


// Industry Dropdown

// Third dropdown
document.querySelectorAll('.dropdown-section-three ul li').forEach(function (item) {
    item.addEventListener('mouseover', function () {
        const imgSrc = this.getAttribute('data-image');
        const imgElement = document.querySelector('.dropdown-image-three img');
        const pElement = document.querySelector('.dropdown-image-three p');

        imgElement.src = imgSrc;

        if (this.textContent.includes("Industry Overview")) {
            pElement.textContent = "Vulnerability Assessment and Penetration Testing (VAPT) is the security service focused on discovering flaws in network, server, and system infrastructure.";
        }
        // Additional text changes for other list items
    });
});

//   Frame Section

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    const slideInterval = 3000; // Change slide every 3 seconds

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }

    // Start the auto slider
    setInterval(nextTestimonial, slideInterval);
});


// Navbar Hamburger

function toggleMenu() {
    const navbar = document.getElementById('navbarNav');
    navbar.classList.toggle('active');
}


// Service Content



document.querySelectorAll('.slide-link').forEach(link => {
    link.addEventListener('click', function () {
        let targetSlide = this.getAttribute('data-target');

        document.querySelectorAll('.content-slide').forEach(slide => slide.classList.remove('active'));

        document.getElementById('slide-' + targetSlide).classList.add('active');

        document.getElementById('slide-' + targetSlide).scrollIntoView({ behavior: 'smooth' });


    });
});


//  visible slider all

const secs = document.querySelectorAll('.secs');


const options = {
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, options);


secs.forEach(sec => {
    sectionObserver.observe(sec);
});



// Featured News

document.addEventListener('DOMContentLoaded', function() {
    const featuredNewsBtn = document.getElementById('featuredNewsBtn');
    const newsDropdown = document.getElementById('newsDropdown');
    let isOpen = false;

    // Toggle dropdown on button click
    featuredNewsBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown();
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function(event) {
        if (isOpen && !newsDropdown.contains(event.target) && event.target !== featuredNewsBtn) {
            closeDropdown();
        }
    });

    // Open or close dropdown based on current state
    function toggleDropdown() {
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    // Open dropdown with horizontal slide-in effect
    function openDropdown() {
        newsDropdown.classList.add('show');
        featuredNewsBtn.classList.add('active');
        isOpen = true;
    }

    // Close dropdown with horizontal slide-out effect
    function closeDropdown() {
        newsDropdown.classList.remove('show');
        featuredNewsBtn.classList.remove('active');
        isOpen = false;
    }
});
