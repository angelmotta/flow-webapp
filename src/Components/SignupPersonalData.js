import { useFormik } from "formik";
import { FLOW_USERS_API_URL } from "../util/constants";
import * as Yup from "yup";

const handleSubmit = async (values) => {
    try {
        const response = await fetch(`${FLOW_USERS_API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                step: "2",
                idp: "google",
                ...values,
            }),
        });

        if (response.ok) {
            console.log(`Successfully response`);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            console.log(`Backend error response`);
            const jsonErrorResponse = await response.json();
            console.log(jsonErrorResponse);
        }
    } catch (e) {
        console.log("something went wrong");
        console.log(e);
    }
};

const SignupPersonalData = () => {
    const formik = useFormik({
        initialValues: {
            dni: "",
            name: "",
            lastname_main: "",
            lastname_secondary: "",
            address: "",
        },
        validationSchema: Yup.object({
            dni: Yup.string()
                .matches(/^[0-9]*$/, "DNI debe ser digitos")
                .max(8, "DNI debe ser 8 digitos")
                .min(8, "DNI debe ser 8 digitos")
                .required("DNI requerido"),
            name: Yup.string()
                .max(100, "Nombre debe ser 100 caracteres o menos")
                .required("Nombre requerido"),
            lastname_main: Yup.string()
                .max(100, "Apellido paterno debe ser 100 caracteres o menos")
                .required("Apellido paterno requerido"),
            lastname_secondary: Yup.string()
                .max(100, "Apellido materno debe ser 100 caracteres o menos")
                .required("Apellido materno requerido"),
            address: Yup.string()
                .max(100, "Dirección debe ser 100 caracteres o menos")
                .required("Dirección requerida"),
        }),
        // onSubmit: (values) => {
        //     alert(JSON.stringify(values, null, 2));
        // },
        onSubmit: handleSubmit,
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
                    onBlur={formik.handleBlur}
                    value={formik.values.dni}
                />
                {formik.touched.dni && formik.errors.dni ? (
                    <div>{formik.errors.dni}</div>
                ) : null}

                <label htmlFor="name">Nombres</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                ) : null}

                <label htmlFor="lastname_main">Apellido paterno</label>
                <input
                    id="lastname_main"
                    name="lastname_main"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname_main}
                />
                {formik.touched.lastname_main && formik.errors.lastname_main ? (
                    <div>{formik.errors.lastname_main}</div>
                ) : null}

                <label htmlFor="lastname_secondary">Apellido materno</label>
                <input
                    id="lastname_secondary"
                    name="lastname_secondary"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname_secondary}
                />
                {formik.touched.lastname_secondary &&
                formik.errors.lastname_secondary ? (
                    <div>{formik.errors.lastname_secondary}</div>
                ) : null}

                <label htmlFor="address">Dirección</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                    <div>{formik.errors.address}</div>
                ) : null}

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default SignupPersonalData;
