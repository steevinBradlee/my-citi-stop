
export interface IStationStatus {
  legacy_id: number;
  station_id: number;
  num_bikes_available: string;
  num_bikes_disabled: string;
  num_docks_available: string;
  num_docks_disabled: string;
  num_ebikes_available: string;
}

export type RentalMethods = 'CREDITCARD' | 'KEY';
export type StationType = 'classic';

export interface IStationInfo {
  eightd_has_key_dispenser: boolean,
  region_id: number,
  lon: number,
  eightd_station_services: string[],
  rental_uris: {
    ios: string,
    android: string
  },
  short_name: number,
  station_type: StationType,
  external_id: string,
  legacy_id: number,
  electric_bike_surcharge_waiver: string,
  name: string,
  station_id: number,
  capacity: number,
  has_kiosk: string,
  rental_methods: RentalMethods[],
  lat: number
}