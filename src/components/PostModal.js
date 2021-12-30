import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { postArticleApi } from "../actions";

const PostModal = ({ showModal, handleClick }) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [shareVideo, setShareVideo] = useState("");
    const [videoInfo, setVideoInfo] = useState({
        videoBlob: "",
        videoName: "",
    });

    const refLoading = useRef(null);
    const user = useSelector((state) => state.userState.user);
    const loading = useSelector((state) => state.articleState.loading);
    const progress = useSelector((state) => state.articleState.progress);
    const dispatch = useDispatch();
    useEffect(() => {
        if (refLoading.current != null) {
            refLoading.current.style.width = `${progress}%`;
        }
    }, [progress]);
    const handleChange = (e) => {
        const media = e.target.files[0];
        if (media === "" || media === undefined) {
            alert(`not an image, the file is a ${typeof image}`);
            return;
        }

        switch (e.target.name) {
            case "image":
                setShareImage(media);
                setShareVideo("");

                break;
            case "video":
                setShareImage("");
                let reader = new FileReader();
                reader.readAsArrayBuffer(media);
                reader.onload = function (e) {
                    // The file reader gives us an ArrayBuffer:
                    let buffer = e.target.result;

                    // We have to convert the buffer to a blob:
                    let videoBlob = new Blob([new Uint8Array(buffer)], {
                        type: "video/mp4",
                    });
                    console.log(videoBlob, "the blob");

                    // The blob gives us a URL to the video file:
                    let url = window.URL.createObjectURL(videoBlob);

                    setVideoInfo({
                        ...videoInfo,
                        videoName: url
                            .replace("blob:http://localhost:3000/", "")
                            .trim(),
                        videoBlob: videoBlob,
                    });

                    setShareVideo(url);
                };

                break;
            default:
                setShareImage("");
                setShareVideo("");
                setVideoInfo({ videoBlob: "", videoName: "" });
        }
    };

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setShareVideo("");
        setVideoInfo({ videoBlob: "", videoName: "" });
        handleClick(e);
    };

    const postArticle = (e) => {
        e.preventDefault();

        const payload = {
            user: user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
            video: videoInfo,
            image: shareImage,
        };
        dispatch(postArticleApi(payload));

        reset(e);
    };
    return (
        <Container>
            {loading ? (
                <Loader ref={refLoading}></Loader>
            ) : (
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={reset}>
                            <img src="/images/close-icon.svg" alt="" />
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            <img
                                src={user ? user.photoURL : "images/user.svg"}
                                alt=""
                            />
                            <span>{user.displayName}</span>
                        </UserInfo>

                        <Editor>
                            <textarea
                                value={editorText}
                                onChange={(e) => setEditorText(e.target.value)}
                                placeholder="What do you want to talk about?"
                                autoFocus={true}
                            ></textarea>
                            <UploadImage>
                                {shareImage ? (
                                    <img
                                        src={URL.createObjectURL(shareImage)}
                                        alt=""
                                    />
                                ) : shareVideo ? (
                                    <video controls>
                                        <source
                                            src={shareVideo}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                ) : (
                                    ""
                                )}
                                {(shareImage || shareVideo) && (
                                    <button onClick={() => setShareImage("")}>
                                        Remove Media
                                    </button>
                                )}
                            </UploadImage>
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttatchAssets>
                            <AssetButton>
                                <label htmlFor="image-upload">
                                    <img src="/images/share-image.svg" alt="" />
                                </label>

                                <input
                                    type="file"
                                    accept="image/gif,image/jpeg,image/png"
                                    id="image-upload"
                                    name="image"
                                    onChange={handleChange}
                                    hidden
                                />
                            </AssetButton>
                            <AssetButton>
                                <label htmlFor="video-upload">
                                    <img src="/images/share-video.svg" alt="" />
                                </label>

                                <input
                                    type="file"
                                    accept="video/*"
                                    id="video-upload"
                                    name="video"
                                    capture="camcorder"
                                    onChange={handleChange}
                                    hidden
                                />
                            </AssetButton>
                        </AttatchAssets>
                        <ShareComment>
                            <AssetButton>
                                <img src="/images/comments-icon.svg" alt="" />
                                Anyone
                            </AssetButton>
                        </ShareComment>
                        <PostButton
                            disabled={editorText.length > 0 ? false : true}
                            onClick={postArticle}
                        >
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            )}
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
`;
const Loader = styled.div`
    position: absolute;
    top: 0;
    width: 0;
    background: #0a66c2;
    height: 10px;
    transition: width 0.3s ease-in-out;
`;
const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        font-weight: 300;
        color: black;
        font-size: 20px;
    }
    button {
        height: 30px;
        width: 30px;
        min-width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        img {
            width: 20px;
            height: 20px;
        }
        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 750;
        font-size: 18px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;
const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 30px;
`;
const AssetButton = styled.button`
    display: flex;
    background: transparent;
    cursor: pointer;
    align-items: center;
    font-weight: 600;
    color: #666666;
    border: none;
    label {
        cursor: pointer;
    }
`;

const AttatchAssets = styled.div`
    display: flex;

    align-items: center;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
    }
`;
const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: #0a66c2;
    color: white;
    border: none;

    cursor: pointer;
    &:hover {
        background: #004182;
    }
    &:disabled {
        background: #004182;
        color: #666666;
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        font-size: 16px;
        border: none;
        outline: none;
        padding: 5px 14px 12px;
        font-family: Arial, Helvetica, sans-serif;
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;

        object-fit: cover;
    }
    video {
        width: 100%;
        object-fit: cover;
    }
    button {
        padding: 12px 19px;
        border: none;
        border-radius: 7px;
        margin-top: 20px;
        color: white;
        font-weight: 700;
        cursor: pointer;
        outline: none;
        background: #666666;
    }
`;
export default PostModal;
//  background: ${(props) =>
//         props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2";
