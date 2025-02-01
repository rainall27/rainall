// Функция для работы с навигационным меню и highlighter'ом
const menuItems = document.querySelectorAll('.menu li');
const highlighter = document.querySelector('.highlighter');
const sections = document.querySelectorAll('.content-section');

function moveHighlighter(activeEl) {
  const offsetLeft = activeEl.offsetLeft;
  const itemWidth = activeEl.offsetWidth;
  highlighter.style.left = offsetLeft + 'px';
  highlighter.style.width = itemWidth + 'px';
}

window.addEventListener('load', () => {
  const activeItem = document.querySelector('.menu li.active');
  if (activeItem) moveHighlighter(activeItem);
});

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Если на странице используется переключение секций (например, index.html)
    sections.forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(item.getAttribute('data-section'));
    if (targetSection) targetSection.classList.add('active');
    // Обновляем активный класс у пунктов меню
    menuItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    moveHighlighter(item);
  });
});

// Работа с аккаунтом
const accountBtn = document.getElementById('account-btn');
const accountDropdown = document.getElementById('account-dropdown');

// Функция для получения данных аккаунта из localStorage
function getAccount() {
  return JSON.parse(localStorage.getItem("account"));
}

if (accountBtn) {
  const account = getAccount();
  if (!account) {
    // Если аккаунт не создан, при клике перенаправляем на страницу создания аккаунта
    accountBtn.addEventListener('click', () => {
      alert("Аккаунт не создан. Пожалуйста, создайте аккаунт.");
      window.location.href = "create.html";
    });
  } else {
    // Если аккаунт существует, стандартное поведение
    accountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      accountDropdown.classList.toggle('active');
    });
  }
}

document.addEventListener('click', (e) => {
  if (accountDropdown && !accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
    accountDropdown.classList.remove('active');
  }
});
