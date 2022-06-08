import { CoronaService } from '../service/corona.service.mjs';
import fetch from 'node-fetch';
globalThis.fetch = fetch;
const request = require('request');
const expect = require('chai').expect;

const service = new CoronaService();
const chai = require('chai'),
  nock = require('nock'),
  chaiHttp = require('chai-http');

//chai에 chaiHttp 전달
chai.use(chaiHttp);

// describe('계산기 테스트', function () {
//   it('1+1은 2를 반환해라', function (done) {
//     assert.equal(1 + 1, 2);
//     done();
//   });

//   it('2*2 는 4를 반환해라', function (done) {
//     assert.equal(2 * 2, 4);
//     done();
//   });
// });

// describe('Get star war movies', () => {
//   it('should get 7', async () => {
//     await fetch('http://swapi.co/api/films/')
//       .then(res => {
//         return res.json();
//       })
//       .then(res => {
//         console.log(res);
//       });
//   });
// });

const CoronaInfo = [
  {
    busan: {
      countryNm: '부산',
      deathCnt: 2133,
      incDec: 190,
      incDecF: 1,
      incDecK: 189,
      isolCnt: 1089421,
      qurRate: 32580,
      recCnt: 0,
      totalCnt: 1091554,
    },
  },
];

describe('corona test', () => {
  before(function () {
    nock('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg').get('').reply(200, CoronaInfo);
  });
  it('코로나 api 가져오기', function (done) {
    service
      .getCoronaInfo2()
      .then(() => done())
      .catch(err => {
        console.log('err:' + err);
        done(err);
      });
  });
  after(function () {
    nock.cleanAll();
  });
});

// describe('코로나 API 테스트', function () {
//   it('200을 리턴해야 한다.', function (done) {
//     request.get('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg', function (err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       done();
//     });
//   });
// });
