import { CoronaService } from '../service/corona.service.mjs';
/**
 * @class View
 *
 * Visual representation of the model.
 */

export class CoronaView {
  constructor() {
    this.coronaService = new CoronaService();
    this.coronaService.getRegionTableInfo();
    this.clickTab();
  }

  makeTopTable() {
    const corona_info = this.coronaService.getTopTableInfo().then(data => {
      //실시간 현황표
      document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML = data['totalCnt'];
      document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML = data['deathCnt'];
      document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML = data['isolCnt'];
      //document.getElementById('total_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[3].innerHTML = data['recCnt'];

      document.getElementById('today_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML = data['incDec'];
      document.getElementById('today_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML = data['incDecK'];
      document.getElementById('today_table_body').getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML = data['incDecF'];
    });
  }

  makeRegionList() {
    const corona_info = this.coronaService.getRegionTableInfo().then(data => {
      //지역 리스트
      let region_tbody = document.getElementById('region_table_body');
      for (let val in data) {
        let row = region_tbody.insertRow(region_tbody.rows.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = data[val]['countryNm'];
        cell2.innerHTML = data[val]['incDecK'];
        cell3.innerHTML = data[val]['totalCnt'];
        cell4.innerHTML = data[val]['deathCnt'];
      }
    });
  }

  makeChart() {
    const corona_info = this.coronaService.getRegionTableInfo().then(data => {
      //차트
      let region_list = [];
      let totalCnt_list = [];
      let deathCnt_list = [];
      let isolCnt_list = [];
      for (let val in data) {
        region_list.push(data[val]['countryNm']);
        totalCnt_list.push(data[val]['totalCnt']);
        deathCnt_list.push(data[val]['deathCnt']);
        isolCnt_list.push(data[val]['isolCnt']);
      }
      let totalCnt_context = document.getElementById('incDecK_Chart').getContext('2d');
      let deathCnt_context = document.getElementById('deathCnt_Chart').getContext('2d');
      let isolCnt_context = document.getElementById('isolCnt_Chart').getContext('2d');
      let totalCnt_Chart = new Chart(totalCnt_context, {
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
      let deathCnt_Chart = new Chart(deathCnt_context, {
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
      let isolCnt_Chart = new Chart(isolCnt_context, {
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
    const corona_info = this.coronaService.getRegionTableInfo().then(data => {
      //지도 svg
      for (let val in data) {
        const map_count = document.getElementById(val);
        map_count.innerHTML += data[val]['countryNm'];
        map_count.innerHTML += data[val]['incDecK'];
        //svg 색상변경
        if (data[val]['incDecK'] > 2000) {
          //500이상
          document.getElementById(val + '_svg').style.fill = '#489CFF';
        } else if (data[val]['incDecK'] > 1000 && data[val]['incDecK'] <= 2000) {
          document.getElementById(val + '_svg').style.fill = '#6CC0FF';
        } else if (data[val]['incDecK'] > 500 && data[val]['incDecK'] <= 1000) {
          document.getElementById(val + '_svg').style.fill = '#7ED2FF';
        }
      }
    });
  }

  //탭 구현
  clickTab() {
    $(function () {
      $('.tabcontent > div').hide();
      $('.tabnav a')
        .click(function () {
          $('.tabcontent > div').hide().filter(this.hash).fadeIn();
          $('.tabnav a').removeClass('active');
          $(this).addClass('active');
          return false;
        })
        .filter(':eq(0)')
        .click();
    });
  }
}
