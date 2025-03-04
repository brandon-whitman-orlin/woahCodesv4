import React from "react";
import { Link } from "react-router-dom";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <form action="/submit-form" method="POST" name="contact">
      <label htmlFor="name">What should I call you?</label>
      <input
        id="name"
        placeholder="What should I call you?"
        type="text"
        name="name"
        autoComplete="name"
        required=""
      />
      <label htmlFor="email">What is your email?</label>
      <input
        id="email"
        placeholder="What is your email?"
        type="email"
        name="email"
        autoComplete="email"
        required=""
      />
      <label htmlFor="name">What can I do for you?</label>
      <input
        id="reason"
        list="reasons"
        placeholder="What can I do for you?"
        name="browser"
      />
      <datalist id="reasons">
        <option value="Let's work together" />
        <option value="I have a question" />
      </datalist>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
