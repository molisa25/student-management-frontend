import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {styled} from "styled-components";
import {colors} from "../../../util/theme";
import {FilledButton} from "../../buttons";
import {ButtonSize} from "../../../util/button";
import {Input, InputLabel, InputWrapper} from "../../inputs/Input";
import axiosInstance from "../../../util/axios";
import {UserContext} from "../../../context/UserContext";
import ViewPasswordIcon from "../../icons/ViewPassword";
import HidePasswordIcon from "../../icons/HidePassword";

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

const SignupContent = ({handleClose}: LoginDialogContentProps) => {
    const navigate = useNavigate();
    const {setUser} = React.useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignup = async () => {
        const response = await axiosInstance.post('/auth/signup', {
            email,
            firstName,
            lastName,
            password
        }).catch((e) => {
            toast.error(e.response.data.responseMessage ?? 'Signup failed');
        });

        if (response && response.data.responseData) {
            setUser({
                id: response.data.responseData.id,
                first_name: response.data.responseData.first_name,
                last_name: response.data.responseData.last_name,
                email: response.data.responseData.email,
            });

            localStorage.setItem('token', response.data.responseData.token);

            toast.success('Signup successful');

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
                <ModalTitle>Register an account</ModalTitle>
                <ModalSubtitle>Please provide your details below</ModalSubtitle>
                <InputWrapper>
                    <InputLabel htmlFor='signup-fname'>First Name</InputLabel>
                    <Input
                        autoComplete='new-fname'
                        placeholder='First Name'
                        id='signup-fname'
                        type='text'
                        value={firstName}
                        width='calc(100% - 32px)'
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputLabel htmlFor='signup-lname'>Last Name</InputLabel>
                    <Input
                        autoComplete='new-lname'
                        placeholder='Last Name'
                        id='signup-lname'
                        type='text'
                        value={lastName}
                        width='calc(100% - 32px)'
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputLabel htmlFor='signup-email'>Email</InputLabel>
                    <Input
                        autoComplete='new-email'
                        placeholder='Email'
                        id='signup-email'
                        type='text'
                        value={email}
                        width='calc(100% - 32px)'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputLabel htmlFor='signup-password'>Password</InputLabel>
                    <PasswordInputLayer>
                        <Input
                            autoComplete='new-password'
                            placeholder='Password'
                            id='signup-password'
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
                    text="Register"
                    size={ButtonSize.LARGE}
                    onClick={handleSignup}
                />
            </FormContainer>
        </ModalContainer>
    );
};

export default SignupContent;
