import createBooking, { Args as CreateBookingArgs } from 'api/createBooking';
import { Doctor } from 'api/types';
import { primary, secondary } from 'colors';
import Button from 'components/Button';
import Popover from 'components/Popover';
import moment from 'moment';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { getFloatStringToTime, isTimeslotAvailable, TIME_DELTA } from 'utils/time';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 24rem;
`;

const Row = styled.div`
  margin: 0.6rem 0;
`;

const FieldName = styled.div`
  margin-bottom: 0.2rem;
  font-size: 1rem;
  text-align: left;
  color: ${primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.4rem;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.4rem;
  margin: 0;
`;

const SubmitBtn = styled(Button).attrs({ buttonType: 'primary' })`
  width: 100%;
`;

const Error = styled.div`
  color: red;
  font-size: 1rem;
`;

const Success = styled.div`
  color: ${secondary};
  font-size: 2rem;
`;

const SuccessCloseBtn = styled(Button).attrs({ buttonType: 'primary' })`
  margin-top: 2rem;
`;

const CloseBtn = styled(Button).attrs({ buttonType: 'secondary' })`
  width: 100%;
  margin-top: 1rem;
`;

interface FormData {
  name: string;
  date: string;
  start: string;
}

interface Props {
  doctor: Doctor;
  onClose: () => void;
}

const BookingForm: React.FC<Props> = ({ doctor, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm<FormData>();

  const mutation = useMutation((booking: CreateBookingArgs) => {
    return createBooking(booking);
  });

  const onSubmit = ({ name, start, date }: FormData) => {
    mutation.mutate({
      name,
      start: parseFloat(getFloatStringToTime(start)),
      date,
      doctorId: doctor.id
    });
  };

  const getOpeningHours = useCallback<() => string[]>(() => {
    const date = watch('date');
    const day = moment(date).format('ddd').toUpperCase();
    const openingHour = doctor.opening_hours.find((data) => data.day === day);
    const availableTimeSlot = [];

    if (openingHour?.start && openingHour?.end) {
      let nextTimeslot = openingHour.start;

      while (isTimeslotAvailable({ floatString: nextTimeslot, end: openingHour.end })) {
        availableTimeSlot.push(getFloatStringToTime(nextTimeslot));
        nextTimeslot = (parseFloat(nextTimeslot) + TIME_DELTA).toFixed(1);
      }
    }

    return availableTimeSlot || ([] as string[]);
  }, [doctor.opening_hours]);

  return (
    <Popover>
      <Form>
        {mutation.isSuccess ? (
          <Row>
            <Success>Booking Confirmed!</Success>
            <SuccessCloseBtn onClick={onClose}>Close</SuccessCloseBtn>
          </Row>
        ) : (
          <>
            <Row>
              <FieldName>Doctor</FieldName>
              <Input disabled value={doctor.name} />
            </Row>
            <Row>
              <FieldName>Patient Name</FieldName>
              <Input {...register('name', { required: true, maxLength: 30 })} />
            </Row>
            <Row>
              <FieldName>Date</FieldName>
              <Input
                type="date"
                min={moment().format('YYYY-MM-DD')}
                {...register('date', { required: true })}
              />
            </Row>
            {watch('date') && (
              <Row>
                <FieldName>Time</FieldName>
                <Select disabled={!watch('date')} {...register('start', { required: true })}>
                  {getOpeningHours().map((openingHour) => (
                    <option key={openingHour} value={openingHour}>
                      {openingHour}
                    </option>
                  ))}
                </Select>
              </Row>
            )}
            <Row>
              <SubmitBtn
                isLoading={mutation.isLoading}
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}>
                Submit
              </SubmitBtn>
              <CloseBtn onClick={onClose}>Close</CloseBtn>
            </Row>
            {mutation.isError && (
              <Row>
                <Error>Error Occur. Try Again Or Pick another timeslot</Error>
              </Row>
            )}
          </>
        )}
      </Form>
    </Popover>
  );
};

export default BookingForm;
