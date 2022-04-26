import { OpeningHour } from 'api/types';
import { getFloatStringToTime } from 'utils/time';

const SORTED_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const getOpeningHourDescriptions = (openingHours: OpeningHour[]) => {
  const openingHourDayMap = {
    isClosed: []
  } as { [openingHour: string]: string[] };

  // create openingHour to day map
  // e.g. {
  //   '9:00-19:00': ['MON', 'TUE'],
  //   '9:00-18:00': [ 'WED', 'THU', 'FRI'],
  //   'isClosed': ['SAT', 'SUN']
  // }
  openingHours.forEach((openingHour) => {
    if (openingHour.isClosed) {
      openingHourDayMap.isClosed.push(openingHour.day);
      return;
    }

    const timeRangeText = `${getFloatStringToTime(openingHour.start)}-${getFloatStringToTime(
      openingHour.end
    )}`;

    if (openingHourDayMap[timeRangeText]) {
      openingHourDayMap[timeRangeText].push(openingHour.day);
    } else {
      openingHourDayMap[timeRangeText] = [openingHour.day];
    }
  });

  // if there is no closed day, remove the key isClosed in the map
  if (openingHourDayMap.isClosed.length === 0) {
    delete openingHourDayMap.isClosed;
  }

  // create sorted description array from the map
  const descriptions = Object.keys(openingHourDayMap).map((openingHour) => {
    const days = openingHourDayMap[openingHour];
    const openingHourText = openingHour === 'isClosed' ? 'CLOSED' : openingHour;

    // if all days have the same opening hours, describe as EVERY DAY
    if (days.length === 7) {
      return `EVERY DAY: ${openingHourText}`;
    }
    const sortedDays = days.sort((a, b) => SORTED_DAYS.indexOf(a) - SORTED_DAYS.indexOf(b));
    return `${sortedDays.join(', ')}: ${openingHourText}`;
  });

  return descriptions;
};
