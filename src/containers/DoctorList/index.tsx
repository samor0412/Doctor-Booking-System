import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import getDoctor, { Doctor } from 'api/getDoctor';
import DoctorCard from './DoctorCard';
import { HEADER_HEIGHT } from 'components/Header';
import LoadingOverlay from 'components/Loading';

const Container = styled.div`
  padding-top: ${HEADER_HEIGHT};
  width: 100vw;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 4rem;
  gap: 4rem 3.33%;
`;
const Error = styled.div`
  margin: 4rem;
  font-size: 1.4rem;
  text-align: center;
`;

const DoctorList = () => {
  const { isLoading, isError, data: doctors } = useQuery<Doctor[]>('doctors', getDoctor);

  return (
    <Container>
      <LoadingOverlay isLoading={isLoading}>
        {isError ? (
          <Error>There is an error. Please refresh the page</Error>
        ) : (
          <SearchContainer>
            {doctors && doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
          </SearchContainer>
        )}
      </LoadingOverlay>
    </Container>
  );
};

export default DoctorList;
