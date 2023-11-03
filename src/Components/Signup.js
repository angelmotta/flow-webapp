import NavBar from "./NavBar";
import { useEffect } from "react";

const Signup = () => {
    useEffect(() => {
        const onPageLoad = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id: process.env.G_CLIENT_ID,
                callback: handleCredentialResponse,
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

    const handleCredentialResponse = async (response) => {
        console.log("Google ID token: " + response.credential);
        // Send post request
        try {
            console.log("TODO: execute post request");
            // const responseAuth = await fetch(`${AUTH_API_URL}/signup`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ credential: response.credential }),
            // });
            // if (responseAuth.ok) {
            //     console.log(`user successfully validated`);
            //     // auth.saveUserData(responseAuth);     // Navigate to dashboard
            //     // Save external token to the step register personal information
            //     auth.setExternalToken(response.credential);     // Navigate to dashboard
            //     // Navigate to SignupUser
            //     goTo("/signup/user");
            //     console.log(`Oauth flow finished`);
            // } else {
            //     // User already exists (409: conflict)
            //     console.log(`Received status: ${responseAuth.status}`);
            //     const res = (await responseAuth.json());
            //     console.log(res.error);
            //     setErrorResponse(res.error);   // Show error message to user
            // }
        } catch (error) {
            console.log("Fetch error: something went wrong");
            console.log(error);
            setErrorResponse(
                "Servicio no disponible: intentalo nuevamente en unos minutos"
            ); // Flow App auth service is down
        }
    };

    return (
        <div>
            <NavBar />
            <div className="signup-container">
                <h1>Crea tu cuenta</h1>
                <div className="idp-options-container">
                    <div className="idp-container" id="g-signup-div"></div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
