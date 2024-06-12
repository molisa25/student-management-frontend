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

const MyDepartmentContent = () => {
    const [department, setDepartment] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get('/enrol/user/detail').then(({ data }) => {
            if (data.responseData) {
                setDepartment(data.responseData[0]?.department);
            }
        }).catch((_) => {
         toast.error('Error loading department');
        });
    }, []);

    return (
        <ModalContainer>
            <FormContainer>
                <ModalTitle>My Department</ModalTitle>
                <ModalSubtitle>{department && department.length > 1 ? `You are a student in the ${department} department.` : 'Department information not available. Please enrol for a course and try again.'}</ModalSubtitle>
            </FormContainer>
        </ModalContainer>
    );
};

export default MyDepartmentContent;
