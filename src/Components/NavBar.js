import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <div className="desktop-nav-container">
                <div className="logo">Flow</div>
                <div className="signin-signup">
                    <Link to="/login" className="link">
                        Login
                    </Link>
                    <Link to="/signup/step1" className="link">
                        Signup
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
