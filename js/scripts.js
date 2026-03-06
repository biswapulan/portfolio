// =============================================
// Technical Notes — Search & Per-Category Show More
// js/scripts.js
// =============================================

(function () {
    const VISIBLE_COUNT = 3;

    const searchInput = document.getElementById("notesSearch");
    const searchClear = document.getElementById("searchClear");
    const noResults = document.getElementById("noResults");
    const allCategories = Array.from(document.querySelectorAll("[data-category]"));

    // ---------------------------
    // Build Show More per category
    // ---------------------------
    allCategories.forEach(function (cat) {
        const items = Array.from(cat.querySelectorAll(".foundation-links li"));

        if (items.length <= VISIBLE_COUNT) return;

        // Hide items beyond VISIBLE_COUNT
        items.forEach(function (item, index) {
            if (index >= VISIBLE_COUNT) {
                item.classList.add("subtopic-hidden");
            }
        });

        // Create toggle button
        const btn = document.createElement("button");
        btn.className = "btn-show-more btn-category-toggle";
        btn.textContent = "Show More ▼";
        btn.setAttribute("data-expanded", "false");

        btn.addEventListener("click", function () {
            const expanded = btn.getAttribute("data-expanded") === "true";

            items.forEach(function (item, index) {
                if (index >= VISIBLE_COUNT) {
                    if (expanded) {
                        item.classList.add("subtopic-hidden");
                    } else {
                        item.classList.remove("subtopic-hidden");
                    }
                }
            });

            btn.setAttribute("data-expanded", expanded ? "false" : "true");
            btn.textContent = expanded ? "Show More ▼" : "Show Less ▲";
        });

        cat.appendChild(btn);
    });

    // ---------------------------
    // Search Logic
    // ---------------------------
    function normalise(str) {
        return str.toLowerCase().trim();
    }

    searchInput.addEventListener("input", function () {
        const query = normalise(searchInput.value);

        if (query === "") {
            clearSearch();
            return;
        }

        searchClear.style.display = "inline";
        let anyVisible = false;

        allCategories.forEach(function (cat) {
            const heading = normalise(cat.querySelector("h3").textContent);
            const items = Array.from(cat.querySelectorAll(".foundation-links li"));
            const links = Array.from(cat.querySelectorAll("a"));

            const headingMatch = heading.includes(query);
            const linkMatch = links.some(function (a) {
                return normalise(a.textContent).includes(query);
            });

            if (headingMatch || linkMatch) {
                cat.style.display = "";
                anyVisible = true;

                // Reveal all items and highlight matches
                items.forEach(function (item) {
                    item.classList.remove("subtopic-hidden");
                });

                links.forEach(function (a) {
                    if (normalise(a.textContent).includes(query)) {
                        a.classList.add("search-highlight");
                    } else {
                        a.classList.remove("search-highlight");
                    }
                });

            } else {
                cat.style.display = "none";
                links.forEach(function (a) {
                    a.classList.remove("search-highlight");
                });
            }
        });

        noResults.style.display = anyVisible ? "none" : "block";
    });

    // ---------------------------
    // Clear Search — restore collapsed state
    // ---------------------------
    function clearSearch() {
        searchInput.value = "";
        searchClear.style.display = "none";
        noResults.style.display = "none";

        allCategories.forEach(function (cat) {
            cat.style.display = "";

            const items = Array.from(cat.querySelectorAll(".foundation-links li"));
            const links = Array.from(cat.querySelectorAll("a"));
            const btn = cat.querySelector(".btn-category-toggle");

            links.forEach(function (a) {
                a.classList.remove("search-highlight");
            });

            // Restore collapsed/expanded state based on button
            if (btn) {
                const expanded = btn.getAttribute("data-expanded") === "true";
                items.forEach(function (item, index) {
                    if (index >= VISIBLE_COUNT) {
                        if (expanded) {
                            item.classList.remove("subtopic-hidden");
                        } else {
                            item.classList.add("subtopic-hidden");
                        }
                    }
                });
            }
        });
    }

    searchClear.addEventListener("click", clearSearch);

})();