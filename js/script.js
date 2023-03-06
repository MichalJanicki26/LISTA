{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const taskToggleDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleAllDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done")
        toggleDoneButtons.forEach((toggleDoneButon, index) => {
            toggleDoneButon.addEventListener("click", () => {
                taskToggleDone(index);
            });
        });
    };

    const renderTasks = () => {
        let tasksListHTML = "";
        let renderedTasks = hideDoneTasks ? tasks.filter((task) => task.done === false) : tasks;

        for (const task of renderedTasks) {
            tasksListHTML += `
                <li class="list__item js-task">
                    <button class="list__uncheckedButton js-done">${task.done ? "✓" : ""}</button>
                    <a class="list__task${task.done ? " taskCrossed" : ""}">${task.content}</a>
                    <button class="list__removeButton js-remove">
                    X
                    </button>
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = tasksListHTML;
        bindEvents();
    };

    const renderButtons = () => {
        const headButtons = document.querySelector(".js-headButtons")
        const allHidden = hideDoneTasks;
        const allDone = !tasks.find((task) => task.done === false);

        if (tasks.length > 0) { headButtons.innerHTML = `<button class="list__head--buttons--button js-hideButton">${allHidden ? "Pokaż ukończone" : "Ukryj ukończone"}</button><button class="list__head--buttons--${allDone ? "button--disabled" : "button"} js-doneButton">Ukończ wszystkie</button>` }
        else { headButtons.innerHTML = `` };
    };

    const bindButtonsEvents = () => {
        bindDoneEvents();
        bindToggleDoneEvents();
    };

    const bindDoneEvents = () => {
        const doneButton = document.querySelector(".js-doneButton");

        doneButton && doneButton.addEventListener("click", () => {
            toggleAllDone();
            render();
        });
    };

    const bindToggleDoneEvents = () => {
        const hideButton = document.querySelector(".js-hideButton");

        hideButton && hideButton.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;
            render();
        });
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        newTask.value = "";
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};
