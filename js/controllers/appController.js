import * as spaceController from './spaceController.js';
import * as taskController from './taskController.js';

spaceController.initSpaces();
taskController.initTasks();

if (window.innerWidth < 900) {
  console.log('works');
}
