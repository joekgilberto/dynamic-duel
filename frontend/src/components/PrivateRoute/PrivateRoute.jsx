import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../data";
import { getUserToken, decodeToken } from "../../utilities/auth-token";

export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const token = getUserToken();
    const { user } = useContext(UserContext);

    function evalCurrentUser() {
        const userDecoded = decodeToken(token);
        console.log("userDecoded",userDecoded);
        console.log("user",user)
        console.log(user?._id)
        console.log(user?._id !== userDecoded.id)

        if (user?._id !== userDecoded.id) {
            console.log("PrivateRoute")
            navigate("/auth");
        }
    }

    useEffect(() => {
        evalCurrentUser();
    }, []);

    if (!token) {
        console.log("PrivateRoute")
        navigate("/auth");
    }

    return children;
}