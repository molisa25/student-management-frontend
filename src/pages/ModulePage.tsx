import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
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

const ModuleRow = styled.div`
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
    margin-bottom: 8px;
  }

  ul.custom-list {
    padding: 0;
    list-style-type: none;
  }

  ul.custom-list li {
    margin-bottom: 5px;
  }

  ul.custom-list li:last-child {
    margin-bottom: 0;
  }
`;

interface ModuleType {
    "id": string;
    "code": string;
    "title": string;
    "description": string;
    "content": string;
    "course": string;
    "unit": number;
    "staffs": {
        id: string;
        first_name: string;
        last_name: string;
        title: string;
        department: string;
    }[];
    has_registered?: boolean;
}

const ModulePage = () => {
    const [modules, setModules] = useState<ModuleType[]>([]);

    useEffect(() => {
        axiosInstance.get('/module').then(({data}) => {
            setModules(data.responseData);
        }).catch((_) => {
            toast.error('Error loading courses');
        });
    }, []);

    const registerModule = (module: ModuleType) => {
        axiosInstance.post('/module/register', {
            moduleCode: module.code
        }).then((_) => {
            // make a copy of the state array
            const updatedModules = [...modules];

            // find the index
            const index = updatedModules.findIndex((updatedModule) => updatedModule.code === module.code);

            if (index !== -1) {
                updatedModules[index] = {
                    ...updatedModules[index] as ModuleType,
                    has_registered: true
                };

                // update the state
                setModules(updatedModules);
            }

            toast.success('Module registration successful');
        }).catch((e) => {
            toast.error(e.response.data.responseMessage ?? 'Error registering to module');
        });
    }

    return (
        <Container>
            <HeadingText>Modules</HeadingText>
            {
                modules.map((module) => {
                    return (
                        <ModuleRow key={module.id}>
                            <div className="title">{module.title}</div>
                            <div className="content"><h3>Module Code:</h3> {module.code}</div>
                            <div className="content"><h3>Course</h3> {module.course}</div>
                            <div className="content"><h3>Module unit</h3> {module.unit}</div>
                            <div className="content"><h3>Description</h3>
                                <ShowMoreText text={module.description} maxLength={200}/>
                            </div>
                            <div className="content"><h3>Instructors</h3>
                                <ul className="custom-list">{module.staffs.map((staff) => {
                                    return <li key={staff.id}>
                                        <div><b>{staff.first_name} {staff.last_name}</b></div>
                                        <div>{staff.title}</div>
                                        <div>{staff.department}</div>
                                    </li>
                                })}
                                </ul>
                            </div>
                            <br/>
                            <FilledButton
                                textColor={colors.white}
                                backgroundColor={colors.black}
                                text={module?.has_registered ? "Registered" : "Register"}
                                onClick={() => registerModule(module)}
                                isDisabled={module?.has_registered === true}
                            />
                        </ModuleRow>
                    )
                })
            }
        </Container>
    );
};

export default ModulePage;
