import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUser, updateUser } from "../Reducer/Actiontype/Actions";
import { getItemsRequest, updateItemRequest } from "../ReduxSaga/Action/Action";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Edit = () => {
  const { id } = useParams();
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

  useEffect(() => {
    dispatch(getItemsRequest(id));
  }, [dispatch, id]);

  const userToUpdate = useSelector((state) => state.user);
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

  useEffect(() => {
    if (userToUpdate) {
      setName(userToUpdate.name);
      setEmail(userToUpdate.email);
      setPhoneNumber(userToUpdate.phoneNumber);
      setAddress(userToUpdate.address);
      setBusiness(userToUpdate.business);
      setFood(userToUpdate.food);
      setDescription(userToUpdate.description);
      setAddressTwo(userToUpdate.addressTwo);
      setDate(userToUpdate.date);
    }
  }, [userToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Please fill your name!";
    }

    if (!email.trim()) {
      validationErrors.email = "Please fill your email!";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email = "Invalid email format!";
    }

    if (!phoneNumber.trim()) {
      validationErrors.phoneNumber = "Please fill your number!";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number format!";
    }
    if (!address.trim()) {
      validationErrors.address = "Give your address!";
    }

    if (!business.trim()) {
      validationErrors.business = "business Name should be must!";
    }

    if (!food.trim()) {
      validationErrors.food = "Select your food please!";
    }

    if (!description.trim()) {
      validationErrors.addressTwo = "Description is required";
    }

    if (!date.trim()) {
      validationErrors.date = "date is Required!";
    }

    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        updateItemRequest(userToUpdate.id, {
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
    <div className="main">
      <div className="whole-page">
        <form onSubmit={handleSubmit} className="Form-card-css  shadow-lg w-50">
          <h3 className="title-haven">Food Registration</h3>

          <div className="form-contain-ner">
            <div className=" mb-3 mt-2">Personal Information :</div>
            <div className="card shadow-sm col-12 pb-2 pt-1">
              <div className="inner-card d-md-flex col-12 pe-4">
                <div className="input-box col-md-6 px-1">
                  <label htmlFor="">Name </label>
                  <input type="text" value={name} onChange={handleNameChange} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="input-box col-md-6 px-1">
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
                <div className="input-box px-1 col-md-6">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phoneNumber && (
                    <span className="error">{errors.phoneNumber}</span>
                  )}
                </div>

                <div className="input-box col-md-6 px-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
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
                <div className="input-box  px-1 col-md-6 ">
                  <label htmlFor="">Name of Business</label>
                  <input
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                  {errors.business && (
                    <span className="error">{errors.business}</span>
                  )}
                </div>
                <div className="input-box px-1 col-md-6  ">
                  <label htmlFor="">Type of Food</label>
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  />
                  {errors.food && <span className="error">{errors.food}</span>}
                </div>
              </div>
              <div className="inner-card d-md-flex  col-12 pe-4">
                <div className="input-box col-md-6 px-1">
                  <label htmlFor="">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <span className="error">{errors.description}</span>
                  )}{" "}
                </div>
                <div className="input-box col-md-6 px-1">
                  <label htmlFor="">Address</label>
                  <textarea
                    value={addressTwo}
                    onChange={(e) => setAddressTwo(e.target.value)}
                  />
                  {errors.addressTwo && (
                    <span className="error">{errors.addressTwo}</span>
                  )}{" "}
                </div>
              </div>
              <div className="inner-card d-md-flex  col-12 pe-4 ">
                <div className="input-box  px-1">
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
                  {errors.date && <span className="error">{errors.date}</span>}
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="btn-div mt-1">
            {/* <button
              type="button"
              className="cancel btn-dark mt-1"
              onClick={reset}
            >
              Reset
            </button> */}
            <button type="submit" className="button btn-success px-4 mt-2">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
