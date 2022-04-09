import axiosInstance from './axiosInstance';

export interface OpeningHour {
  day: string;
  end: string;
  isClosed: boolean;
  start: string;
}

export interface Doctor {
  id: string;
  address: {
    district: string;
    line_1: string;
    line_2: string;
  };
  description: string;
  name: string;
  opening_hours: OpeningHour[];
}

export type Data = Doctor[];

export default async function getDoctor() {
  const result = await axiosInstance.get<Data>('/doctor');
  return result.data;
}
