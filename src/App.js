import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import Landing from "./components/Landing";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
function App(props) {
    useEffect(() => {
        props.getUserAuth();
    }, []);
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/home" element={<Main />} />
                </Routes>
            </Router>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUserAuth: () => {
            dispatch(getUserAuth());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
