/**
 * express import 하고
 * express.Router() 함수를 사용하여 router 객체 선언
 * router 객체를 export 하여 모듈 선언 완성
 *
 * http://localhost:3000/city 로 요청할 경우
 * "안녕하세요 도시 정보 입니다~~"라고 화면에 나타나도록
 * app.js 에 설정
 */

import express from "express";
import mysql from "../modules/mysqlDB.js"; // 연결할 준비까지만

const router = express.Router();

// http://localhost:3000/city/ 의 요청처리
router.get("/", (req, res) => {
  //   res.send("안녕하세요 도시 정보 입니다~~~");
  const citySelect = "SELECT * FROM city Limit 0, 10";

  /**
   * mysql 객체(퀵배달)를 통하여 MySQL Server 에게
   * SQL(SELECT)를 보내고, 결과가 되돌아 오는 동안
   * 다른일( 코드, 기능)을 수행하라
   * 만약 MySQL Server 에서 데이터가 완료되어 되돌아오거든
   * (error,result, fields) =>{} 이 함수를 실행하라
   * 이 함수를 비동기(Async) CallBack 함수 라고 한다
   */

  mysql.query(citySelect, (error, result, fields) => {
    res.json(result);
  });
});

/**
 * localhost:3000/city/pop/10000/50000 이라고 요청을하면
 * 인구 1만이상 5만 이하의 도시를 웹으로 Response 하시오
 * RequestParam 방식으로 데이터 전달하기
 * 마치 주소가 이미 만들어 진것처럼 보내서
 * 변수를 노출하지 않는다
 * 꼭 변수 2개 다 보내줘야한다
 * 최근에 많이 사용되는 방법
 *
 * lt : <
 * gt : >
 */

router.get("/pop/:lt_pop/:gt_pop", (req, res) => {
  const lt_pop = req.params.lt_pop;
  const gt_pop = req.params.gt_pop;
  const populationCity =
    "SELECT * FROM city WHERE population >= ? && population <= ? ORDER BY population DESC";
  mysql.execute(populationCity, [lt_pop, gt_pop], (err, result, f) => {
    res.json(result);
  });
});

// http://localhost:3000/city/pop/?gt_pop=10000&lt_pop=50000
// http://localhost:3000/city/pop/lt_pop=50000&?gt_pop=10000
// queryString : 주소표시줄에
//      ?변수명=값 형식으로 데이터 전달하기
//      주소표시줄에 변수명이 노출되므로 보안에 취약하다
router.get("/pop", (req, res) => {
  const gt_pop = req.query.gt_pop;
  const lt_pop = req.query.lt_pop;
  const populationCity =
    "SELECT * FROM city WHERE population >= ? && population <= ? ORDER BY population DESC";
  mysql.execute(populationCity, [lt_pop, gt_pop], (err, result, f) => {
    res.json(result);
  });
});

// http://localhost:3000/city/country 의 요청처리
router.get("/country", (req, res) => {
  //   res.send("나는 국가 정보 입니다");
  const countrySelect = "SELECT * FROM country Limit 0,10";
  mysql.query(countrySelect, (err, data, fields) => {
    res.json(data); // 테이블로 보냈는데 json을 바꿨기 때문에
  });
});

/**
 * http://localhost:3000/country/100/500
 * 각 국가의 GNP가 100 이상 500 이하인 국가 리스트 SELECT
 *
 * http://localhost:3000/country/100
 * 각 국가의 GNP 가 0이상 100 이하인 국가 리스트 SELECT
 *
 * 이 두개의 요청을 한개의 router.get() 에서 처리
 */

// router.get("/country/:lt_pop?/:gt_pop", (req, res) => {
//   const gt_pop = req.params.gt_pop;
//   const lt_pop = req.params.lt_pop;
//   const nation =
//     "SELECT * FROM country WHERE GNP >= ? && GNP <= ? ORDER BY GNP DESC";

//   if (lt_pop) {
//     mysql.execute(nation, [lt_pop, gt_pop], (err, result, f) => {
//       res.json(result);
//     });
//   } else {
//     mysql.execute(nation, [0, gt_pop], (err, result, f) => {
//       res.json(result);
//     });
//   }
// });

// http:loaclahost:3000/country/100/200 에 대한 응답
// http://localhost:3000/country/100 처럼 요청을 하면
//    없는 URI 라고 거부(Not Found Error)
// 두가지 Req 를 처리하기 위하여
// RequestMapping("/country/...")을 배열로 선언하여
// 두가지 Req를 일단 모두 받도록 처리한다.
// Mulit RequestMapping이라고 한다.
router.get(["/country/:start/:end", "/country/:end"], (req, res) => {
  // 변수가 2개일때, 또는 변수가 1개일때 어떻게 처리할 것인가
  // let start = req.params.start;
  // const end = req.params.end;
  /**
   * 객체의 구조분해
   * req.params 에 있는 sub 속성들 중에서
   * start, end 를 추출하여 같은 이름의 변수를 생성하고
   * 그 변수에 값을 저장해 달라
   */
  let { start, end } = req.params;
  console.log(start, end);
  // if (!start) {
  //   start = 0;
  // }
  start = start || 0;
  // start 값이 있으면 start 값을 담고 없으면 0을 담아라

  console.log(start, end);
  const sql = "SELECT * FROM country WHERE gnp BETWEEN ? AND ?";
  mysql.execute(sql, [start, end], (err, result, field) => {
    res.json(result);
  });
});
// 선택적 파라메터 RequestMapping
router.get("/gnp/:start?/:end?", (req, res) => {
  let { start, end } = req.params;
  console.log(start, end);
  // city/gnp/100 처럼 1개의 데이터만 전송을 하면
  // start = 100, end = undefined 가 담기게 된다
  // 일단 end 값이 undefined 이면 0으로 세팅을 한다
  end = end || 0;
  // city/gnp/100 처럼 1개의 데이터만 전송을 했다면
  // start =100, end = 0 으로 세팅이 될것이다

  // start 와 end 가 서로 바뀐상태
  // start 와 end 를 서로 교환하기
  if (end === 0) {
    // const _t = start;
    // start = end;
    // end = _t;
    // XOR(배타적 논리연산, 같은값은 0. 다른값은 1인 논리연산)
    // 을 이용한 두 변수의 값 교환하기(변수의 Swap)
    start = start ^ end;
    end = start ^ end;
    start = start ^ end;
  }

  const sql = "SELECT * FROM country WHERE gnp BETWEEN ? AND ?";
  mysql.execute(sql, [start, end], (err, result, feild) => {
    res.send(result);
  });
});

/**
 * 현재 여기의 요청 처리는 start 변수와 end 변수를 전달받아 처리를 한다
 * country/100/300 처럼 2개의 변수를 모두 전달하면
 * start = 100, end = 300 의 값이 변수에 담기게 된다
 *
 * 만약
 * country/100 처럼 1개의 변수만 전달하면
 * start = undefined, end = 100의 값이 변수에 담기게 된다
 * 만약 start 가 undefined 이면 start = 0 으로 세팅하면 된다
 */

// localhost:3000/city/도시이름 이라고 요청을 하면
// :name 은 입력한 도시이름이 name이라는 변수에 담긴다
router.get("/:name", (req, res) => {
  const ct_name = req.params.name; // 여기에는 암스테르담이라는 문자가 담겨있는 것
  const citySelectWhere = "SELECT * FROM city WHERE name = ?";
  mysql.execute(citySelectWhere, [ct_name], (err, result, f) => {
    res.json(result);
  });
});

export default router;
