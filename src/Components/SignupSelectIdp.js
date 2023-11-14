import NavBar from "./NavBar";
import { useEffect } from "react";
import { FLOW_USERS_API_URL } from "../util/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const SignupSelectIdp = () => {
    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => {
        const onPageLoad = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id: process.env.G_CLIENT_ID,
                callback: handleGoogleCredential,
            });

            google.accounts.id.renderButton(
                document.getElementById("g-signup-div"),
                { theme: "outline", size: "large", shape: "rectangular" }
            );
        };
        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

    const handleGoogleCredential = async (response) => {
        console.log("Google ID token: " + response.credential);
        const token = response.credential;
        // Send post request
        try {
            console.log("Post request to USERS_API");
            const responseApi = await fetch(`${FLOW_USERS_API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ step: "1", idp: "google" }),
            });
            if (responseApi.ok) {
                console.log(`API response: email is available`);
                authContext.setIsValidExternalToken(true);
                authContext.setExternalToken(token);
                navigate("/signup/step2");
            } else {
                // TODO: Handle if user already exists (409: conflict)
                console.log(`Received status: ${responseApi.status}`);
                const res = await responseApi.json();
                console.log(res.error);
                // setErrorResponse(res.error);   // Show error message to user
            }
        } catch (error) {
            console.log("Fetch error: something went wrong");
            console.log(error);
            // setErrorResponse(
            //     "Servicio no disponible: intentalo nuevamente en unos minutos"
            // ); // Flow App auth service is down
        }
    };

    return (
        <div className="signup-container">
            <h1 className="sub-title">Crea tu cuenta</h1>
            <div className="idp-options-container">
                <div className="idp-container" id="g-signup-div"></div>
            </div>
        </div>
    );
};

export default SignupSelectIdp;
