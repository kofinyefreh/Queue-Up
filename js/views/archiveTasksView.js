import * as help from '../helpers.js';

const taskList = document.querySelector('.task-list');

export const renderArchivedTasks = function (tasks) {
  taskList.innerHTML = '';
  if (!tasks) return;

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
                  <div>
                    <span class="left">
                      <div class="circle done">
                          <span><i class="fa-solid fa-check tick"></i></span>
                      </div>

                      <p class="task-name ${task.archived ? 'grey-text' : ''}" >
                        ${help.capitalizeTask(task.taskName)}
                      </p>
                    </span>
                    <div class="task--details">
                      <p class="date">${help.calcDays(task.time)}</p>
                      <p class=${task.edited ? 'tag' : 'hidden'}>Edited</p>
                      <p class="tag">Archived</p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="circle archive"></div>
                  </div>
    `;

    li.classList.add('task', `${index}`);
    taskList.appendChild(li);

    // Scroll first element into view
    // li.scrollIntoView(/*{ behavior: 'smooth' }*/);
  });
};
