import { CoronaService } from '../service/corona.service.mjs';

/**
 * @class View
 *
 * Visual representation of the model.
 */

export class CoronaView {
  constructor() {
    this.coronaService = new CoronaService();
  }

  makeTopTable() {
    const corona_info = this.coronaService.getCoronaInfo3().then(data => {
      //실시간 현황표
      document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =
        data.korea['totalCnt'];
      document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML =
        data.korea['deathCnt'];
      document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML =
        data.korea['isolCnt'];
      document.getElementById('today_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML =
        data.korea['incDecK'];
    });
  }

  makeRegionList() {
    const corona_info = this.coronaService.getCoronaInfo3().then(data => {
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

  makeChart() {
    const corona_info = this.coronaService.getCoronaInfo3().then(data => {
      //차트
      var region_list = [];
      var totalCnt_list = [];
      var deathCnt_list = [];
      var isolCnt_list = [];
      for (var val in data) {
        if (data[val]['countryNm'] === '합계' || data[val]['countryNm'] === '검역' || data[val]['countryNm'] === undefined) {
          continue;
        }
        region_list.push(data[val]['countryNm']);
        totalCnt_list.push(data[val]['totalCnt']);
        deathCnt_list.push(data[val]['deathCnt']);
        isolCnt_list.push(data[val]['isolCnt']);
      }
      var totalCnt_context = document.getElementById('incDecK_Chart').getContext('2d');
      var deathCnt_context = document.getElementById('deathCnt_Chart').getContext('2d');
      var isolCnt_context = document.getElementById('isolCnt_Chart').getContext('2d');
      var totalCnt_Chart = new Chart(totalCnt_context, {
        type: 'bar', // 차트의 형태
        data: {
          // 차트에 들어갈 데이터
          labels: region_list,
          datasets: [
            {
              //데이터
              label: '확진자', //차트 제목
              fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
              data: totalCnt_list,
              //x축 label에 대응되는 데이터 값

              backgroundColor:
                //색상
                'rgba(127, 126, 255, 0.2)',

              borderColor:
                //경계선 색상
                'rgba(127, 126, 255, 1)',

              borderWidth: 1, //경계선 굵기
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: '총 확진자 그래프',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      //차트(사망자)
      var deathCnt_Chart = new Chart(deathCnt_context, {
        type: 'bar', // 차트의 형태
        data: {
          // 차트에 들어갈 데이터
          labels: region_list,
          datasets: [
            {
              //데이터
              label: '사망자', //차트 제목
              fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
              data: deathCnt_list,
              //x축 label에 대응되는 데이터 값

              backgroundColor:
                //색상
                'rgba(255, 99, 132, 0.2)',

              borderColor:
                //경계선 색상
                'rgba(255, 99, 132, 1)',

              borderWidth: 1, //경계선 굵기
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: '총 사망자 그래프',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      //차트(완치자)
      var isolCnt_Chart = new Chart(isolCnt_context, {
        type: 'bar', // 차트의 형태
        data: {
          // 차트에 들어갈 데이터
          labels: region_list,
          datasets: [
            {
              //데이터
              label: '완치자', //차트 제목
              fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
              data: isolCnt_list,
              //x축 label에 대응되는 데이터 값

              backgroundColor:
                //색상
                'rgba(183, 240, 177, 0.2)',

              borderColor:
                //경계선 색상
                'rgba(183, 240, 177, 1)',

              borderWidth: 1, //경계선 굵기
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: '총 완치자 그래프',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
  }

  makeMapSvg() {
    const corona_info = this.coronaService.getCoronaInfo3().then(data => {
      //지도 svg
      for (var val in data) {
        if (data[val]['countryNm'] === '합계' || data[val]['countryNm'] === '검역' || data[val]['countryNm'] === undefined) {
          continue;
        }
        const map_count = document.getElementById(val);
        map_count.innerHTML += data[val]['countryNm'];
        map_count.innerHTML += data[val]['incDecK'];
        //svg 색상변경
        if (data[val]['incDecK'] > 2000) {
          //500이상
          document.getElementById(val + '_svg').style.fill = '#489CFF';
        } else if (data[val]['incDecK'] > 1000 && data[val]['incDecK'] <= 2000) {
          document.getElementById(val + '_svg').style.fill = '#6CC0FF';
        }
        console.log(val);
      }
    });
  }
}
