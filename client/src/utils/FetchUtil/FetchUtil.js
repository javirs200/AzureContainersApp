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


const fetchUsers = async () => {
  const url = `http://${import.meta.env.VITE_API_HOST}/api/users/`;
  const options = {
    method: "GET",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  const cars = await fetchApi(url, options);
  return cars;
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

const loginUser = async (user) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  return response;
}

const logoutUser = async () => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/login/logout`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  });
  return response;
}

const addCar = async (car) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/cars/addtoUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(car),
  });
  return response;
}

const removeCar = async (carUuid) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/cars/remove`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ 'uuid': carUuid }),
  });
  return response;
}

const fetchNewParticipation = async (participation) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/participations/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(participation),
  });
  return response;
}

const fetchNewEvent = async (event) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/events/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(event),
  });
  return response;
}

const fetchNewUser = async (user) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  return response;
}

const fetchDeleteUser = async (selectEmail) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/users/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ 'email': selectEmail }),
  });
  return response;
}

const fetchEditUser = async (edit) => {
  const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/api/users/privileges`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(edit),
  });
  return response;
}

export default {
  fetchUsers,
  fetchCars,
  fetchEvents,
  fetchParticipants,
  fetchMyParticipations,
  fetchNewUser,
  loginUser,
  logoutUser,
  addCar,
  removeCar,
  fetchNewParticipation,
  fetchNewEvent,
  fetchDeleteUser,
  fetchEditUser
};