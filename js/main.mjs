import { CoronaController } from './controller/corona.controller.mjs';

window.onload = function () {
  const cc = new CoronaController();
  cc.makeChart();
  cc.makeTopTable();
  cc.makeMapSvg();
  cc.makeRegionList();

  //탭 구현
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
};
