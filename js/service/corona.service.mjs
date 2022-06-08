/**
 * @class Service
 *
 * Manages the data of the application.
 */

import { Corona } from '../model/corona.model.mjs';
export class CoronaService {
  constructor() {}

  getCoronaInfo() {
    fetch('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // //실시간 현황표
        // document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =
        //   data.korea['totalCnt'];
        // document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML =
        //   data.korea['deathCnt'];
        // document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML =
        //   data.korea['isolCnt'];
        // document.getElementById('today_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =
        //   data.korea['incDecK'];

        // //지역 리스트
        // let region_tbody = document.getElementById('region_table_body');
        // for (var val in data) {
        //   if (data[val]['countryNm'] === '합계' || data[val]['countryNm'] === '검역' || data[val]['countryNm'] === undefined) {
        //     continue;
        //   }

        //   var row = region_tbody.insertRow(region_tbody.rows.length);
        //   var cell1 = row.insertCell(0);
        //   var cell2 = row.insertCell(1);
        //   var cell3 = row.insertCell(2);
        //   var cell4 = row.insertCell(3);

        //   cell1.innerHTML = data[val]['countryNm'];
        //   cell2.innerHTML = data[val]['incDecK'];
        //   cell3.innerHTML = data[val]['totalCnt'];
        //   cell4.innerHTML = data[val]['deathCnt'];
        // }

        // //지도 svg
        // for (var val in data) {
        //   if (data[val]['countryNm'] === '합계' || data[val]['countryNm'] === '검역' || data[val]['countryNm'] === undefined) {
        //     continue;
        //   }
        //   const map_count = document.getElementById(val);
        //   map_count.innerHTML += data[val]['countryNm'];
        //   map_count.innerHTML += data[val]['incDecK'];
        //   //svg 색상변경
        //   if (data[val]['incDecK'] > 2000) {
        //     //500이상
        //     document.getElementById(val + '_svg').style.fill = '#489CFF';
        //   } else if (data[val]['incDecK'] > 1000 && data[val]['incDecK'] <= 2000) {
        //     document.getElementById(val + '_svg').style.fill = '#6CC0FF';
        //   }
        //   console.log(val);
        // }
      });
  }

  // getCoronaInfo2() {
  //   return new Promise((resolve, reject) => {
  //     fetch('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg')
  //       .then(res => res.json())
  //       .then(data => {
  //         resolve(data);
  //       });
  //   });
  // }

  getCoronaInfo3() {
    return new Promise((resolve, reject) => {
      fetch('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg')
        .then(res => res.json())
        .then(data => {
          const map = new Map();
          for (var val in data) {
            const corona_model = new Corona();
            corona_model.countryNm = data[val]['countryNm'];
            corona_model.deathCnt = data[val]['deathCnt'];
            corona_model.incDec = data[val]['incDec'];
            corona_model.incDecF = data[val]['incDecF'];
            corona_model.incDecK = data[val]['incDecK'];
            corona_model.isolCnt = data[val]['isolCnt'];
            corona_model.qurRate = data[val]['qurRate'];
            corona_model.recCnt = data[val]['recCnt'];
            corona_model.totalCnt = data[val]['totalCnt'];
            map[val] = corona_model;
          }
          console.log('getCoronaInfo3');

          resolve(map);
        });
    });
  }
}
