import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostModal from "./PostModal";
import { getPostApi } from "../actions";

const Mainside = () => {
    const [showModal, setShowModal] = useState("close");

    const user = useSelector((state) => state.userState.user);
    const loading = useSelector((state) => state.articleState.loading);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.articleState.posts);
    useEffect(() => {
        dispatch(getPostApi());
    }, []);
    const handleClick = (e) => {
        e.preventDefault();
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;

            default:
                setShowModal("close");
        }
    };
    return (
        <Container>
            <ShareBox>
                <div>
                    <img
                        src={
                            user && user.photoURL
                                ? user.photoURL
                                : "/images/user.svg"
                        }
                        alt=""
                    />
                    <button onClick={handleClick}>Start a Post</button>
                </div>
                <div>
                    <button>
                        <img src="/images/photo-icon.svg" alt="" />
                        <span>Photo</span>
                    </button>

                    <button>
                        <img src="/images/video-icon.svg" alt="" />
                        <span>Video</span>
                    </button>
                    <button>
                        <img src="/images/event-icon.svg" alt="" />
                        <span>Event</span>
                    </button>
                    <button>
                        <img src="/images/article-icon.svg" alt="" />
                        <span>Write Article</span>
                    </button>
                </div>
            </ShareBox>
            {posts.length === 0 ? (
                ""
            ) : (
                <Content>
                    {posts.length > 0 &&
                        posts.map((post, key) => (
                            <Article key={key}>
                                <SharedActor>
                                    <a>
                                        <img src={post.author.image} alt="" />
                                        <div>
                                            <span>{post.author.title}</span>
                                            <span>{post.author.email}</span>
                                            <span>
                                                {post.author.date
                                                    .toDate()
                                                    .toLocaleString()}
                                            </span>
                                        </div>
                                    </a>
                                    <button>
                                        <img
                                            src="/images/ellipsis.svg"
                                            alt=""
                                        />
                                    </button>
                                </SharedActor>
                                <Description>{post.description}</Description>
                                <SharedImg>
                                    <a>
                                        {post.postImage != "" ? (
                                            <img src={post.postImage} alt="" />
                                        ) : post.postVideo ? (
                                            <video
                                                src={post.postVideo}
                                                controls
                                            ></video>
                                        ) : (
                                            ""
                                        )}
                                    </a>
                                </SharedImg>
                                <SocialCounts>
                                    <li>
                                        <button>
                                            <img
                                                src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                                                alt=""
                                            />
                                            <img
                                                src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                                                alt=""
                                            />
                                            <span>0</span>
                                        </button>
                                    </li>
                                </SocialCounts>
                                <SocialActions>
                                    <button>
                                        <img
                                            src="/images/like-icon.svg"
                                            alt=""
                                        />
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img
                                            src="/images/comments-icon.svg"
                                            alt=""
                                        />
                                        <span>0 Comments</span>
                                    </button>
                                    <button>
                                        <img
                                            src="/images/share-icon.svg"
                                            alt=""
                                        />
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <img
                                            src="/images/send-icon.svg"
                                            alt=""
                                        />
                                        <span>Send</span>
                                    </button>
                                </SocialActions>
                            </Article>
                        ))}
                </Content>
            )}
            {(showModal === "open" || loading === true) && (
                <PostModal showModal={showModal} handleClick={handleClick} />
            )}
        </Container>
    );
};
const Container = styled.div`
    grid-area: mainside;
    @media (max-width: 768px) {
        
        width: 100%;
    }
`;
const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: white;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background-color: white;
    div {
        button {
            outline: none;
            border: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            display: flex;
            align-items: center;
            font-weight: 600;
            background: transparent;
            cursor: pointer;
        }
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;

            img {
                width: 48px;

                border-radius: 50%;
                margin-right: 8px;
            }
            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
            }
        }
        &:last-child {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button {
                img {
                    margin: 0 4px 0 -2px;
                }
                span {
                    /* color: #70b5f9; */
                    color: #666666;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;
const SharedActor = styled.div`
    display: flex;
    flex-wrap: nowrap;

    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;
        img {
            width: 48px;
            height: 48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.6);
                &:first-child {
                    font-size: 16px;

                    font-weight: 1000px;
                    color: rgba(0, 0, 0, 1);
                }
            }
        }
    }
    button {
        position: absolute;

        right: 12px;
        top: 5px;
        background: transparent;
        border: none;
        outline: none;
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`;
const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background: #f9fafb;
    img,
    video {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;
const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    overflow: auto;

    li {
        margin-right: 5px;
        font-size: 12px;
        button {
            display: flex;
        }
    }
`;
const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button {
        display: inline-flex;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background: transparent;
        font-weight: 700;

        &:hover {
            background: rgba(0, 0, 0, 0.08);
        }
    }
    span {
        color: #666666;
        margin-left: 8px;
        @media (max-width: 768px) {
            font-size: 11px;
        }
    }
`;

const Content = styled.div`
    text-align: center;
`;
export default Mainside;
