import moment from 'moment';

export const TIME_DELTA = 0.5;
// Format
// time format: 19:30
// float string time format: 19.5
export const getFloatStringToTime = (floatString: string) => {
  const float = parseFloat(floatString);
  const hour = Math.floor(float);
  const minute = (float - hour) * 60;
  return moment().set('hour', Math.floor(float)).set('minute', minute).format('HH:mm');
};

export const getTimeToFloatString = (time: string) => {
  const [hour, minute] = time.split(':');
  return (parseInt(hour) + parseInt(minute, 10) / 60).toFixed(1);
};

export const getNextTimeSlotInFloatString = (floatString: string, timeDelta = TIME_DELTA) =>
  (parseFloat(floatString) + timeDelta).toFixed(1);

export const isTimeslotAvailable = ({ floatString, end }: { floatString: string; end: string }) => {
  return parseFloat(floatString) < parseFloat(end);
};
