import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { styled } from "styled-components";
import { UserContext } from "../../../context/UserContext";
import axiosInstance from "../../../util/axios";
import { ButtonSize } from "../../../util/button";
import { colors } from "../../../util/theme";
import { FilledButton } from "../../buttons";
import HidePasswordIcon from "../../icons/HidePassword";
import ViewPasswordIcon from "../../icons/ViewPassword";
import { Input, InputLabel, InputWrapper } from "../../inputs/Input";

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

const PasswordInputLayer = styled.div`
  position: relative;
`

const PasswordViewer = styled.div`
  position: absolute;
  top: 57%;
  right: 10px;
  transform: translateY(-50%);
`

interface LoginDialogContentProps {
    handleClose: () => void;
}

const LoginContent = ({handleClose}: LoginDialogContentProps) => {
    const navigate = useNavigate();
    const {setUser} = React.useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password
        }).catch((e) => {
            console.log(e);
            toast.error(e.response.data.responseMessage ?? 'Login failed');
        });

        if (response && response.data.responseData) {
            setUser({
                id: response.data.responseData.id,
                first_name: response.data.responseData.first_name,
                last_name: response.data.responseData.last_name,
                email: response.data.responseData.email,
            });

            localStorage.setItem('token', response.data.responseData.token);

            toast.success('Login successful');

            handleClose();

            navigate('/home')
        }
    };

    const handleViewPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <ModalContainer>
            <FormContainer>
                <ModalTitle>Login to access system</ModalTitle>
                <ModalSubtitle>Please provide your email and password below</ModalSubtitle>
                <InputWrapper>
                    <InputLabel htmlFor='login-email'>Email</InputLabel>
                    <Input
                        autoComplete='new-email'
                        placeholder='Email'
                        id='login-email'
                        type='text'
                        value={email}
                        width='calc(100% - 32px)'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputLabel htmlFor='login-password'>Password</InputLabel>
                    <PasswordInputLayer>
                        <Input
                            autoComplete='new-password'
                            placeholder='Password'
                            id='login-password'
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={password}
                            width='calc(100% - 32px)'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <PasswordViewer onClick={handleViewPassword}>
                            {!isPasswordVisible ? <ViewPasswordIcon/> : <HidePasswordIcon/>}
                        </PasswordViewer>
                    </PasswordInputLayer>
                </InputWrapper>
                <br/>
                <FilledButton
                    textColor={colors.white}
                    backgroundColor={colors.black}
                    text="Login"
                    size={ButtonSize.LARGE}
                    onClick={handleLogin}
                />
            </FormContainer>
        </ModalContainer>
    );
};

export default LoginContent;
