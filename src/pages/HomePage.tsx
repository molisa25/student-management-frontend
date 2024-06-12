import React from "react";
import {styled} from "styled-components";
import {breakpoints, colors} from "../util/theme";
import {ModalContext} from "../context/ModalContext";
import {MyDepartmentDialog, MyCourseDialog, MyModuleDialog} from "../components/dialogs";

const Container = styled.div`
  min-height: 80vh;
`;

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 80px 100px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px !important;
    gap: 10px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: 40px 50px;
  }
`;

const FlexLinkItem = styled.a`
  color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: ${colors.purple};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 300px;
  flex: 1 1 calc(33.33% - 40px);
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px !important;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px !important;
  }
`;

const FlexDivItem = styled.div`
  color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: ${colors.purple};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 300px;
  flex: 1 1 calc(33.33% - 40px);
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 500;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px !important;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px !important;
  }
`;

const HomePage = () => {
    const {setIsMyDocumentOpen, setIsMyCourseOpen, setIsMyModuleOpen} = React.useContext(ModalContext);

    const handleOpenMyDepartmentModal = () => {
        setIsMyDocumentOpen(true);
    }

    const handleOpenMyCourseModal = () => {
        setIsMyCourseOpen(true);
    }

    const handleOpenMyModuleModal = () => {
        setIsMyModuleOpen(true);
    }

    return (
        <>
            <MyDepartmentDialog/>
            <MyCourseDialog/>
            <MyModuleDialog/>
            <Container>
                <FlexRow>
                    <FlexLinkItem href='/department'>Departments</FlexLinkItem>
                    <FlexLinkItem href='/course'>Courses</FlexLinkItem>
                    <FlexLinkItem href='/module'>Modules</FlexLinkItem>
                    <FlexDivItem onClick={handleOpenMyDepartmentModal}>My Department</FlexDivItem>
                    <FlexDivItem onClick={handleOpenMyCourseModal}>My Course</FlexDivItem>
                    <FlexDivItem onClick={handleOpenMyModuleModal}>My Modules</FlexDivItem>
                </FlexRow>
            </Container>
        </>
    );
};

export default HomePage;
