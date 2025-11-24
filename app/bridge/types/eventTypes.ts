export interface EventsData {
  _embedded: Embedded;
  page: Page;
}
export interface Embedded {
  events?: (EventsEntity)[] | null;
}
export interface EventsEntity {
  name: string;
  type: string;
  id: string;
  
  locale: string;
  images?: (ImagesEntity)[] | null;
  dates: Dates;

  info?: string | null;
  pleaseNote?: string | null;
 
  _embedded: Embedded1;
  nameOrigin?: string | null;
}
export interface ImagesEntity {
  url: string;
  width: number;
  height: number;
  fallback: boolean;
  ratio?: string | null;
}

export interface Public {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}
export interface PresalesEntity {
  startDateTime: string;
  endDateTime: string;
  name: string;
}
export interface Dates {
  start: Start;
  timezone?: string | null;
  status: Status;
  spanMultipleDays: boolean;
}
export interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}
export interface Status {
  code: string;
}





export interface Embedded1 {
  venues?: (VenuesEntity)[] | null;
}
export interface VenuesEntity {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url?: string | null;
  locale: string;
  postalCode: string;
  timezone: string;
  city: City;
  state: State;
  country: Country;
  address: Address;
  location: Location;

  generalInfo?: GeneralInfo | null;

}
export interface ImagesEntity1 {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}
export interface City {
  name: string;
}
export interface State {
  name: string;
  stateCode: string;
}
export interface Country {
  name: string;
  countryCode: string;
}
export interface Address {
  line1: string;
}
export interface Location {
  longitude: string;
  latitude: string;
}

export interface GeneralInfo {
  generalRule: string;
  childRule: string;
}


export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}


  export interface Event{
      id: string;
      title: string,
      description:string
      date: string,
      venue:string,
      address:string,
        latitude: string|null,
    longitude: string|null,

      url:string
      isFavourite?:boolean
    }