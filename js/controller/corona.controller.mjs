/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
import { CoronaService } from '../service/corona.service.mjs';

let corona_service = new CoronaService();

export class CoronaController {
  constructor() {}
  getCoronaInfo() {
    corona_service.getCoronaInfo();
  }
  testConsole() {
    corona_service.consolelog();
  }
}

export function test() {
  console.log('test');
}
