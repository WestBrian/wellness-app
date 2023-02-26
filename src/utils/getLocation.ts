export const getLocation = async (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Not supported')
    }
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
