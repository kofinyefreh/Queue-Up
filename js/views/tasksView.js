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
                      <div class="circle done" title="complete">
                      <span><i class="fa-solid fa-check tick"></i></span>
                      </div>

                      <p class="task-name" contenteditable="true" >
                        ${help.capitalizeTask(task.name)}
                      </p>
                    </span>
                    <div class="task--details">
                      <p class="date">
                      <i class="fa-regular fa-clock"></i>${help.calcDays(
                        task.time
                      )}
                      </p>
                      <p class=${task.edited ? 'tag' : 'hidden'}>Edited</p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="circle archive" title="archive"></div>
                    <div class="circle delete" title="delete"></div>
                  </div>
    `;

    li.classList.add('task', `${index}`);
    taskList.appendChild(li);
  });
};
