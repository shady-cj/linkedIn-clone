import styled from "styled-components";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { signInApi } from "../actions";
const Landing = (props) => {
    return (
        <Container>
            {props.user && <Navigate to="/home" />}
            <Nav>
                <a href="/">
                    <img src="/images/login-logo.svg" alt="" />
                </a>
                <div>
                    <Join
                        onClick={() =>
                            alert(
                                "Feature not available try signing up using google"
                            )
                        }
                    >
                        Join Now
                    </Join>
                    <SignIn
                        onClick={() =>
                            alert("Please Try signing in through google")
                        }
                    >
                        Sign In
                    </SignIn>
                </div>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your professional community </h1>
                    <img src="/images/login-hero.svg" alt="" />
                </Hero>
                <Form>
                    <Google onClick={() => props.signIn()}>
                        <img src="/images/google.svg" alt="" />
                        <span>Sign in with Google</span>
                    </Google>
                </Form>
            </Section>
        </Container>
    );
};

const Container = styled.div``;
const Nav = styled.div`
    max-width: 1128px;
    margin: auto;
    padding: 12px 0 16px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    flex-flow: row nowrap;
    & > a {
        width: 135px;
        height: 34px;
        @media (max-width: 768px) {
            padding: 0 5px;
        }
    }
`;
const Join = styled.a`
    padding: 10px 12px;
    text-decoration: none;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.6);
    margin-right: 12px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.9);
        text-decoration: none;
    }
`;

const SignIn = styled.a`
    box-shadow: inset 0 0 0 1px #0a66c2;
    color: #0a66c2;
    border-radius: 24px;
    transition: 167ms ease-in-out;
    cursor: pointer;
    font-weight: 600;
    padding: 10px 24px;

    &:hover {
        background-color: rgba(112, 181, 249, 0.15);
    }
    @media (max-width: 768px) {
        margin-right: 10px;
    }
`;
const Section = styled.section`
    display: flex;
    align-content: start;
    min-height: 700px;
    width: 100%;
    max-width: 1128px;
    min-height: 700px;
    padding: 60px 0;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    margin: auto;
    @media (max-width: 768px) {
        min-height: 0;
    }
`;

const Hero = styled.div`
    width: 100%;
    h1 {
        padding-bottom: 0;
        width: 55%;
        margin-top: 50px;
        font-size: 56px;
        color: #2977c9;
        font-weight: 200;
        line-height: 70px;
        @media (max-width: 768px) {
            margin-top: 0px;
            text-align: center;
            font-size: 25px;
            width: 100%;
            line-height: 2;
        }
    }
    img {
        width: 550px;
        height: 510px;
        object-fit: contain;
        position: absolute;
        bottom: 22%;
        right: -5%;

        @media (max-width: 768px) {
            /* width: initial;
            height: initial; */
            width: 100%;
            display: block;
            margin: 0 auto;
            position: initial;
        }
    }
`;

const Form = styled.div`
    margin-top: 100px;
    width: 408px;

    @media (max-width: 768px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
`;
const Google = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 56px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.6);
    transition: 0.3s ease-in-out;

    border-radius: 28px;

    /* transform: translateX(-50%); */
    cursor: pointer;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
    &:hover {
        background-color: rgba(207, 207, 207, 0.25);
        color: rgba(0, 0, 0, 0.75);
    }
    @media (max-width: 768px) {
        width: 80%;
    }
`;
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signInApi()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
