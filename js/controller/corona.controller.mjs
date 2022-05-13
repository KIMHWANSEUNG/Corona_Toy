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
}
