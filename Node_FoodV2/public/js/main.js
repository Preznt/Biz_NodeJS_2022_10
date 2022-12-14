document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.today.input");
  const fd_table = document.querySelector("table.today");
  const todayInputs = document.querySelectorAll("input");
  const tds = document.querySelectorAll("tbody td");

  btnInput?.addEventListener("click", () => {
    /**
     * for of
     * ES6 에서 추가된 새로운 반복문
     * 기존에는 배열을 사용하여 반복할때 다음의 코드를 사용했다
     *      for(let i = 0; i < 배열,length ; i++) : 코드가 다소 번거롭다
     *      배열.forEach() : 동기화 오류를 가끔범한다
     *
     * 다음 코드에서 결과는 1+ 2+ 3 + 4 + 5 가 출력될것으로 기대한다
     * 그런데 간혹 동기화 문제로 forEach() 완성되기 전에
     * console 출력이 먼저 실행되어 엉뚱한 결과를 내기도 한다
     * 이러한 문제를 동기화 문제라고 한다.
     * 동기화 문제를 일으키지 않도록 하기 위하여 전통적 for() 사용한다
     * 하지만 전통적 for()는 다소 코드가 번거롭다
     * const 배열 = [1,2,3,4,5]
     * let 합계 = 0
     * 배열.forEach( 요소=>{
     *      합계 += 요소
     * })
     * console.log(합계)
     *
     * 그래서 ES6 에서 탄생한 새로운 for() 명령문이다
     *      for( 요소 of 배열) {}
     */
    for (const [index, tag] of todayInputs.entries()) {
      console.log(tag.value);
      const value = tag.value;
      if (!value) {
        alert(`값을 입력해주세요\n"${tag.title}"`);
        tag.select(); // tag.focus() 를 포함한다
        return false;
        ("");
      }
    } // end for
    // 유효성 검사가 끝나면 server 로 데이터를 전송하기
    document.querySelector("form.today").submit();
  });

  const fdclickHandler = (tag) => {
    const target = tag.target;
    const parentTR = target.closest("TR");
    const childTD = parentTR.children;

    for (let i = 0; i < childTD.length - 1; i++) {
      todayInputs[i].value = childTD[i].textContent;
    }

    // Array.from(childTD).forEach((TD, index) => {
    //   todayInputs[index].value = TD.textContent;
    // });
    // 위에 for문을 할때는 childTD에 Array.from 안해도 실행되는데
    // 아래 반복문은 써줘야하는 이유는?

    // 서버에서 보내온 todays라는 데이터를 이용해서 클릭하면
    // 그 테이블이 몇번인지를 찾아서 그 객체의 속성의 값을 하나씩 넣어주려고 했지만
    // 표를 화면에 보여줄때 따로 정렬을 해줘서 순서가 바뀌어버렸다..
    // const fd_index = parentTR.dataset.seq;
    // todayInputs[0].value = todays[fd_index].t_date;
  };

  // fd_table?.addEventListener("click", fdclickHandler);
});
