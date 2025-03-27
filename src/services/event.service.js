import axios from "axios";

export const createEventService = async (payload) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const listEventService = async (payload) => {
  const { limit = 5, page = 1, search } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/events?page=${page}&limit=${limit}&search=${search}`,
    {
      withCredentials: true,
    }
  );
};

export const listAdminEventService = async (payload) => {
  const { limit = 5, page = 1, search } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/admins?page=${page}&limit=${limit}&search=${search}`,
    {
      withCredentials: true,
    }
  );
};

export const listPendingEventService = async (payload) => {
  const { limit = 5, page = 1, search } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/pending?page=${page}&limit=${limit}&search=${search}`,
    {
      withCredentials: true,
    }
  );
};

export const deleteEventService = async (payload) => {
  const { eventId } = payload;
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${eventId}`,
    {
      withCredentials: true,
    }
  );
};

export const updateEventService = async (payload) => {
console.log('✌️payload --->', payload);
  const { id } = payload;
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`,
    payload,
    {
      withCredentials: true,
    }
  );
};
