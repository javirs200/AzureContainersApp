const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json()

    if (data) {
      return data;
    } else {
      return [];
    }
  } catch {
    return [];
  }
}

const fetchCars = async (email) => {
  const url = `http://${import.meta.env.VITE_API_HOST}/api/cars/getfromUser/${email}`;
  const options = {
    method: "GET",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  const cars = await fetchApi(url, options);
  return cars;
}

const fetchEvents = async () => {
  const url = `http://${import.meta.env.VITE_API_HOST}/api/events/all`;
  const options = {
    method: "GET",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  const events = await fetchApi(url, options);
  return events;
}

const fetchParticipants = async (eventName) => {
  if (!eventName) {
    return [];
  }
  const url = `http://${import.meta.env.VITE_API_HOST}/api/participations/getParticipations/${eventName}`;
  const options = {
    method: "GET",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  const Participants = await fetchApi(url, options);
  // console.log("participantes del evento -> ",eventName , "son : " , Participants);
  return Participants;
}

const fetchMyParticipations = async (email) => {
  const url = `http://${import.meta.env.VITE_API_HOST}/api/participations/getMyParticipations/${email}`;
  const options = {
    method: "GET",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  const participations = await fetchApi(url, options);
  return participations;
}

export default { fetchCars, fetchEvents,fetchParticipants,fetchMyParticipations };