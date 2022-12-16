
interface IGeoLocationResponse {
  coords: {
    latitude: number;
    longitude: number;
  }
};

const getCurrentPosition = (): Promise<IGeoLocationResponse | null> => {
  if (navigator.geolocation) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
      );
    });
  };

  return Promise.resolve(null);
}

export const getUserLocation = async () => {
  const response = await getCurrentPosition();
  return response?.coords;
};