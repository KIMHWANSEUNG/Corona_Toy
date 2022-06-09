/**
 * @class Model
 *
 * Manages the data of the application.
 */

export class CoronaModel {
  constructor() {
    //나라 이름
    this.countryNm = '';
    //코로나19 확진자 수(전체)
    this.totalCnt = '';
    // 코로나19 완치자 수
    this.recCnt = '';
    // 코로나19 사망자 수
    this.deathCnt = '';
    // 코로나19 치료중인 확진자 수
    this.isolCnt = '';
    // 코로나19 발생률
    this.qurRate = '';
    // 전일대비(확진)
    this.incDec = '';
    // 전일대비(확진-지역)
    this.incDecK = '';
    // 전일대비(확진-해외)
    this.incDecF = '';
  }
}
