// date 객체 생성
let date = new Date();

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // 해당 연도/월 나타내기
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  // 지난달 마지막 날짜(date), 이번 달 마지막 날짜(date)
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // 배열들
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  /* 지난 달 날짜 가져오기 
  - 만약 지난 달 마지막 요일이 토요일(6)이라면 굳이 그릴 필요 없음
  - 지난 달의 마지막 날짜부터 1씩 줄어든 값을 unshift 메서드를 통해 prevDates 배열 앞쪽에 채워준다
  - unshift 메서드 : 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환
  */
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  /* 다음 달 날짜 가져오기
  - 이번 달 마지막 날짜의 요일을 기준으로 필요한 개수 파악
  - 1부터 1씩 중가하여 nextDates 배열에 채워준다 (배열 끝부분에 push로 배열값 추가)
   */
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // concat : 새로운 배열을 반환해주는 배열의 메서드 중 하나
  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  // dates 계산하기
  // 이번달이면 this, 아니면 other (글자에 투명도를 줘서 구분을 해주기 위해서)
  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
    dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });

  document.querySelector('.dates').innerHTML = dates.join('');

  // 오늘 날짜 계산하기
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

renderCalender();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

const goToday = () => {
  date = new Date();
  renderCalender();
};