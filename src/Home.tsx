import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const reach_test = () => {
        navigate("/Test");
    }
    const reach_home = () => {
        navigate("/");
    }
    const reach_app = () => {
        navigate("/App");
    }
    return (
        <>
            <h1>Home</h1>
            <p>
                This is Yusuke's home page.
            </p>
            <button onClick={reach_test}>Go to test</button>
            <br />
            <button onClick={reach_app}>Go to app</button>
            <br />
            <button onClick={reach_home}>Go to home</button>
        </>
    )
}

export default Home;