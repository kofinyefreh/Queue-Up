const profileDom = document.querySelector('.profile');
const profileScreen = document.querySelector('.profile-screen');
const profileOverlay = document.querySelector('.profile-overlay');
const profileNameDom = document.querySelector('.profile-name');
const numSpaces = document.querySelector('.num-spaces');
const numQueues = document.querySelector('.num-queues');
const completedPercentage = document.querySelector('.percentage-completed');
const pendingPercentage = document.querySelector('.percentage-pending');
const accountDate = document.querySelector('.account-date');
const profileFullName = document.querySelector('.profile-full-name');

export function UpdateProfileView({
  profile,
  profileName,
  Spaces,
  Queues,
  percentageCompleted,
  percentagePending,
  accountDate,
}) {
  profileDom.textContent = profile;
  profileNameDom.textContent = profile;
  profileFullName.value = profileName;
  numSpaces.textContent = Spaces;
  numQueues.textContent = Queues;
  completedPercentage.textContent = percentageCompleted;
  pendingPercentage.textContent = percentagePending;
  accountDate.textContent = accountDate;
}

export function openProfile() {
  profileScreen.classList.remove('hidden');
  profileOverlay.classList.remove('hidden');
}

export function closeProfile() {
  profileScreen.classList.add('hidden');
  profileOverlay.classList.add('hidden');
}

// Event Listeners
export function onOpenProfile(handler) {
  profileDom.addEventListener('click', function () {
    handler();
  });
}

export function onCloseProfile(handler) {
  profileOverlay.addEventListener('click', function () {
    handler();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      handler();
    }
  });
}
