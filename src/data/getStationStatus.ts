import axios from 'axios';
import { IStationStatus } from '../interfaces/stations';

export const getStationStatus = async (): Promise<{ stations: IStationStatus[] }> => {
  const data = await axios.get('https://gbfs.citibikenyc.com/gbfs/fr/station_status.json');
  return data.data;
};

export const getStationStatusById = async (id: string): Promise<IStationStatus | null> => {
  const data = await getStationStatus();
  const station = data.stations.find(station => station.legacy_id === id);

  if (!station) {
    return null;
  }
  
  return station;
}