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

    const taskIndex = 1

    const removeTask = () => {
        tasks = [
            ...tasks.splice(taskIndex),
        ];
        render();
    };

    const taskDone = () => {
        tasks = [

            { ...tasks[taskIndex], done: true},

        ];
        render()
    };


    // const toggleAllTasksDone = () => {
    //     allTasksDone = tasks.map(({done}) => done);
    // };


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
                taskDone(index);
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
        // if {}
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