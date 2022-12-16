import axios from "axios"
import { IStationInfo } from "../interfaces/stations";

export const getStationInfo = async (): Promise<IStationInfo[]> => {
  const data = await axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
  const { stations } = data?.data?.data;
  return stations.map(obj => ({
    ...obj,
    eightd_has_key_dispenser: obj.eightd_has_key_dispenser === 'true',
    region_id: Number.parseInt(obj.region_id),
    lon: Number.parseFloat(obj.lon),
    short_name: Number.parseFloat(obj.short_name),
    legacy_id: Number.parseInt(obj.legacy_id),
    station_id: Number.parseInt(obj.station_id),
    lat: Number.parseFloat(obj.lat)
  }));
};

export const getStationInfoById = async (id: number): Promise<IStationInfo | null> => {
  const stations = await getStationInfo();
  const station = stations.find(station => station.legacy_id === id);

  if (!station) {
    return null;
  }

  return station;
};