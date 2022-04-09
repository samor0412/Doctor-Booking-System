import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { primary, secondary } from 'colors';
import { Doctor } from 'api/getDoctor';

const HoverMask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${primary};
  font-weight: bold;
`;

const Card = styled(NavLink)`
  position: relative;
  border: 0.2rem solid ${secondary};
  border-radius: 0.4rem;
  box-shadow: 3px 6px 9px -4px rgba(0, 0, 0, 0.72);
  flex: 0 0 30%;
  box-sizing: border-box;

  &:hover ${HoverMask} {
    display: flex;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Name = styled.div`
  font-size: 1.2rem;
  text-align: center;
  padding: 0.6rem;
`;

const ProfileImg = styled.img`
  width: 100%;
`;

interface Props {
  doctor: Doctor;
}
const DoctorCard: React.FC<Props> = ({ doctor }) => (
  <Card to="/doctor-profile">
    <ProfileImg src={'defaultDoctorProfileImage.svg'}></ProfileImg>
    <Name>{doctor.name}</Name>
    <HoverMask>More</HoverMask>
  </Card>
);

export default DoctorCard;
