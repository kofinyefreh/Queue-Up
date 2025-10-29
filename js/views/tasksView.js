import * as help from '../helpers.js';

const taskList = document.querySelector('.task-list');

export const renderTasks = function (tasks) {
  taskList.innerHTML = '';
  if (!tasks) return;

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
                  <div>
                    <span class="left">

                      <div class="circle done ${task.completed && 'full'}">
                          <span><i class="fa-solid fa-check tick"></i></span>
                      </div>

                      <p class="task-name ${
                        task.completed
                          ? 'strike'
                          : task.archived
                          ? 'grey-text'
                          : ''
                      }" contenteditable="true" >
                        ${help.capitalizeTask(task.taskName)}
                      </p>
                    </span>
                    <div class="task--details">
                      <p class="date">${help.formatDate(task.time)}</p>
                      <p class="edited hidden">Edited</p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="circle archive ${
                      task.archived && 'archived-full'
                    }"
                    }></div>
                    <div class="circle delete"></div>
                  </div>
    `;

    li.classList.add('task', `${index}`);
    taskList.appendChild(li);

    // Scroll first element into view
    // li.scrollIntoView(/*{ behavior: 'smooth' }*/);
  });
};
