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
        //실시간 현황표
        document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =
          data.korea['totalCnt'];
        document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML =
          data.korea['deathCnt'];
        document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML =
          data.korea['isolCnt'];
        document.getElementById('today_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =
          data.korea['incDecK'];

        //지역 리스트
        let region_tbody = document.getElementById('region_table_body');
        for (var val in data) {
          if (data[val]['countryNm'] === '합계' || data[val]['countryNm'] === '검역' || data[val]['countryNm'] === undefined) {
            continue;
          }

          var row = region_tbody.insertRow(region_tbody.rows.length);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);

          cell1.innerHTML = data[val]['countryNm'];
          cell2.innerHTML = data[val]['incDecK'];
          cell3.innerHTML = data[val]['totalCnt'];
          cell4.innerHTML = data[val]['deathCnt'];
        }
      });
  }
}
