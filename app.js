// ==============================
// DAYLY APP
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------
    // ELEMENTS
    // ------------------------------

    const navButtons = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");

    const fixDayBtn = document.getElementById("fixDayBtn");
    const ideasBtn = document.getElementById("ideasBtn");
    const foodBtn = document.getElementById("foodBtn");
    const writeBtn = document.getElementById("writeBtn");

    const createDayBtn = document.getElementById("createDayBtn");
    const dayInput = document.getElementById("dayInput");

    const schedule = document.getElementById("schedule");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const goalInput = document.getElementById("goalInput");
    const addGoalBtn = document.getElementById("addGoalBtn");
    const goalList = document.getElementById("goalList");

    const calculatorInput = document.getElementById("calculatorInput");
    const calculateBtn = document.getElementById("calculateBtn");
    const calculatorResult = document.getElementById("calculatorResult");

    const decisionInput = document.getElementById("decisionInput");
    const decideBtn = document.getElementById("decideBtn");
    const decisionResult = document.getElementById("decisionResult");

    const currentDate = document.getElementById("currentDate");

    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalIcon = document.getElementById("modalIcon");


    // ------------------------------
    // DATE
    // ------------------------------

    const today = new Date();

    if (currentDate) {
        currentDate.textContent = today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });
    }


    // ------------------------------
    // PAGE SWITCHING
    // ------------------------------

    function showPage(pageName) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        navButtons.forEach(button => {
            button.classList.remove("active");
        });

        const page = document.getElementById(pageName);

        if (page) {
            page.classList.add("active");
        }

        const activeButton = document.querySelector(
            `.nav-btn[data-page="${pageName}"]`
        );

        if (activeButton) {
            activeButton.classList.add("active");
        }
    }


    navButtons.forEach(button => {

        button.addEventListener("click", () => {
            showPage(button.dataset.page);
        });

    });


    // ------------------------------
    // FIX MY DAY
    // ------------------------------

    if (fixDayBtn) {
        fixDayBtn.addEventListener("click", () => {
            showPage("planner");
            dayInput.focus();
        });
    }


    if (createDayBtn) {
        createDayBtn.addEventListener("click", createSchedule);
    }


    function createSchedule() {

        const text = dayInput.value.trim();

        if (!text) {

            openModal(
                "📅",
                "Tell me about your day",
                `
                <p>Type what you need to do today first.</p>

                <p style="margin-top:15px;color:#888;">
                    Example: "I have school at 8, homework for 2 hours,
                    basketball at 7, and I need to clean my room."
                </p>
                `
            );

            return;
        }

        const lower = text.toLowerCase();

        const tasks = [];

        if (
            lower.includes("school") ||
            lower.includes("class") ||
            lower.includes("college")
        ) {
            tasks.push({
                time: "School",
                name: "🎓 School / Classes"
            });
        }

        if (
            lower.includes("homework") ||
            lower.includes("study") ||
            lower.includes("assignment")
        ) {
            tasks.push({
                time: "Study",
                name: "📚 Homework / Study"
            });
        }

        if (
            lower.includes("work") ||
            lower.includes("job")
        ) {
            tasks.push({
                time: "Work",
                name: "💼 Work"
            });
        }

        if (
            lower.includes("gym") ||
            lower.includes("workout") ||
            lower.includes("basketball") ||
            lower.includes("soccer") ||
            lower.includes("exercise")
        ) {
            tasks.push({
                time: "Exercise",
                name: "🏃 Exercise / Sports"
            });
        }

        if (
            lower.includes("youtube") ||
            lower.includes("video") ||
            lower.includes("edit") ||
            lower.includes("stream")
        ) {
            tasks.push({
                time: "Creative",
                name: "🎥 Work on your content"
            });
        }

        if (
            lower.includes("clean") ||
            lower.includes("room") ||
            lower.includes("laundry")
        ) {
            tasks.push({
                time: "Home",
                name: "🧹 Clean / Organize"
            });
        }

        if (
            lower.includes("eat") ||
            lower.includes("food") ||
            lower.includes("lunch") ||
            lower.includes("dinner") ||
            lower.includes("breakfast")
        ) {
            tasks.push({
                time: "Food",
                name: "🍳 Eat a healthy high-protein meal"
            });
        }

        tasks.push({
            time: "Break",
            name: "💧 Drink some water + take a short break"
        });

        tasks.push({
            time: "Later",
            name: "🧠 Review your priorities"
        });

        if (tasks.length === 2) {

            tasks.unshift({
                time: "Now",
                name: "⭐ Pick your top 3 priorities"
            });

            tasks.push({
                time: "Tonight",
                name: "🌙 Prepare for tomorrow"
            });
        }

        renderSchedule(tasks);

        showPage("dashboard");
    }


    // ------------------------------
    // RENDER SCHEDULE
    // ------------------------------

    function renderSchedule(tasks) {

        schedule.innerHTML = "";

        tasks.forEach((task, index) => {

            const div = document.createElement("div");

            div.className = "task";

            div.innerHTML = `
                <input type="checkbox" data-index="${index}">

                <div class="task-info">

                    <div class="task-time">
                        ${task.time}
                    </div>

                    <div class="task-name">
                        ${task.name}
                    </div>

                </div>
            `;

            schedule.appendChild(div);
        });


        const checkboxes = schedule.querySelectorAll(
            'input[type="checkbox"]'
        );


        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", updateProgress);
        });


        updateProgress();
    }


    // ------------------------------
    // PROGRESS
    // ------------------------------

    function updateProgress() {

        const checkboxes = schedule.querySelectorAll(
            'input[type="checkbox"]'
        );

        const completed = [...checkboxes]
            .filter(box => box.checked)
            .length;

        const total = checkboxes.length;

        const percent = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        progressBar.style.width = `${percent}%`;

        progressText.textContent =
            `${completed}/${total} tasks completed`;

        checkboxes.forEach(box => {

            const task = box.closest(".task");

            if (box.checked) {
                task.classList.add("completed");
            } else {
                task.classList.remove("completed");
            }

        });
    }


    // ------------------------------
    // TIME OF DAY
    // ------------------------------

    function getTimeOfDay() {

        const hour = new Date().getHours();

        if (hour >= 5 && hour < 10) return "morning";
        if (hour >= 10 && hour < 14) return "midday";
        if (hour >= 14 && hour < 18) return "afternoon";
        if (hour >= 18 && hour < 22) return "evening";

        return "night";
    }


    // ------------------------------
    // IDEAS
    // ------------------------------

    if (ideasBtn) {

        ideasBtn.addEventListener("click", () => {

            const time = getTimeOfDay();

            const ideas = {

                morning: [
                    "Plan your top 3 priorities",
                    "Take a short walk",
                    "Eat a protein-rich breakfast",
                    "Clean your workspace",
                    "Set one goal for today"
                ],

                midday: [
                    "Take a 10-minute walk",
                    "Finish your hardest task",
                    "Have a protein-rich lunch",
                    "Organize the rest of your day",
                    "Take a short screen break"
                ],

                afternoon: [
                    "Get some exercise",
                    "Work on homework",
                    "Work on a creative project",
                    "Have a balanced high-protein snack",
                    "Clean one small area"
                ],

                evening: [
                    "Finish your most important task",
                    "Prepare clothes for tomorrow",
                    "Eat a balanced dinner",
                    "Take a short walk",
                    "Spend time on a hobby"
                ],

                night: [
                    "Prepare everything for tomorrow",
                    "Clean your room for 5 minutes",
                    "Write down tomorrow's priorities",
                    "Read for a little while",
                    "Start winding down"
                ]

            };

            openModal(
                "💡",
                `Ideas for your ${time}`,
                ideas[time]
                    .map(idea => `
                        <div class="idea">
                            ✨ ${idea}
                        </div>
                    `)
                    .join("")
            );

        });

    }


    // ------------------------------
    // FOOD
    // ------------------------------

    if (foodBtn) {

        foodBtn.addEventListener("click", () => {

            const time = getTimeOfDay();

            const meals = {

                morning: [
                    ["Greek yogurt + berries", "Protein + fruit"],
                    ["Eggs + whole grain toast", "Protein + carbs"],
                    ["Oatmeal + peanut butter + yogurt", "Protein + fiber"]
                ],

                midday: [
                    ["Chicken rice bowl", "Chicken + rice + vegetables"],
                    ["Turkey sandwich + Greek yogurt", "Protein + whole grains"],
                    ["Chicken wrap + vegetables", "Protein + vegetables"]
                ],

                afternoon: [
                    ["Greek yogurt + fruit", "Easy protein snack"],
                    ["Apple + peanut butter", "Balanced snack"],
                    ["Cottage cheese + berries", "Protein + fruit"],
                    ["Protein smoothie + banana", "Quick option"]
                ],

                evening: [
                    ["Grilled chicken + rice + vegetables", "Balanced dinner"],
                    ["Salmon + potatoes + vegetables", "Protein + healthy fats"],
                    ["Lean beef taco bowl", "Protein + vegetables"]
                ],

                night: [
                    ["Greek yogurt + berries", "Light protein option"],
                    ["Cottage cheese + fruit", "Protein + fruit"],
                    ["Peanut butter + banana", "Simple snack"]
                ]

            };

            openModal(
                "🍳",
                `What to eat this ${time}`,
                meals[time]
                    .map(meal => `
                        <div class="meal">
                            <strong>${meal[0]}</strong>
                            <small>${meal[1]}</small>
                        </div>
                    `)
                    .join("")
            );

        });

    }


    // ==================================================
    // WRITE SOMETHING
    // ==================================================

    const writingTemplates = {

        email: {
            icon: "📧",
            title: "Email Template",
            template:
`Subject: [Your Subject]

Hi [Name],

I hope you're doing well.

I'm reaching out because [reason for email].

[Add any important details here.]

Please let me know if you have any questions.

Thank you,
[Your Name]`
        },

        school: {
            icon: "📝",
            title: "School Assignment Template",
            template:
`Title: [Assignment Title]

Introduction:
[Introduce the topic and explain what the assignment is about.]

Main Point 1:
[Explain your first main point.]

Main Point 2:
[Explain your second main point.]

Main Point 3:
[Explain your third main point.]

Conclusion:
[Summarize your main points and finish your assignment.]

Name: [Your Name]
Class: [Class Name]
Date: [Date]`
        },

        text: {
            icon: "💬",
            title: "Text Message Template",
            template:
`Hey [Name]!

I wanted to let you know that [message].

[Add any extra details here.]

Let me know what you think!`
        },

        instagram: {
            icon: "📱",
            title: "Instagram Caption Template",
            template:
`🔥 [HOOK]

[Short description of what you're posting.]

What do you think? 👀

👇 Let me know in the comments!

#fyp #viral #content #dayly`
        },

        youtube: {
            icon: "🎥",
            title: "YouTube Description Template",
            template:
`🔥 [VIDEO TITLE]

Today I'm [what you're doing in the video].

If you enjoyed the video, make sure to:

👍 Like
💬 Comment
🔔 Subscribe

Thanks for watching!

SOCIALS:
📱 Instagram: [Your Instagram]
🎮 Roblox: [Your Roblox]
🎵 TikTok: [Your TikTok]`
        }

    };


    if (writeBtn) {

        writeBtn.addEventListener("click", () => {
            openWritingMenu();
        });

    }


    function openWritingMenu() {

        openModal(
            "✍️",
            "Write Something",
            `
            <p style="color:#888;margin-bottom:20px;">
                Choose what you want to write:
            </p>

            <div class="writing-options">

                <button class="writing-option" data-template="email">
                    <span>📧</span>
                    <strong>Email</strong>
                    <small>Write a professional email</small>
                </button>

                <button class="writing-option" data-template="school">
                    <span>📝</span>
                    <strong>School Assignment</strong>
                    <small>Start your assignment</small>
                </button>

                <button class="writing-option" data-template="text">
                    <span>💬</span>
                    <strong>Text Message</strong>
                    <small>Send someone a message</small>
                </button>

                <button class="writing-option" data-template="instagram">
                    <span>📱</span>
                    <strong>Instagram Caption</strong>
                    <small>Create a caption</small>
                </button>

                <button class="writing-option" data-template="youtube">
                    <span>🎥</span>
                    <strong>YouTube Description</strong>
                    <small>Describe your video</small>
                </button>

            </div>
            `
        );


        document.querySelectorAll(".writing-option").forEach(button => {

            button.addEventListener("click", () => {

                const templateName =
                    button.dataset.template;

                showWritingTemplate(templateName);

            });

        });

    }


    function showWritingTemplate(templateName) {

        const item = writingTemplates[templateName];

        if (!item) return;


        openModal(
            item.icon,
            item.title,
            `
            <div class="template-container">

                <div class="template-text" id="templateText">
                    ${escapeHtml(item.template)}
                </div>

                <button
                    class="copy-template-btn"
                    id="copyTemplateBtn"
                >
                    📋 Copy Template
                </button>

            </div>

            <button
                class="back-writing-btn"
                id="backWritingBtn"
            >
                ← Back to templates
            </button>
            `
        );


        document
            .getElementById("copyTemplateBtn")
            .addEventListener("click", () => {

                copyTemplate(item.template);

            });


        document
            .getElementById("backWritingBtn")
            .addEventListener("click", () => {

                openWritingMenu();

            });

    }


    async function copyTemplate(template) {

        const button =
            document.getElementById("copyTemplateBtn");

        try {

            await navigator.clipboard.writeText(template);

            button.textContent = "✓ Copied Template";

            button.classList.add("copied");

            setTimeout(() => {

                button.textContent = "📋 Copy Template";

                button.classList.remove("copied");

            }, 1500);

        } catch (error) {

            const textarea =
                document.createElement("textarea");

            textarea.value = template;

            textarea.style.position = "fixed";
            textarea.style.opacity = "0";

            document.body.appendChild(textarea);

            textarea.select();

            document.execCommand("copy");

            textarea.remove();

            button.textContent = "✓ Copied Template";

            button.classList.add("copied");

            setTimeout(() => {

                button.textContent = "📋 Copy Template";

                button.classList.remove("copied");

            }, 1500);

        }
    }


    // ------------------------------
    // ESCAPE HTML
    // ------------------------------

    function escapeHtml(text) {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // ------------------------------
    // GOALS
    // ------------------------------

    if (addGoalBtn) {
        addGoalBtn.addEventListener("click", addGoal);
    }


    if (goalInput) {

        goalInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                addGoal();
            }

        });

    }


    function addGoal() {

        const goal = goalInput.value.trim();

        if (!goal) return;

        const div = document.createElement("div");

        div.className = "goal";

        div.textContent = "🎯 " + goal;

        goalList.appendChild(div);

        goalInput.value = "";

    }


    // ------------------------------
    // CALCULATOR
    // ------------------------------

    if (calculateBtn) {

        calculateBtn.addEventListener("click", () => {

            const expression =
                calculatorInput.value.trim();

            if (!expression) {

                calculatorResult.textContent =
                    "Enter a calculation.";

                return;
            }

            if (!/^[0-9+\-*/().\s]+$/.test(expression)) {

                calculatorResult.textContent =
                    "Please enter a basic calculation.";

                return;
            }

            try {

                const result =
                    Function(
                        `"use strict"; return (${expression})`
                    )();

                calculatorResult.textContent =
                    `Answer: ${result}`;

            } catch {

                calculatorResult.textContent =
                    "That calculation isn't valid.";

            }

        });

    }


    // ------------------------------
    // DECISION MAKER
    // ------------------------------

    if (decideBtn) {

        decideBtn.addEventListener("click", () => {

            const text =
                decisionInput.value.trim();

            if (!text) {

                decisionResult.textContent =
                    "Give me two or more choices.";

                return;
            }

            const choices =
                text
                    .split(/\s+(?:or|vs|versus)\s+/i)
                    .map(x => x.trim())
                    .filter(Boolean);

            if (choices.length < 2) {

                decisionResult.textContent =
                    "Try something like: Pizza or burgers";

                return;
            }

            const choice =
                choices[
                    Math.floor(
                        Math.random() * choices.length
                    )
                ];

            decisionResult.textContent =
                `DAYLY chooses: ${choice}`;

        });

    }


    // ------------------------------
    // MODAL
    // ------------------------------

    function openModal(icon, title, body) {

        modalIcon.textContent = icon;

        modalTitle.textContent = title;

        modalBody.innerHTML = body;

        modal.classList.add("show");

    }


    if (closeModal) {

        closeModal.addEventListener("click", () => {

            modal.classList.remove("show");

        });

    }


    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        });

    }


    // ==================================================
    // TIMER SYSTEM
    // ==================================================

    let daylyTimers = [];
    let daylyTimerId = 0;


    const openTimersBtn =
        document.getElementById("openTimersBtn");

    const closeTimersBtn =
        document.getElementById("closeTimersBtn");

    const timerModal =
        document.getElementById("timerModal");

    const createTimerBtn =
        document.getElementById("createTimerBtn");


    // ------------------------------
    // OPEN TIMERS
    // ------------------------------

    if (openTimersBtn && timerModal) {

        openTimersBtn.addEventListener("click", () => {

            timerModal.classList.add("show");

            renderDaylyTimers();

            const timerName =
                document.getElementById("timerName");

            if (timerName) {

                setTimeout(() => {
                    timerName.focus();
                }, 100);

            }

        });

    }


    // ------------------------------
    // CLOSE TIMERS
    // ------------------------------

    if (closeTimersBtn && timerModal) {

        closeTimersBtn.addEventListener("click", () => {

            timerModal.classList.remove("show");

        });

    }


    if (timerModal) {

        timerModal.addEventListener("click", event => {

            if (event.target === timerModal) {

                timerModal.classList.remove("show");

            }

        });

    }


    // ------------------------------
    // CREATE TIMER
    // ------------------------------

    if (createTimerBtn) {

        createTimerBtn.addEventListener(
            "click",
            createDaylyTimer
        );

    }


    function createDaylyTimer() {

        const nameInput =
            document.getElementById("timerName");

        const hoursInput =
            document.getElementById("timerHours");

        const minutesInput =
            document.getElementById("timerMinutes");

        const secondsInput =
            document.getElementById("timerSeconds");


        const name =
            nameInput.value.trim() ||
            `Timer ${daylyTimers.length + 1}`;


        const hours =
            Math.max(
                0,
                Number(hoursInput.value) || 0
            );


        const minutes =
            Math.max(
                0,
                Number(minutesInput.value) || 0
            );


        const seconds =
            Math.max(
                0,
                Number(secondsInput.value) || 0
            );


        const totalSeconds =
            (hours * 3600) +
            (minutes * 60) +
            seconds;


        if (totalSeconds <= 0) {

            alert(
                "Please set a timer longer than 0 seconds."
            );

            return;
        }


        const newTimer = {

            id: daylyTimerId++,

            name: name,

            remaining: totalSeconds,

            originalTime: totalSeconds,

            running: true,

            finished: false

        };


        daylyTimers.push(newTimer);


        // Reset inputs

        nameInput.value = "";

        hoursInput.value = 0;

        minutesInput.value = 5;

        secondsInput.value = 0;


        renderDaylyTimers();

    }


    // ------------------------------
    // PAUSE / RESUME
    // ------------------------------

    window.toggleDaylyTimer = function(id) {

        const timer =
            daylyTimers.find(
                timer => timer.id === id
            );


        if (!timer || timer.finished) {
            return;
        }


        timer.running =
            !timer.running;


        renderDaylyTimers();

    };


    // ------------------------------
    // DELETE TIMER
    // ------------------------------

    window.deleteDaylyTimer = function(id) {

        daylyTimers =
            daylyTimers.filter(
                timer => timer.id !== id
            );


        renderDaylyTimers();

    };


    // ------------------------------
    // RESET TIMER
    // ------------------------------

    window.resetDaylyTimer = function(id) {

        const timer =
            daylyTimers.find(
                timer => timer.id === id
            );


        if (!timer) {
            return;
        }


        timer.remaining =
            timer.originalTime;

        timer.running = true;

        timer.finished = false;


        renderDaylyTimers();

    };


    // ------------------------------
    // RENDER TIMERS
    // ------------------------------

    function renderDaylyTimers() {

        const timerList =
            document.getElementById("timerList");


        if (!timerList) {
            return;
        }


        if (daylyTimers.length === 0) {

            timerList.innerHTML = `

                <div class="no-timers">

                    <div style="font-size:35px;">
                        ⏱️
                    </div>

                    <h3>No timers yet</h3>

                    <p>
                        Create a timer above to get started.
                    </p>

                </div>

            `;

            return;
        }


        timerList.innerHTML =
            daylyTimers.map(timer => {


                const hours =
                    Math.floor(
                        timer.remaining / 3600
                    );


                const minutes =
                    Math.floor(
                        (timer.remaining % 3600) / 60
                    );


                const seconds =
                    timer.remaining % 60;


                const timeString =
                    `${String(hours).padStart(2, "0")}:` +
                    `${String(minutes).padStart(2, "0")}:` +
                    `${String(seconds).padStart(2, "0")}`;


                let statusText =
                    "Paused";


                if (timer.finished) {

                    statusText =
                        "🔔 Timer Finished!";

                }
                else if (timer.running) {

                    statusText =
                        "Running";

                }


                return `

                    <div class="timer-card ${
                        timer.finished
                            ? "finished"
                            : ""
                    }">

                        <div class="timer-card-header">

                            <div class="timer-name">

                                ⏱️
                                ${escapeTimerText(timer.name)}

                            </div>


                            <button
                                class="timer-delete-btn"
                                onclick="deleteDaylyTimer(${timer.id})"
                            >
                                🗑️
                            </button>

                        </div>


                        <div class="timer-time">

                            ${timeString}

                        </div>


                        <div class="timer-status">

                            ${statusText}

                        </div>


                        <div class="timer-buttons">

                            ${
                                timer.finished

                                ? `

                                    <button
                                        class="timer-action-btn"
                                        onclick="resetDaylyTimer(${timer.id})"
                                    >
                                        🔄 Reset
                                    </button>

                                `

                                : `

                                    <button
                                        class="timer-action-btn"
                                        onclick="toggleDaylyTimer(${timer.id})"
                                    >

                                        ${
                                            timer.running
                                                ? "⏸️ Pause"
                                                : "▶️ Resume"
                                        }

                                    </button>

                                `
                            }

                        </div>

                    </div>

                `;

            }).join("");

    }


    // ------------------------------
    // TIMER COUNTDOWN
    // ------------------------------

    setInterval(() => {

        let changed = false;


        daylyTimers.forEach(timer => {

            if (
                !timer.running ||
                timer.finished
            ) {
                return;
            }


            timer.remaining--;

            changed = true;


            if (timer.remaining <= 0) {

                timer.remaining = 0;

                timer.running = false;

                timer.finished = true;


                playTimerFinishedSound();

                showTimerNotification(
                    timer.name
                );

            }

        });


        if (changed) {

            renderDaylyTimers();

        }

    }, 1000);


    // ------------------------------
    // TIMER SOUND
    // ------------------------------

    function playTimerFinishedSound() {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (!AudioContext) {
                return;
            }


            const audio =
                new AudioContext();


            const oscillator =
                audio.createOscillator();


            const gain =
                audio.createGain();


            oscillator.connect(gain);

            gain.connect(audio.destination);


            oscillator.frequency.value = 800;


            gain.gain.setValueAtTime(
                0.25,
                audio.currentTime
            );


            oscillator.start();


            gain.gain.exponentialRampToValueAtTime(
                0.01,
                audio.currentTime + 1
            );


            oscillator.stop(
                audio.currentTime + 1
            );

        }
        catch (error) {

            console.log(
                "Could not play timer sound."
            );

        }

    }


    // ------------------------------
    // TIMER NOTIFICATION
    // ------------------------------

    function showTimerNotification(timerName) {

        if (
            "Notification" in window &&
            Notification.permission === "granted"
        ) {

            new Notification(
                `⏱️ ${timerName} finished!`
            );

        }

    }


    // ------------------------------
    // ESCAPE TIMER TEXT
    // ------------------------------

    function escapeTimerText(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    // ------------------------------
    // START
    // ------------------------------

    console.log(
        "DAYLY loaded successfully!"
    );

});