import React, { useEffect, useState } from 'react';
import './App.css';
import { getStationStatusById } from './data/getStationStatus';
import { IStationInfo, IStationStatus } from './interfaces/stations';
import { getStationInfo, getStationInfoById } from './data/getStationInfo';

const steviesStop = 3822;

function App() {
  const [stationStatus, setStationStatus] = useState<IStationStatus | null>(null);
  const [stationInfo, setStationInfo] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      const statusPromise = getStationStatusById(steviesStop);
      statusPromise.then(data => {
        setStationStatus(data);
      });

      const infoPromise = getStationInfoById(steviesStop);
      infoPromise.then(data => {
        setStationInfo(data);
      });
    }

    fetchData();
  }, []);

  const isLoaded = () => {
    
  }

  return (
    <div className="App">
      <div>
         {stationStatus &&
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
         }
      </div>
    </div>
  );
}

export default App;
