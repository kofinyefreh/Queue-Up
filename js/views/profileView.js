const profile = document.querySelector('.profile');
const profileScreen = document.querySelector('.profile-screen');
const profileOverlay = document.querySelector('.profile-overlay');
const profileName = document.querySelector('.profile-name');
const numSpaces = document.querySelector('.num-spaces');
const numQueues = document.querySelector('.num-queues');
const completedPercentage = document.querySelector('.percentage-completed');
const pendingPercentage = document.querySelector('.percentage-pending');
const accountDate = document.querySelector('.account-date');

export function UpdateProfileView(handler) {
  handler(
    profile,
    profileName,
    numSpaces,
    numQueues,
    completedPercentage,
    pendingPercentage,
    accountDate
  );
}

export function openProfile() {
  profileScreen.classList.remove('hidden');
  profileOverlay.classList.remove('hidden');
}

export function closeProfile() {
  profileScreen.classList.add('hidden');
  profileOverlay.classList.add('hidden');
}

export function onOpenProfile(handler) {
  profile.addEventListener('click', function () {
    handler();
  });
}

export function CloseProfile(handler) {
  profileOverlay.addEventListener('click', function () {
    handler();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      handler();
    }
  });
}
