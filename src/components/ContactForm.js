import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ContactForm.css";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateofBirth, setDateOfBirth] = useState("");
  const [postCode, setPostCode] = useState("");
  const [mobile, setMobile] = useState("");

  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [lastNameErrors, setlastNameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [postCodeError, setPostCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitUserDetails = async () => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dateofBirth,
      postcode: postCode,
      mobile: mobile,
    };
    const postUrl = "http://localhost:8080/user";

    try {
      const { status } = await axios.post(postUrl, userData);
      if (status === 200) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _handleSubmit = (event) => {
    event.preventDefault();

    const spCharRegExp = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    const numberRegExp = /[0-9]/;
    const onlyNumbersRegExp = /^[0-9]+$/;
    const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let firstNameErrorsArr = [];
    let lastNameErrorsArr = [];
    let emailErrorsArr = [];
    let postCodeErrorString = "";
    let mobileErrorString = "";

    if (
      !(firstName.length > 0) ||
      spCharRegExp.test(firstName) ||
      numberRegExp.test(firstName) || // Checking for possible errors related to firstName
      !(lastName.length > 0) ||
      spCharRegExp.test(lastName) ||
      numberRegExp.test(lastName) || // Checking for possible errors related to lastName
      !(email.length > 0) ||
      !emailRegExp.test(email) || // Checking for possible errors related to email
      !onlyNumbersRegExp.test(postCode) || // Checking for error related to postcode
      !onlyNumbersRegExp.test(mobile) // Checking for error related to mobile
    ) {
      if (!(firstName.length > 0)) {
        firstNameErrorsArr.push("This is a required field");
      }
      if (spCharRegExp.test(firstName)) {
        firstNameErrorsArr.push("A name cannot contain a special character");
      }
      if (numberRegExp.test(firstName)) {
        firstNameErrorsArr.push("A name cannot contain numbers");
      }
      setFirstNameErrors(firstNameErrorsArr); // setting the firstNameErrors based on the conditional result

      if (!(lastName.length > 0)) {
        lastNameErrorsArr.push("This is a required field");
      }
      if (spCharRegExp.test(lastName)) {
        lastNameErrorsArr.push("A name cannot contain a special character");
      }
      if (numberRegExp.test(lastName)) {
        lastNameErrorsArr.push("A name cannot contain numbers");
      }
      setlastNameErrors(lastNameErrorsArr); // setting the lastNameErrors based on the conditional result

      if (!(email.length > 0)) {
        emailErrorsArr.push("This is a required field");
      }
      if (!emailRegExp.test(email)) {
        emailErrorsArr.push(
          "Invalid email. Please enter email as name@email.com"
        );
      }
      setEmailErrors(emailErrorsArr); // setting the email errors

      if (postCode.length > 0 && !onlyNumbersRegExp.test(postCode)) {
        postCodeErrorString =
          "Please enter valid post code containing only numerical characters";
      }
      setPostCodeError(postCodeErrorString); // setting the post code error

      if (mobile.length > 0 && !onlyNumbersRegExp.test(mobile)) {
        mobileErrorString =
          "Please enter valid mobile number containing only numerical characters";
      }
      setMobileError(mobileErrorString); // setting the mobile number error

      return;
    }
    console.log("submitted");
    submitUserDetails();
  };

  if (isSubmitted) {
    return (
      <div className="container">
        <h2>
          You are now subscribed successfully! Stay tuned for future updates!!{" "}
        </h2>
        <button
          className="button"
          onClick={(e) => {
            setIsSubmitted(false);
          }}
        >
          Back to home
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h2> Subscribe to learn more about our products!</h2>

        <form onSubmit={_handleSubmit}>
          <label>
            <p>Email*</p>
            <input
              type="email"
              name="email"
              className="inputName"
              onInput={(e) => {
                setEmailErrors([]);
                setEmail(e.target.value);
              }}
            />
          </label>
          {emailErrors.length > 0 ? (
            <ul className="input-error">
              {emailErrors.map((error) => {
                return <li key={emailErrors.indexOf(error)}>{error}</li>;
              })}
            </ul>
          ) : (
            ""
          )}

          <label>
            <p>First Name*</p>
            <input
              type="text"
              name="firstName"
              className="inputName"
              onInput={(e) => {
                setFirstNameErrors([]);
                setFirstName(e.target.value);
              }}
            />
          </label>
          {firstNameErrors.length > 0 ? ( // Mapping through the firstName field errors and displaying using conditional rendering
            <ul className="input-error">
              {firstNameErrors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </ul>
          ) : (
            ""
          )}
          <label>
            <p>Last Name*</p>
            <input
              type="text"
              name="lastName"
              className="inputName"
              onInput={(e) => {
                setlastNameErrors([]);
                setLastName(e.target.value);
              }}
            />
          </label>
          {lastNameErrors.length > 0 ? (
            <ul className="input-error">
              {lastNameErrors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </ul>
          ) : (
            ""
          )}
          <label>
            <label>
              <p>Date of Birth</p>
              <input
                type="date"
                name="dateofBirth"
                className="inputName dobInput"
                max={`${moment().format("YYYY-MM-DD")}`}
                onInput={(e) => {
                  setDateOfBirth(e.target.value);
                }}
              />
            </label>
            <p>Postcode</p>
            <input
              type="text"
              name="postCode"
              className="inputName"
              onInput={(e) => {
                setPostCodeError("");
                setPostCode(e.target.value);
              }}
            />
          </label>
          {postCodeError ? (
            <ul className="input-error">
              <li>{postCodeError}</li>
            </ul>
          ) : (
            ""
          )}
          <label>
            <p>Mobile</p>
            <input
              type="text"
              name="mobile"
              className="inputName"
              onInput={(e) => {
                setMobileError("");
                setMobile(e.target.value);
              }}
            />
          </label>
          {mobileError ? (
            <ul className="input-error">
              <li>{mobileError}</li>
            </ul>
          ) : (
            ""
          )}
          <p>
            <input className="button" type="submit" value="Subscribe"></input>
          </p>
        </form>
      </div>
    );
  }
};

export default ContactForm;
