import { useNavigate, Link } from "react-router-dom";
import {
    // Button,
    Heading,
    // Text,
    Box,
    // Stack,
    Flex
} from "@yamada-ui/react";

const my_repository_name = "yusu_webapp";

const Home = () => {
    const navigate = useNavigate();
    const reach_test = () => {
        navigate("/Test");
    }
    const reach_home = () => {
        navigate("/" + my_repository_name + "/");
        // navigate("/");
    }
    const reach_app = () => {
        navigate("/App");
    }

    return (
        <>
            <Heading size="3xl" as="h1">Home</Heading>
            <Heading size="lg" as="h2" color="green.700">This is Yusuke's home page.</Heading>
            <br/>
            <Flex gap="md">
                <Box as="button" onClick={reach_test} p="md" rounded="md" bg="primary" color="white">Test</Box>

                <Box as="button" onClick={reach_app} p="md" rounded="md" bg="secondary" color="white">App</Box>

                <Link to="/ArtifactChecker">
                    <Box p="md" rounded="md" bg="danger" color="white">Artifact Checker</Box>
                </Link>
            </Flex>
            <br/>
            <Box as="button" onClick={reach_home} p="md" rounded="md" bg="black" color="white" w="sl">
                Home
            </Box>
        </>
    )
}

export default Home;