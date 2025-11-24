import { EventsData } from "../types/eventTypes";
import ENDPOINTS from "./ApiEndpoints";
import ApiMethods from "./ApiMethods";

class ApiManager {
  static getEvents = (params: {
    apikey: string;
    classificationName?: string;
    dmaId?: number;
    page?: number;
    size?: number;
    keyword?:string
    [key: string]: any;
  }) => {
    return ApiMethods.get<EventsData>(ENDPOINTS.EVENTS.LIST, params);
  };
}
export default ApiManager