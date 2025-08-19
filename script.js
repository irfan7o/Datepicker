
// Modern Responsive Datepicker
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('datepicker-input');
  const calendar = document.getElementById('datepicker-calendar');
  const monthLabel = document.getElementById('datepicker-month');
  const prevBtn = document.getElementById('datepicker-prev');
  const nextBtn = document.getElementById('datepicker-next');
  const daysRow = document.getElementById('datepicker-days');
  const datesGrid = document.getElementById('datepicker-dates');

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let current = new Date();
  let selected = null;

  function renderDays() {
    daysRow.innerHTML = '';
    DAYS.forEach(day => {
      const d = document.createElement('div');
      d.textContent = day;
      daysRow.appendChild(d);
    });
  }

  function renderDates(year, month) {
    datesGrid.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    // Previous month's dates
    for (let i = firstDay; i > 0; i--) {
      const div = document.createElement('div');
      div.className = 'datepicker-date disabled';
      div.textContent = prevLastDate - i + 1;
      datesGrid.appendChild(div);
    }
    // Current month's dates
    for (let i = 1; i <= lastDate; i++) {
      const div = document.createElement('div');
      div.className = 'datepicker-date';
      div.textContent = i;
      const dateObj = new Date(year, month, i);
      if (
        selected &&
        dateObj.getFullYear() === selected.getFullYear() &&
        dateObj.getMonth() === selected.getMonth() &&
        dateObj.getDate() === selected.getDate()
      ) {
        div.classList.add('selected');
      }
      const today = new Date();
      if (
        dateObj.getFullYear() === today.getFullYear() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getDate() === today.getDate()
      ) {
        div.classList.add('today');
      }
      div.addEventListener('click', function (e) {
        selected = dateObj;
        input.value = formatDate(selected);
        calendar.classList.remove('active');
        renderDates(current.getFullYear(), current.getMonth());
      });
      datesGrid.appendChild(div);
    }
    // Next month's dates
    const totalCells = firstDay + lastDate;
    const nextDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= nextDays; i++) {
      const div = document.createElement('div');
      div.className = 'datepicker-date disabled';
      div.textContent = i;
      datesGrid.appendChild(div);
    }
  }

  function formatDate(date) {
    if (!date) return '';
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  function renderCalendar() {
    monthLabel.textContent = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
    renderDays();
    renderDates(current.getFullYear(), current.getMonth());
  }


  input.addEventListener('click', function (e) {
    calendar.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (!calendar.contains(e.target) && e.target !== input) {
      calendar.classList.remove('active');
    }
  });

  prevBtn.addEventListener('click', function () {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });
  nextBtn.addEventListener('click', function () {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});
