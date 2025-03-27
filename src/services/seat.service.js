import axios from "axios";

export const allocateSeatsService = async (payload) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seats`,
    payload,
    {
      withCredentials: true,
    }
  );
};

export const countAllocatedSeatsService = async (payload) => {
  const { eventId } = payload;
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seats/${eventId}`,
    {
      withCredentials: true,
    }
  );
};
