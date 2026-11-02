/* =================================
   UBUNTU BUILDTECH CONSTRUCTION
   JavaScript Functionality
================================= */

// Wait until the HTML document has finished loading
// before running any JavaScript functionality.
document.addEventListener("DOMContentLoaded", () => {

    // 1. Automatically update the copyright year

    // Find all elements with the current-year class.
    const yearElements = document.querySelectorAll(".current-year");

    // Insert the current year into each matching element.
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    // 2. Mobile navigation menu

    // Find the navigation bar and its unordered list.
    const navbar = document.querySelector(".navbar");
    const navList = navbar?.querySelector("ul");

    // Only create the mobile menu if the navigation elements exist.
    if (navbar && navList) {

        // Create a button for opening and closing the mobile menu.
        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.type = "button";
        menuButton.textContent = "☰ Menu";

        // Accessibility attributes help screen readers understand the button.
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        // Place the menu button before the navigation list.
        navbar.insertBefore(menuButton, navList);

        // Toggle the mobile navigation when the button is clicked.
        menuButton.addEventListener("click", () => {

            // Add or remove the show class to control menu visibility.
            const isOpen = navList.classList.toggle("show");

            // Update the button text depending on the menu state.
            menuButton.textContent = isOpen ? "✕ Close" : "☰ Menu";

            // Update accessibility information.
            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close the mobile menu after a navigation link is selected.
        navList.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navList.classList.remove("show");

                // Reset the menu button to its original state.
                menuButton.textContent = "☰ Menu";
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    // 3. Highlight the current navigation page

    // Get the current page name from the browser URL.
    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    // Check every navigation link to identify the current page.
    document.querySelectorAll(".navbar a").forEach(link => {

        const linkPage = link.getAttribute("href");

        // Add the active class when the link matches the current page.
        if (linkPage === currentPage) {

            link.classList.add("active");

            // Tell screen readers that this is the current page.
            link.setAttribute("aria-current", "page");

        }

    });


    // 4. Scroll reveal animation

    // Select all elements that should animate when they enter the screen.
    const revealElements = document.querySelectorAll(".reveal");

    // Use IntersectionObserver if the browser supports it.
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                // Check whether the element has entered the visible screen area.
                if (entry.isIntersecting) {

                    // Add the visible class to trigger the CSS animation.
                    entry.target.classList.add("visible");

                    // Stop observing the element after it has appeared.
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15 // Trigger when 15% of the element is visible.
        });

        // Start observing each reveal element.
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        // Show all elements if IntersectionObserver is unsupported.
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // 5. Image loading skeleton effect

    // Select the main hero and project images.
    const images = document.querySelectorAll(
        ".hero-image, .project-image"
    );

    images.forEach(img => {

        // Remove the loading skeleton after the image loads or fails.
        const removeSkeleton = () => {
            img.classList.remove("image-loading");
        };

        // Check whether the image has already finished loading.
        if (img.complete) {

            removeSkeleton();

        } else {

            // Display the skeleton while the image is loading.
            img.classList.add("image-loading");

            // Remove the skeleton when the image loads successfully.
            img.addEventListener("load", removeSkeleton, {
                once: true
            });

            // Also remove the skeleton if the image fails to load.
            img.addEventListener("error", removeSkeleton, {
                once: true
            });

        }

    });


    // 6. Back-to-top button

    // Create a button that allows visitors to return to the top.
    const topButton = document.createElement("button");

    topButton.className = "back-to-top";
    topButton.type = "button";
    topButton.innerHTML = "↑";

    // Add an accessible label to describe the button.
    topButton.setAttribute("aria-label", "Back to top");

    // Add the button to the HTML document.
    document.body.appendChild(topButton);

    // Monitor scrolling to control when the button appears.
    window.addEventListener("scroll", () => {

        // Show the button after the visitor scrolls down 300 pixels.
        if (window.scrollY > 300) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }, {
        passive: true // Improves scroll-event performance.
    });

    // Smoothly scroll to the top when the button is clicked.
    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // 7. Contact form validation

    // Find the contact form on the page.
    const contactForm = document.querySelector("#contactForm");

    // Only run the validation if the contact form exists.
    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            // Prevent the form from submitting normally.
            event.preventDefault();

            // Retrieve the values entered by the visitor.
            const name = document.querySelector("#name")?.value.trim() || "";
            const email = document.querySelector("#email")?.value.trim() || "";
            const subject = document.querySelector("#subject")?.value.trim() || "";
            const message = document.querySelector("#message")?.value.trim() || "";

            // Find the element used to display form feedback.
            const formMessage = document.querySelector("#formMessage");

            // Check for empty fields.
            if (!name || !email || !subject || !message) {

                if (formMessage) {
                    formMessage.textContent = "Please complete all fields.";
                    formMessage.style.color = "red";
                }

                return;

            }

            // Validate the email address using a regular expression.
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                if (formMessage) {
                    formMessage.textContent = "Please enter a valid email address.";
                    formMessage.style.color = "red";
                }

                return;

            }

            // Prepare the email information.
            const recipient = "info@ubuntubuildtech.co.za";

            // Encode the subject and message for a mailto link.
            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            // Construct the mailto link.
            const mailtoLink =
                `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

            // Inform the visitor that their email application is opening.
            if (formMessage) {
                formMessage.textContent = "Opening your email application...";
                formMessage.style.color = "green";
            }

            // Open the visitor's default email application.
            window.location.href = mailtoLink;

        });

    }

});
