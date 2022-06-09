/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */

import { CoronaService } from '../service/corona.service.mjs';
import { CoronaView } from '../view/corona.view.mjs';

export class CoronaController {
  constructor() {
    this.coronaView = new CoronaView();

    // 상단 현황판 테이블 생성
    this.coronaView.makeTopTable();
    //차트 생성
    this.coronaView.makeChart();
    //탭 지역리스트
    this.coronaView.makeRegionList();
    //맵 svg 생성
    this.coronaView.makeMapSvg();
  }

  // makeTopTable() {
  //   return this.coronaView.makeTopTable();
  // }

  // makeChart() {
  //   return this.coronaView.makeChart();
  // }

  // makeRegionList() {
  //   return this.coronaView.makeRegionList();
  // }

  // makeMapSvg() {
  //   return this.coronaView.makeMapSvg();
  // }
}
