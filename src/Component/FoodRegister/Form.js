// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// // import { addItem } from './actions';  // Assuming actions are already set up
// import { useNavigate } from 'react-router-dom'; // For navigation after form submission
// import { addItem } from '../ReduxSaga/Action/Action';

// function FormComponent() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate(); // Use navigate to redirect
//     const [formData, setFormData] = useState({ name: '' });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Dispatch addItem action
//         dispatch(addItem({ id: Date.now(), name: formData.name }));
//         // Reset form
//         setFormData({ name: '' });
//         // Redirect to table page
//         navigate('/table');
//     };

//     return (
//         <div>
//             <h1>Add Item</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ name: e.target.value })}
//                     placeholder="Enter name"
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default FormComponent;



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemRequest } from "../ReduxSaga/Action/Action";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [business, setBusiness] = useState("");
  const [food, setFood] = useState("");
  const [description, setDescription] = useState("");
  const [addressTwo, setAddressTwo] = useState("");

  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const nav = useNavigate();

  const reset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setBusiness("");
    setFood("");
    setDescription("");
    setAddressTwo("");

    setDate("");
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Your name is required. Please provide it.";
    }

    if (!email.trim()) {
      validationErrors.email =
        "Your email address is required. Please provide it.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email =
        "The email format is incorrect. Please enter a valid email.";
    }

    if (!phoneNumber.trim()) {
      validationErrors.phoneNumber =
        "Your phone number is required. Please provide it.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "The phone number must be 10 digits.";
    }
    if (!address.trim()) {
      validationErrors.address = "Your address is required. Please provide it.";
    }

    if (!business.trim()) {
      validationErrors.business =
        "Business name is required. Please enter your business name.";
    }

    if (!food.trim()) {
      validationErrors.food =
        "Food type is required. Please enter the type of food you offer.";
    }

    if (!description.trim()) {
      validationErrors.description =
        "Please provide a description of your food.";
    }
    if (!addressTwo.trim())
      validationErrors.addressTwo =
        "Please provide another address if applicable.";
    if (!date.trim()) {
      validationErrors.date =
        "Opening date is required. Please provide the intended opening date for your business.";
    }
//    debugger
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        addItemRequest({
          name,
          email,
          phoneNumber,
          address,
          business,
          food,
          description,
          addressTwo,
          date,
        })
      );

      reset();
      nav("/listmanaging");
      console.log('additem', addItemRequest)
    } else {
      setErrors(validationErrors);
    }
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setName(filteredValue);
  };

  return (
    <>
      <div className="main">
        <div className="whole-page">
          <form
            onSubmit={handleSubmit}
            className="Form-card-css card  shadow-sm   w-50"
          >
            <h3 className="title-haven  ">Food Registration </h3>
            <div className="form-contain-ner">
              <div className=" mb-3 mt-2">Personal Information :</div>
              <div className="card shadow-sm col-12 pb-2  pt-1">
                <div className="inner-card d-md-flex  col-12 pe-4 ">
                  <div className="input-box   px-1 col-md-6">
                    <label htmlFor="">Name</label>
                    <input
                      className=""
                      type="text"
                      value={name}
                      // onChange={(e) => setName(e.target.value)}
                      onChange={handleNameChange}
                    />
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>
                  <div className="input-box   px-1 col-md-6">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="inner-card d-md-flex  col-12 pe-4">
                  <div className="input-box   px-1 col-md-6">
                    <label htmlFor="">Phone Number </label>
                    <input
                      type="number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && (
                      <span className="error">{errors.phoneNumber}</span>
                    )}
                  </div>

                  <div className="input-box   px-1 col-md-6">
                    <label htmlFor="">Address</label>
                    <input
                      type=""
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                      <span className="error">{errors.address}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className=" mb-3 mt-3">Food & Its Details :</div>
              <div className="card shadow-sm col-12 pb-2  pt-1">
                <div className="inner-card d-md-flex  col-12 pe-4">
                  <div className="input-box  px-1 col-md-6">
                    <label htmlFor="">Name of Business</label>
                    <input
                      type=""
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                    />
                    {errors.business && (
                      <span className="error">{errors.business}</span>
                    )}
                  </div>
                  <div className="input-box  px-1 col-md-6">
                    <label htmlFor="">Type of Food</label>
                    <input
                      type=""
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                    />
                    {errors.food && (
                      <span className="error">{errors.food}</span>
                    )}
                  </div>
                </div>
                <div className="inner-card d-md-flex  col-12 pe-4">
                  <div className="input-box  px-1  col-md-6">
                    <label htmlFor="">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <span className="error">{errors.description}</span>
                    )}
                  </div>
                  <div className="input-box px-1  col-md-6">
                    <label htmlFor="">Address</label>
                    <textarea
                      value={addressTwo}
                      onChange={(e) => setAddressTwo(e.target.value)}
                    />
                    {errors.addressTwo && (
                      <span className="error">{errors.addressTwo}</span>
                    )}
                  </div>
                </div>
                <div className="inner-card d-md-flex  col-12 pe-4">
                  <div className="input-box  px-1 ">
                    <label htmlFor="">
                      If this is a new business, please provide the intended
                      opening date.
                    </label>
                    <input
                      type="date"
                      className="col-md-4"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && (
                      <span className="error">{errors.date}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-div mt-2">
              <button
                type="button"
                className="cancel btn-dark mt-1"
                onClick={reset}
              >
                Reset
              </button>
              <button type="submit" className="button btn-success mt-1 ">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
