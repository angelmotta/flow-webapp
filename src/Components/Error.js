import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log(`Render Error component`);
    console.error(error);

    return (
        <div>
            <h1>Oops!!</h1>
            <h2>Something went wrong!!</h2>
            <br></br>
            <h4>Error statusText: {error.statusText}</h4>
            <h4>Error detail: {error.error.message}</h4>
        </div>
    );
};

export default Error;
