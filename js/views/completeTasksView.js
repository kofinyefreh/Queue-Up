import * as help from '../helpers.js';

const taskList = document.querySelector('.task-list');

export const renderCompletedTasks = function (tasks) {
  taskList.innerHTML = '';
  if (!tasks) return;

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
                  <div>
                    <span class="left">
                      <div class="circle done full">
                          <span><i class="fa-solid fa-check tick"></i></span>
                      </div>

                      <p class="task-name ${task.completed && 'strike'}" >
                        ${help.capitalizeTask(task.name)}
                      </p>
                    </span>
                    <div class="task--details">
                    <p class="date"><i class="fa-regular fa-clock"></i>${help.calcDays(
                      task.time
                    )}</p>
                      <p class=${task.edited ? 'tag' : 'hidden'}>Edited</p>
                      <p class=${task.archived ? 'tag' : 'hidden'}>Archived</p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="circle disactive"></div>
                    <div class="circle disactive"></div>
                  </div>
    `;

    li.classList.add('task', `${index}`);
    taskList.appendChild(li);
  });
};
