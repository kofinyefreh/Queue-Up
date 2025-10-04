// Utility to format date
export function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function capitalize(input) {
  const trimmed = input.trim();
  if (trimmed.includes(' ')) {
    const mulWords = trimmed.split(' ').map(word => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    });
    return mulWords.join(' ');
  } else return `${trimmed.slice(0, 1).toUpperCase()}${trimmed.slice(1)}`;
}

export function capitalizeTask(input) {
  const trimmed = input.trim();
  return `${trimmed.slice(0, 1).toUpperCase()}${trimmed.slice(1)}`;
}
