import React, {useEffect} from "react";
import {styled} from "styled-components";
import {breakpoints, colors} from "../util/theme";
import {StudentIcon} from "../components/icons";
import {FilledButton} from "../components/buttons";
import {SignupDialog} from "../components/dialogs";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext";

const Container = styled.div`
  min-height: 80vh;
`;

const HeadingText = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: ${colors.black};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 50px;
  }
`;

const SubHeadingText = styled.div`
  margin: 25px 0;
  font-size: 20px;
  font-weight: 500;
  color: ${colors.black}
  padding: 16px 0;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 80px 100px;

  .col {
    flex: 1;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px !important;
  }

  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    padding: 40px 50px;

    > .col:nth-child(2) {
      margin-top: 30px;
    }
  }
`;

const LandingPage = () => {
    const navigate = useNavigate();
    const {user} = React.useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [navigate, user]);

    return (
        <Container>
            <HeroSection>
                <div className="col">
                    <HeadingText>
                        Enrol for your <br/>
                        courses
                    </HeadingText>
                    <SubHeadingText>
                        enrol for courses and register for your modules
                    </SubHeadingText>
                    <SignupDialog>
                        <FilledButton
                            textColor={colors.white}
                            backgroundColor={colors.black}
                            text="Get started"
                        />
                    </SignupDialog>
                </div>
                <div className="col">
                    <StudentIcon/>
                </div>
            </HeroSection>
        </Container>
    );
};

export default LandingPage;
