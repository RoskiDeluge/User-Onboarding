import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {




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
        </label>
        <label htmlFor="email">
          Email 
          <Field 
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
          />
        </label>
        <label>
          Password 
          <Field 
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
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

export default UserForm

