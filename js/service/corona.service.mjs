/**
 * @class Service
 *
 * Manages the data of the application.
 */

import { CoronaModel } from '../model/corona.model.mjs';
let corona_info;
export class CoronaService {
  constructor() {
    this.coronaInfo = this.getCoronaInfo();
    this.coronaTotalInfo = this.getCoronaTotalInfo();
  }

  getTopTableInfo() {
    return this.coronaTotalInfo.then(data => {
      let TopTableInfo;
      TopTableInfo = data.korea;
      return TopTableInfo;
    });
  }

  getRegionTableInfo() {
    return this.coronaInfo.then(data => {
      let RegionTableInfo;
      RegionTableInfo = data;
      return RegionTableInfo;
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

  getCoronaInfo() {
    return new Promise((resolve, reject) => {
      fetch('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg')
        .then(res => res.json())
        .then(data => {
          const map = new Map();
          for (var val in data) {
            if (data[val]['countryNm'] === '합계' || data[val]['countryNm'] === '검역' || data[val]['countryNm'] === undefined) {
              continue;
            }

            const corona_model = new CoronaModel();
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

          resolve(map);
        });
    });
  }

  getCoronaTotalInfo() {
    return new Promise((resolve, reject) => {
      fetch('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg')
        .then(res => res.json())
        .then(data => {
          const map = new Map();
          for (var val in data) {
            const corona_model = new CoronaModel();
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

          resolve(map);
        });
    });
  }
}
