const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remaining = document.getElementById('remaining');
const bigCup = document.getElementById('bigCup');

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => {
    highlightCups(idx);
  });
});

function highlightCups(idx) {
  if (
    smallCups[idx].classList.contains('full') &&
    (idx == smallCups.length - 1 ||
      !smallCups[idx].nextElementSibling.classList.contains('full'))
  ) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${
      (fullCups / smallCups.length) * bigCup.offsetHeight
    }px`;
    percentage.innerText = `${(fullCups / smallCups.length) * 100}%`;
  }

  if (fullCups === smallCups.length) {
    remaining.style.height = 0;
    remaining.style.visibility = 'hidden';
  } else {
    remaining.style.visibility = 'visible';
    const remainder = 2 - (250 * fullCups) / 1000;
    liters.innerText = `${remainder} ${remainder > 1 ? 'liters' : 'liter'}`;
  }
}
