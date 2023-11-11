import { useFormik } from "formik";

const SignupPersonalData = () => {
    const formik = useFormik({
        initialValues: {
            dni: "",
            name: "",
            lastname_main: "",
            lastname_secondary: "",
            address: "",
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="signup-personal-data">
            <h1 className="sub-title">Registrate</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="dni">DNI</label>
                <input
                    id="dni"
                    name="dni"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.dni}
                />
                <label htmlFor="name">Nombres</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <label htmlFor="lastname_main">Apellido paterno</label>
                <input
                    id="lastname_main"
                    name="lastname_main"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastname_main}
                />
                <label htmlFor="lastname_secondary">Apellido materno</label>
                <input
                    id="lastname_secondary"
                    name="lastname_secondary"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastname_secondary}
                />
                <label htmlFor="address">Dirección</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default SignupPersonalData;
