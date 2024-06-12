import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {styled} from "styled-components";
import {breakpoints, colors} from "../util/theme";
import ShowMoreText from "../components/text/showMoreText";
import axiosInstance from "../util/axios";

const Container = styled.div`
  padding: 60px 100px;
  min-height: 80vh;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px !important;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 40px 50px;
  }
`;

const HeadingText = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: ${colors.black};
  margin-bottom: 32px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 50px;
  }
`;

const DepartmentRow = styled.div`
  background: ${colors.light_grey};
  border-radius: 8px;
  padding: 20px 25px;
  margin: 10px 0;

  > .title {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

const DepartmentPage = () => {
    const [departments, setDepartments] = useState<{
        id: string;
        name: string;
        description: string;
    }[]>([]);

    useEffect(() => {
        axiosInstance.get('/department').then(({ data }) => {
            setDepartments(data.responseData);
        }).catch((_) => {
            toast.error('Error loading courses');
        });
    }, []);

    return (
        <Container>
            <HeadingText>Departments</HeadingText>
            {
                departments.map((department) => {
                    return (
                        <DepartmentRow key={department.id}>
                            <div className="title">{department.name}</div>
                            <ShowMoreText text={department.description} maxLength={200}/>
                        </DepartmentRow>
                    )
                })
            }
        </Container>
    );
};

export default DepartmentPage;
