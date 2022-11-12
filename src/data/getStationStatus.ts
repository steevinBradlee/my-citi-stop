import axios from 'axios';
import { IStationStatus } from '../interfaces/stations';

export const getStationStatus = async (): Promise<IStationStatus[]> => {
  const data = await axios.get('https://gbfs.citibikenyc.com/gbfs/fr/station_status.json');
  const { stations } = data?.data?.data;
  return stations.map(obj => ({
    ...obj,
    legacy_id: Number.parseInt(obj.legacy_id),
    station_id: Number.parseInt(obj.station_id)
  }));
};

export const getStationStatusById = async (id: number): Promise<IStationStatus | null> => {
  const stations = await getStationStatus();
  const station = stations.find(station => station.legacy_id === id);

  if (!station) {
    return null;
  }
  
  return station;
}