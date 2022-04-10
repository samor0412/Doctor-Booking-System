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
