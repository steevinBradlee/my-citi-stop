import React, { useEffect, useState } from 'react';
import './App.css';
import { getStationStatusById } from './data/getStationStatus';
import { IStationStatus } from './interfaces/stations';
import { getClosestStation } from './data/getClosestStation';
import { Card } from './components/Card';

// const steviesStop = 3822;

function App() {
  const [stationStatus, setStationStatus] = useState<IStationStatus | null>(null);
  const [stationInfo, setStationInfo] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      const closestStation = await getClosestStation();
      setStationInfo(closestStation);
      if (closestStation) {
        const stationStatus = await getStationStatusById(closestStation.station_id);
        setStationStatus(stationStatus);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        { stationStatus && stationInfo ?
          <Card title={stationInfo.name}>
            <dl>
              <dt>Station ID: {stationStatus.station_id}</dt>
              <dt>Bikes Available: {stationStatus.num_bikes_available}</dt>
              <dt>Bikes Disabled: {stationStatus.num_bikes_disabled}</dt>
              <dt>Docks Available: {stationStatus.num_docks_available}</dt>
              <dt>Docks Disabled: {stationStatus.num_docks_disabled}</dt>
              <dt>Ebikes Available: {stationStatus.num_ebikes_available}</dt>
            </dl>
          </Card>
          : null
        }
         {/* {stationStatus &&
            <div>
              {stationInfo &&
                <dl>
                  <dt>Station Name: {stationInfo.name}</dt>
                </dl>
              }
              {stationStatus &&
                <dl>
                  <dt>Station ID: {stationStatus.station_id}</dt>
                  <dt>Bikes Available: {stationStatus.num_bikes_available}</dt>
                  <dt>Bikes Disabled: {stationStatus.num_bikes_disabled}</dt>
                  <dt>Docks Available: {stationStatus.num_docks_available}</dt>
                  <dt>Docks Disabled: {stationStatus.num_docks_disabled}</dt>
                  <dt>Ebikes Available: {stationStatus.num_ebikes_available}</dt>
                </dl>
             }
            </div>
         } */}
      </div>
    </div>
  );
}

export default App;
