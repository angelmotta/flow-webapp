import NavBar from "./NavBar";
import { useEffect } from "react";
import { FLOW_USERS_API_URL } from "../util/constants";

const SignupSelectIdp = () => {
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
            const resApi = await fetch(`${FLOW_USERS_API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ step: "1", idp: "google" }),
            });
            if (resApi.ok) {
                console.log(`user is available`);
                // TODO: Navigate to Step 2
            } else {
                // User already exists (409: conflict)
                console.log(`Received status: ${resApi.status}`);
                const res = await resApi.json();
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
            <h1>Crea tu cuenta</h1>
            <div className="idp-options-container">
                <div className="idp-container" id="g-signup-div"></div>
            </div>
        </div>
    );
};

export default SignupSelectIdp;
