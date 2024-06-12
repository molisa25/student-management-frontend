import React, {useEffect, useState} from "react";
import { toast } from 'react-hot-toast';
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

const ModuleRow = styled.div`
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
  }
`;

const MyModuleContent = () => {
    const [modules, setModules] = useState<{
        "id": string;
        "code": string;
        "title": string;
        "course": string;
        "unit": number;
        "staffs": {
            id: string;
            first_name: string;
            last_name: string;
            title: string;
            department: string;
        }[]
    }[]>([]);

    useEffect(() => {
        axiosInstance.get('/module/user/detail').then(({ data }) => {
            setModules(data.responseData)
        }).catch((_) => {
            toast.error('Error loading module');
        });
    }, []);

    return (
        <ModalContainer>
            <FormContainer>
                <ModalTitle>My Modules</ModalTitle>
                <ModalSubtitle>All registered modules</ModalSubtitle>
                {
                    modules.map((module) => {
                        return (
                            <ModuleRow key={module.id}>
                                <div className="title">{module.title}</div>
                                <div className="content"><b>Code: </b> {module.code}</div>
                                <div className="content"><b>Course: </b> {module.course}</div>
                                <div className="content"><b>Course unit: </b> {module.unit}</div>
                            </ModuleRow>
                        )
                    })
                }
            </FormContainer>
        </ModalContainer>
    );
};

export default MyModuleContent;
