import getDoctor from 'api/getDoctor';
import { Doctor } from 'api/types';
import Button from 'components/Button';
import { HEADER_HEIGHT } from 'components/Header';
import LoadingOverlay from 'components/Loading';
import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Error } from 'styles';
import BookingForm from './BookingForm';
import { getOpeningHourDescriptions } from './getOpeningHourDescriptions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${HEADER_HEIGHT} + 2rem) 2rem 0;
  text-align: center;
`;

const DoctorProfileImg = styled.img`
  width: 16rem;
  max-width: 100%;
  margin-bottom: 1.4rem;
`;

const Name = styled.h2`
  margin: 2rem 0;
`;

const Address = styled.h4`
  margin: 0.2rem;
`;

const OpeningHours = styled.div`
  margin: 0.2rem;
  & > div {
    font-size: 1rem;
    margin: 0.4rem 0;
  }
`;

const BackBtn = styled(Button).attrs({ buttonType: 'primary' })`
  position: absolute;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const BookBtn = styled(Button).attrs({ buttonType: 'secondary' })`
  margin: 1rem;
`;

const DoctorProfile = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState<boolean>(false);
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: doctor
  } = useQuery<Doctor>(['doctor', id], getDoctor.bind(undefined, { id }));

  const onClickBack = useCallback(() => {
    navigate('doctor-list');
  }, [navigate]);

  const address = useMemo(
    () =>
      doctor?.address
        ? [doctor.address.line_1, doctor.address.line_2, doctor.address.district]
            .filter(Boolean)
            .join(', ')
        : '',
    [doctor?.address]
  );

  const openingHoursDescription = useMemo(
    () => (doctor?.opening_hours ? getOpeningHourDescriptions(doctor?.opening_hours) : []),
    [doctor?.opening_hours]
  );

  const openBookingForm = useCallback(() => setIsBookingFormOpen(true), [setIsBookingFormOpen]);
  const closeBookingForm = useCallback(() => setIsBookingFormOpen(false), [setIsBookingFormOpen]);

  return (
    <Container>
      <LoadingOverlay isLoading={isLoading}>
        {isError ? (
          <Error>There is an error. Please refresh the page</Error>
        ) : (
          <>
            <BackBtn onClick={onClickBack}>Back</BackBtn>
            <DoctorProfileImg src={`${process.env.PUBLIC_URL}/defaultDoctorProfileImage.svg`} />
            <Name>{doctor?.name}</Name>
            <Address>{address}</Address>
            {openingHoursDescription.length && (
              <OpeningHours>
                {openingHoursDescription.map((description) => (
                  <div key={description}>{description}</div>
                ))}
              </OpeningHours>
            )}
            <BookBtn onClick={openBookingForm}>Book Now</BookBtn>
          </>
        )}
      </LoadingOverlay>
      {isBookingFormOpen && doctor && (
        <BookingForm doctor={doctor} onClose={closeBookingForm}></BookingForm>
      )}
    </Container>
  );
};

export default DoctorProfile;
