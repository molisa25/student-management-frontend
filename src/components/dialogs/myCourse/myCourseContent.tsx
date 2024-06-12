import React, {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';
import {styled} from "styled-components";
import {colors} from "../../../util/theme";
import axiosInstance from "../../../util/axios";

const ModalContainer = styled.div`
  height: 100%;
  margin: 8px 16px;
`;

const FormContainer = styled.div`
  height: 100%;
  background-color: ${colors.white};
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: ${colors.black};
`;

const ModalSubtitle = styled.p`
  color: ${colors.grey};
`;

const CourseRow = styled.div`
  background: ${colors.light_grey};
  border-radius: 8px;
  padding: 20px 25px;
  margin: 10px 0;

  > .title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 8px;
  }

  > .content {
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

const MyCourseContent = () => {
    const [courses, setCourses] = useState<{
        id: string;
        name: string;
        description: string;
        department: string;
        max_unit: number;
        has_enrol?: boolean;
    }[]>([]);

    useEffect(() => {
        axiosInstance.get('/enrol/user/detail').then(({data}) => {
            setCourses(data.responseData)
        }).catch((_) => {
            toast.error('Error loading course');
        });
    }, []);

    return (
        <ModalContainer>
            <FormContainer>
                <ModalTitle>My Course</ModalTitle>
                <ModalSubtitle>All the courses you enrolled for</ModalSubtitle>
                {
                    courses.map((course) => {
                        return (
                            <CourseRow key={course.id}>
                                <div className="title">{course.name}</div>
                                <div className="content"><b>Department: </b> {course.department}</div>
                                <div className="content"><b>Max. unit: </b> {course.max_unit}</div>
                            </CourseRow>
                        )
                    })
                }
            </FormContainer>
        </ModalContainer>
    );
};

export default MyCourseContent;
