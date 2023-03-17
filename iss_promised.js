const request = require('request-promise-native');


const fetchMyIP = () => {
   return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = (coordinates) => {
  coordinates = JSON.parse(coordinates);
  const { longitude, latitude } = coordinates;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  })
}

module.exports = { nextISSTimesForMyLocation };