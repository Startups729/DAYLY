```javascript
// ============================
// SCROLL REVEAL
// ============================

const steps =
    document.querySelectorAll(".step");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


steps.forEach(step => {

    observer.observe(step);

});


// ============================
// DEMO AI TEXT
// ============================

const fakeInput =
    document.querySelector(".fake-input");


if (fakeInput) {

    fakeInput.addEventListener(
        "click",
        () => {

            fakeInput.style.borderColor =
                "#8b5cf6";

        }
    );

}
```
