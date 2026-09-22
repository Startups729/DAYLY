// ============================
// DATE
// ============================

const dateElement = document.getElementById("date");

const today = new Date();

dateElement.textContent = today.toLocaleDateString(
    "en-US",
    {
        month: "short",
        day: "numeric"
    }
);


// ============================
// SCROLL TO APP
// ============================

function scrollToApp() {

    document.getElementById("app").scrollIntoView({
        behavior: "smooth"
    });

}


// ============================
// DEMO BUTTON
// ============================

function showDemo() {

    scrollToApp();

    setTimeout(() => {

        const input = document.getElementById("userInput");

        input.value =
            "I have school at 8, need to finish homework, go to the gym, eat dinner, and edit my YouTube video.";

        generatePlan();

    }, 700);

}


// ============================
// GENERATE PLAN
// ============================

function generatePlan() {

    const input = document.getElementById("userInput");

    const result = document.getElementById("result");

    const plan = document.getElementById("plan");

    let text = input.value.trim();


    if (text === "") {

        input.focus();

        return;

    }


    // Show result

    result.classList.remove("hidden");


    // Simple demo schedule
    // Later this can be replaced with real AI.

    const tasks = [

        ["7:00 AM", "Wake up and get ready"],

        ["7:30 AM", "Breakfast"],

        ["8:00 AM", "School / Work"],

        ["3:30 PM", "Finish important tasks"],

        ["4:30 PM", "Gym / Exercise"],

        ["6:00 PM", "Dinner"],

        ["7:00 PM", "Homework / Projects"],

        ["8:30 PM", "Free time"],

        ["9:30 PM", "Prepare for tomorrow"],

        ["10:00 PM", "Wind down"] 
    ];


    plan.innerHTML = "";


    tasks.forEach(task => {

        const item = document.createElement("div");

        item.className = "plan-item";

        item.innerHTML = `

            <div class="plan-time">
                ${task[0]}
            </div>

            <div class="plan-task">
                ${task[1]}
            </div>

        `;

        plan.appendChild(item);

    });

}