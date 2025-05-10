import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";
import { clearError } from "../../redux/auth/slice";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const getError = useSelector(selectError);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (getError) {
      toast.error(`${getError}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    dispatch(clearError());
  }, [getError, dispatch]);

  return (
    <div className={css.form}>
      <p className={css.title}>Please Register</p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.formElem}>
            <div className={css.field}>
              <label className={css.label}>Name:</label>
              <Field className={css.input} type="text" name="name" />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
            <div className={css.field}>
              <label className={css.label}>Email:</label>
              <Field className={css.input} type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.field}>
              <label className={css.label}>Password:</label>
              <Field className={css.input} type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <div className={css.element}>
              <p className={css.text}>Do you have an account?</p>
              <NavLink className={css.navLink} to="/login">
                Login Now
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
