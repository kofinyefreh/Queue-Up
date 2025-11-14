const mainText = document.querySelector('.main-text');

// Auto typing functionality
const text = 'Organize it all with Queue up One space at a time.';
let array = [];

function AutoType(text) {
  text.split('').forEach((element, index) => {
    setTimeout(() => {
      array.push(element);
      mainText.textContent = array.join('');
    }, index * 50);
  });
}

AutoType(text);
