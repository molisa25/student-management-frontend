import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {styled} from "styled-components";
import {breakpoints, colors} from "../util/theme";
import {UserContext} from '../context/UserContext';
import {LogoIcon, HamburgerIcon} from "./icons";
import {FilledButton, OutlineButton} from "./buttons";
import {LoginDialog, SignupDialog} from "./dialogs";

const SectionHeader = styled.div`
  > .row {
    height: 120px;
    padding: 0 100px;
    background: ${colors.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: ${breakpoints.mobile}) {
    > .row {
      padding: 0 30px !important;
      height: 90px;
    }
  }

  @media (max-width: ${breakpoints.desktop}) {
    > .row {
      padding: 0 50px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const BurgerMenu = styled.button`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const MobileNav = styled.ul<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 15px;
    left: 0;
    width: 100%;
    background-color: #f0f0f0;

    & div:nth-child(2) {
      margin-bottom: 0;
    }
  }
`;

const MobileNavItem = styled.div`
  margin-bottom: 16px;
`;

const Header = () => {
    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <SectionHeader>
            <div className="row">
                <LogoIcon/>
                <ButtonContainer>
                    {!user ?
                        <>
                            <SignupDialog>
                                <OutlineButton
                                    textColor={colors.white}
                                    borderColor={colors.white}
                                    text={<span>Register</span>}
                                />
                            </SignupDialog>
                            <LoginDialog>
                                <FilledButton
                                    textColor={colors.black}
                                    backgroundColor={colors.white}
                                    text={<span>Login</span>}
                                />
                            </LoginDialog>
                        </> :
                        <FilledButton
                            textColor={colors.white}
                            backgroundColor={colors.red}
                            text={<span>Logout</span>}
                            onClick={() => {
                                localStorage.removeItem('token');
                                setUser(null);
                                navigate('/')
                            }}
                        />
                    }
                </ButtonContainer>
                <BurgerMenu onClick={toggleMenu}>
                    <HamburgerIcon/>
                </BurgerMenu>
            </div>
            <MobileNav isOpen={isOpen}>
                <MobileNavItem></MobileNavItem>
                <MobileNavItem></MobileNavItem>
            </MobileNav>
        </SectionHeader>
    );
};

export default Header;
