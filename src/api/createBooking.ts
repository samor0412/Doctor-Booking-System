import axiosInstance from './axiosInstance';

export interface Booking {
  id: string;
  name: string;
  start: number;
  doctorId: string;
  date: string;
  status: 'cancel' | 'confirmed';
}

export type Args = Omit<Booking, 'id' | 'status'>;

function generateId(data: Args) {
  return `${data.doctorId}${data.date}${data.start}${Date.now()}`;
}

export default async function createBooking(args: Omit<Booking, 'id' | 'status'>) {
  const result = await axiosInstance.post('/booking', {
    ...args,
    id: generateId(args),
    status: 'confirmed'
  });
  return result;
}
