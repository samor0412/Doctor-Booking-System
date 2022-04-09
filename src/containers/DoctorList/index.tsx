import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import getDoctor, { Doctor } from 'api/getDoctor';
import DoctorCard from './DoctorCard';
import { HEADER_HEIGHT } from 'components/Header';

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

const DoctorList = () => {
  const { data: doctors } = useQuery<Doctor[]>('doctors', getDoctor);

  return (
    <Container>
      <SearchContainer>
        {doctors && doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
      </SearchContainer>
    </Container>
  );
};

export default DoctorList;
