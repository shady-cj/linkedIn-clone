import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import {
    SET_USER,
    SET_LOADING_STATUS,
    LOADING_PROGRESS,
    GET_POSTS,
} from "./actionType";

// Making action creators

const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});
const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});
const setProgress = (progress) => ({
    type: LOADING_PROGRESS,
    progress: progress,
});

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts: posts,
});
export function signInApi() {
    return (dispatch) => {
        auth.signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((err) => {
                alert(err.message);
            });
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await dispatch(setUser(user));
            }
        });
    };
}

export function signOutApi() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
}

export function postArticleApi(payload) {
    return (dispatch) => {
        const media =
            payload.image.length != 0
                ? "images"
                : payload.video.videoBlob.length != 0
                ? "videos"
                : null;
        const mediaName =
            payload.image.length != 0
                ? payload.image.name
                : payload.video.videoName.length != 0
                ? payload.video.videoName
                : null;
        const mediaFile =
            payload.image.length != 0
                ? payload.image
                : payload.video.videoBlob.length != 0
                ? payload.video.videoBlob
                : null;

        dispatch(setLoading(true));
        if (payload.image != "" || payload.video.videoBlob != "") {
            const upload = storage.ref(`${media}/${mediaName}`).put(mediaFile);

            upload.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    if (snapshot.state === "running") {
                        dispatch(setProgress(progress));
                    }
                },
                (err) => console.log(err.code),
                async () => {
                    const downloadURL =
                        await upload.snapshot.ref.getDownloadURL();
                    console.log(downloadURL, "downloadURl");
                    db.collection("posts").add({
                        author: {
                            email: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        postVideo:
                            media === "videos" ? downloadURL : payload.video,
                        postImage:
                            media === "images" ? downloadURL : payload.image,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false));
                }
            );
        } else {
            db.collection("posts").add({
                author: {
                    email: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                postVideo: payload.video,
                postImage: payload.image,
                comments: 0,
                description: payload.description,
            });
            dispatch(setLoading(false));
        }
    };
}

export function getPostApi() {
    return (dispatch) => {
        db.collection("posts")
            .orderBy("author.date")
            .onSnapshot((snapshot) => {
                const payload = snapshot.docs.map((doc) => doc.data());
                dispatch(getPosts(payload));
            });
    };
}
