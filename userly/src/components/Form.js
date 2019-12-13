import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <Form>
        {/* name, email, password, tos checkbox, submit */}
        <label htmlFor="name">
          Name
          <Field 
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          {touched.name && errors.name && (
            <p>{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          Email 
          <Field 
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
          />
          {touched.email && errors.email && (
            <p>{errors.email}</p>
          )}
        </label>
        <label>
          Password 
          <Field 
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          {touched.password && errors.password && (
            <p>{errors.password}</p>
          )}
        </label>
        <label>
          Terms of Service
          <Field 
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );

};

const FormikUserForm = withFormik({
  // props from <AnimalForm /> in app are in props param
    mapPropsToValues(props) {
      // set initial state of form to value from parent component OR the initial value (after || )
      return {
        name: props.name || "",
        email: props.size || "",
        password: props.diet || "",
        tos: props.tos || false
      };
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      // passing a string in required makes a custom inline error msg
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log("success", res);
          // sends a status update through props in AnimalForm with value as res.data content
          setStatus(res.data);
  
          //clears form inputs, from FormikBag
          resetForm();
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm);

export default FormikUserForm

