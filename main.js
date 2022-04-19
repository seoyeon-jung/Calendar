const date = new Date();

const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

const prevLast = new Date(viewYear, viewMonth, 0);
const thisLast = new Date(viewYear, viewMonth+1, 0);

const prevDate = prevLast.getDate();
const prevDay = prevLast.getDay();

const thisDate = thisLast.getDate();
const thisDay = thisLast.getDay();

const prevDates = [];
const thisDates = [...Array(thisDate + 1).keys().slice(1)];
const nextDates = [];

const dates = prevDates.concat(thisDates, nextDates);

document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

// 지난 달의 마지막 날짜부터 1씩 줄어든 값을 unshift 메서드를 통해 앞쪽으로 채워넣기
// 지난달 마지막 요일이 토요일(6)이면 그릴 필요가 없다
if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
        prevDates.unshift(prevDate - i);
    }
}

// 다음 달을 표현할 날짜들
// 이번달 마지막 날짜의 요일을 기준으로 필요한 날짜들을 파악해서 1씩 증가시키며 채워넣기
for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i);
}

dates.forEach((date, i) => {
    dates[i] = `<div class="date">${date}</div>`;
})

document.querySelector('.dates').innerHTML = dates.join('');