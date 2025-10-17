const taskList = document.querySelector('.task-list');

export function markAsComplete(handler) {
  // Select DomEl
  taskList.addEventListener('click', function (e) {
    // if (!e.target.closest('.left')) return;
    if (!e.target.closest('.done')) return;
    console.log(e.target);

    const item = e.target.closest('.left');
    const taskName = item.querySelector('.task-name');
    const completedIcon = item.querySelector('.done');
    taskName.classList.toggle('strike');
    completedIcon.classList.toggle('full');

    handler(taskName.textContent.trim(), 'completed');
  });
}
