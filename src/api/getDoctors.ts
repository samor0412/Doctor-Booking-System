import axiosInstance from './axiosInstance';
import { Doctor } from './types';

export type Data = Doctor[];

export default async function getDoctors() {
  const result = await axiosInstance.get<Data>('/doctor');
  return result.data;
}
