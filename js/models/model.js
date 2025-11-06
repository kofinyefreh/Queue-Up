console.log('Model.js');

export const state = {
  selectedSpace: null,
  selectedTab: 'all',
  selectedTask: null,
  spaces: [],
  tasks: [],
};

// validate input logic
export function validateInput(value, num) {
  const trimmed = value.trim();
  if (trimmed.length === 0)
    return { valid: null, msg: `Not more than ${num} chars` };
  if (trimmed.length > num)
    return { valid: false, msg: `Should be <= ${num} chars` };
  return { valid: true, msg: `Not more than ${num} chars` };
}
