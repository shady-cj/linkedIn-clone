import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { signOutApi } from "../actions";

const Header = () => {
    const user = useSelector((state) => state.userState.user);
    const dispatch = useDispatch();

    return (
        <Container>
            <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/home-logo.svg" alt="" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <SearchIcon>
                        <img src="/images/search-icon.svg" alt="" />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className="active">
                            <a>
                                <img src="/images/nav-home.svg" alt="" />
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-network.svg" alt="" />
                                <span>My Network</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-jobs.svg" alt="" />
                                <span>Jobs</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-messaging.svg" alt="" />
                                <span>Messaging</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img
                                    src="/images/nav-notifications.svg"
                                    alt=""
                                />
                                <span>Notifications</span>
                            </a>
                        </NavList>
                        <User>
                            <a>
                                <img
                                    src={
                                        user && user.photoURL
                                            ? user.photoURL
                                            : "/images/user.svg"
                                    }
                                    alt=""
                                />
                                <span>
                                    Me
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </a>
                            <SignOut onClick={() => dispatch(signOutApi())}>
                                <a>Sign Out</a>
                            </SignOut>
                        </User>

                        <Work>
                            <a>
                                <img src="/images/nav-work.svg" alt="" />
                                <span>
                                    Work
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    left: 0;
    padding: 0 24px;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 20;
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    min-height: 100%;
    max-width: 1128px;
`;
const Logo = styled.span`
    margin-right: 8px;
`;

const Search = styled.div`
    position: relative;
    & > div {
        max-width: 280px;
        input {
            border: none;
            background-color: #eef3f8;
            border-radius: 2px;
            color: rgba(0, 0, 0, 0.9);
            width: 218px;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;

            &:focus {
                border-color: #2977c9;
            }
        }
    }
`;
const SearchIcon = styled.div`
    width: 40px;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 2px;
    border-radius: 0 2px 2px 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-out;
`;
const Nav = styled.nav`
    margin-left: auto;
    overflow-x: auto;
    overflow-y: hidden;
    display: block;
    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        z-index: 6;
        bottom: 0;

        background-color: white;
        width: 100%;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    list-style: none;
    flex-flow: row nowrap;
    overflow-y: visible;
    .active {
        span:after {
            content: "";
            transform: scaleX(1);
            border-bottom: 2px solid rgba(0, 0, 0, 0.9);
            bottom: 0;
            left: 0;
            position: absolute;
            transition: transform 0.2s ease-in-out;
            width: 100%;
        }
    }
`;

const NavList = styled.li`
    display: flex;
    align-items: center;

    a {
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.2;
        min-height: 42px;
        min-width: 80px;
        position: relative;
        cursor: pointer;
        text-decoration: none;

        span {
            color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
        }
        @media (max-width: 768px) {
            min-width: 70px;
        }
    }
    &:hover,
    &:active {
        a {
            span {
                color: rgba(0, 0, 0, 0.9);
            }
        }
    }
`;
const SignOut = styled.div`
    position: absolute;
    top: 20px;
    left: -2px;
    background: white;
    border-radius: 0 0 5px 5px;
    width: 100px;
    height: 40px;
    z-index: 50;
    transition: 0.3s ease-in-out;
    font-size: 17px;
    text-align: center;
    display: none;

    /* @media (max-width: 768px) {
        position: fixed;
        top: 82.5%;
        left: 64%;
        
    } */
`;
const User = styled(NavList)`
    position: relative;

    a > img {
        width: 24px;

        border-radius: 50%;
        object-fit: contain;
    }
    span {
        display: flex;
        align-items: center;
    }
    &:hover {
        ${SignOut} {
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`;

const Work = styled(User)`
    border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default Header;
