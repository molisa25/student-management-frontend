import React, {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';
import {styled} from "styled-components";
import {breakpoints, colors} from "../util/theme";
import {FilledButton} from "../components/buttons";
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

const CourseRow = styled.div`
  background: ${colors.light_grey};
  border-radius: 8px;
  padding: 20px 25px;
  margin: 10px 0;

  > .title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 8px;
  }

  > .content {
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

interface CourseType {
    id: string;
    name: string;
    description: string;
    department: string;
    max_unit: number;
    has_enrol?: boolean;
}

const CoursePage = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        axiosInstance.get('/course').then(({data}) => {
            setCourses(data.responseData);
        }).catch((_) => {
            toast.error('Error loading courses');
        });
    }, []);

    const enrolToCourse = (course: CourseType) => {
        axiosInstance.post('/enrol/create', {
            courseId: course.id
        }).then((_) => {
            // make a copy of the state array
            const updatedCourses = [...courses];

            // find the index
            const index = updatedCourses.findIndex((updatedCourse) => updatedCourse.id === course.id);

            if (index !== -1) {
                updatedCourses[index] = {
                    ...updatedCourses[index] as CourseType,
                    has_enrol: true
                };

                // update the state
                setCourses(updatedCourses);
            }

            toast.success('Course enrollment successful');
        }).catch((e) => {
            toast.error(e.response.data.responseMessage ?? 'Error enrolling to course');
        });
    }

    return (
        <Container>
            <HeadingText>Courses</HeadingText>
            {
                courses.map((course) => {
                    return (
                        <CourseRow key={course.id}>
                            <div className="title">{course.name}</div>
                            <div className="content"><h3>Department</h3> {course.department}</div>
                            <div className="content"><h3>Max. unit</h3> {course.max_unit}</div>
                            <div className="content"><h3>Description</h3>
                                <ShowMoreText text={course.description} maxLength={200}/>
                            </div>
                            <br />
                            <FilledButton
                                textColor={colors.white}
                                backgroundColor={colors.black}
                                text={course?.has_enrol === true ? "Enrolled" : "Enrol"}
                                onClick={() => enrolToCourse(course)}
                                isDisabled={course?.has_enrol === true}
                            />
                        </CourseRow>
                    )
                })
            }
        </Container>
    );
};

export default CoursePage;
