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
            { ...tasks[taskIndex], done: !tasks[taskIndex].done},
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleAllDone = () => {
        tasks = tasks.map((task) => {
            return {...task, done: true}
        });
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
        let renderedTasks = hideDoneTasks ? tasks.filter((task) => task.done===false) : tasks;

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

        const allDone = !tasks.find((task) => task.done===false);
        console.log({allDone});

        if(tasks.length > 0) {headButtons.innerHTML = `<button class="list__button js-hideButton">ukryj zrobione</button><button class="list__button js-doneButton"${allDone ? "disabled" : ""}>odznacz wszystkie</button>`}
        else {headButtons.innerHTML = ``};
    };

    const bindButtonsEvents = () => {
        const hideButton = document.querySelector(".js-hideButton");
        const doneButton = document.querySelector(".js-doneButton");

        hideButton && hideButton.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;
            render();
        });

        doneButton && doneButton.addEventListener("click", () => {
            toggleAllDone();
            render();
        });
    };

    const bindRemoveEvents = () => { };

    const bindToggleDoneEvents = () => {

    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
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

//atrybut disabled w przyciskach