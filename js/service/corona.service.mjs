/**
 * @class Service
 *
 * Manages the data of the application.
 */

class CoronaService {
  constructor() {}

  getCoronaInfo() {
    fetch('https://api.corona-19.kr/korea/beta/?serviceKey=hHwO849npqDe2W5lkysVxAGmPMZir7zjg')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  consolelog() {
    console.log('test11');
  }
}
export { CoronaService };
