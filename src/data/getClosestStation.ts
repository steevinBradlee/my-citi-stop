import { IStationInfo } from "../interfaces/stations";
import { getStationInfo } from "./getStationInfo";
import { getUserLocation } from "./getUserLocation";

const distanceBetweenTwoLatLongs = (lat1: number, long1: number, lat2: number, long2: number): number => {
  const unit = "K";
  const radlat1 = Math.PI * (lat1 / 180);
  const radlat2 = Math.PI * (lat2 / 180);
  const theta = long1 - long2;
  const radtheta = Math.PI * (theta / 180);
  let dist = Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * (180 / Math.PI);
  dist = dist * 60 * 1.1515;
  if (unit === "K") { dist = dist * 1.609344 }
  //if (unit=="N") { dist = dist * 0.8684 }
  return dist;
};

const getClosestStationToPoint = async (lat: number, long: number): Promise<IStationInfo | null> => {
  const stations = await getStationInfo();

  const closest = stations.reduce((prev, current) => {
    const prevDist = distanceBetweenTwoLatLongs(
      lat, long, prev.lat, prev.lon
    );
    const currentDist = distanceBetweenTwoLatLongs(
      lat, long, current.lat, current.lon
    );
    return (prevDist > currentDist) ? prev : current
  });

  return closest;
};

export const getClosestStation = async () => {
  const userLocation = await getUserLocation();
  if (userLocation) {
   return await getClosestStationToPoint(
      userLocation?.latitude,
      userLocation?.longitude
    );
  }

  return null;
};