import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const reach_test = () => {
        navigate("/Test");
    }
    const reach_home = () => {
        navigate("/");
    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={reach_test}>Go to test</button>
            <button onClick={reach_home}>Go to home</button>
        </>
    )
}

export default Home;