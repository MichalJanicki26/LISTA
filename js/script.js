{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map;
        //
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render()
    };


    const toggleAllTasksDone = () => {
        tasks = tasks.map;
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
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let tasksListHTML = "";

        for (const task of tasks) {
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

    const renderButtons = () => { };

    const bindButtonsEvents = () => {
        // if
    };

    const bindRemoveEvents = () => { };

    const bindToggleDoneEvents = () => { };

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