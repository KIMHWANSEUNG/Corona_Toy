/**
 * @class Model
 *
 * Manages the data of the application.
 */

class Corona {
  constructor({ countryNm, totalCnt, recCnt, deathCnt, isolCnt, qurRate, incDec, incDecK, incDecF }) {
    //나라 이름
    this.countryNm = countryNm;
    //코로나19 확진자 수(전체)
    this.totalCnt = totalCnt;
    // 코로나19 완치자 수
    this.recCnt = recCnt;
    // 코로나19 사망자 수
    this.deathCnt = deathCnt;
    // 코로나19 치료중인 확진자 수
    this.isolCnt = isolCnt;
    // 코로나19 발생률
    this.qurRate = qurRate;
    // 전일대비(확진)
    this.incDec = incDec;
    // 전일대비(확진-지역)
    this.incDecK = incDecK;
    // 전일대비(확진-해외)
    this.incDecF = incDecF;
  }
}

export { Corona };
