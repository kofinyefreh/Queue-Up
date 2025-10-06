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
                      <div class="circle done"></div>
                      <p class="task-name">
                        ${help.capitalizeTask(task.taskName)}
                      </p>
                    </span>
                    <div class="task--details">
                      <p class="date">${help.formatDate(task.time)}</p>
                      <p class="edited hidden">Edited</p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="circle edit"></div>
                    <div class="circle archive"></div>
                    <div class="circle delete"></div>
                  </div>
    `;

    li.classList.add('task', `${index}`);
    taskList.appendChild(li);

    // Scroll first element into view
    // li.scrollIntoView(/*{ behavior: 'smooth' }*/);
  });
};
