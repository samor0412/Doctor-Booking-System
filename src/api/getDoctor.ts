import axiosInstance from './axiosInstance';
import { Doctor } from './types';

interface Args {
  id: string;
}
export type Data = Doctor;

export default async function getDoctor({ id }: Args) {
  const result = await axiosInstance.get<Data>(`/doctor/${id}`);
  return result.data;
}
