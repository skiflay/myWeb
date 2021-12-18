import React from "react";
//import emailjs from "emailjs-com";
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        name: "",
        subject: "",
        phone: "",
        email: "",
        content: ''
      },
    };
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let errors = this.state.errors;
   

    switch (name) {
      case "name":
        errors.name = value.length === 0 ? "Name is not empty" : "";
        break;
      case "subject":
        errors.subject = value.length < 5 ? "Subject must be 5 characters" : "";
        break;
      case "phone":
        errors.phone = value.length < 5 ? "phone is not empty" : "";
        break;
      case "email":
        errors.email = value.length < 5 ? "Subject is not empty" : "";
        let appos = value.indexOf("@");
        let dots = value.lastIndexOf(".");

        if (appos < 1 || dots - appos < 2) {
          errors.email = "please enter valid email";
        }

        break;

      default:
        break;
    }
    //this.setState({ errors, [name]: value });
    const copyData = {...this.state.errors}
    copyData[name] = event.target.value
    this.setState({errors: copyData})

  };

  submitHandler = (e) => {
    e.preventDefault();
    if (
      this.state.errors.name.length === 0 &&
      this.state.errors.subject.length === 0 &&
      this.state.errors.phone.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      alert("form is invalid");
      
    } else {
      alert("form is Submitted");
      const data = {...this.state.errors}
      
      this.setState({
        errors: {
          name: "",
          subject: "",
          phone: "",
          email: "",
          content: ''
        },
      })
      console.log(data)
      axios.post('https://tucv4obg7k.execute-api.us-east-1.amazonaws.com/c1/contact',data )
      .then(res=> console.log('Thank you', res))
    }
    // emailjs
    //   .sendForm(
    //     "gmail",
    //     "template_zo1q2mh",
    //     e.target,
    //     "user_vvQtVRIgqRETJC2JHOJz9"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       alert("form is valid");
    //     },
    //     (error) => {
    //       console.log(error.text);
    //       alert("form is invalid");
    //     }
    //   );
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.submitHandler.bind(this)} className="form_class">
        <div className="row">
          <div className="col-lg-6">
            <input
              type="text"
              id="name"
              value={this.state.errors.name}
              name="name"
              className="form-control"
              placeholder="Your Name*"
              onChange={this.handleChange}
            />
            <p>{errors.name}</p>
          </div>
          <div className="col-lg-6">
            <input
              type="email"
              value={this.state.errors.email}
              className="form-control"
              id="email"
              name="email"
              placeholder="Your Email*"
              onChange={this.handleChange}
            />
            <p>{errors.email}</p>
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              id="subject"
              value={this.state.errors.subject}
              name="subject"
              className="form-control"
              placeholder="Subject*"
              onChange={this.handleChange}
            />
            <p>{errors.subject}</p>
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              id="phone"
              value={this.state.errors.phone}
              name="phone"
              placeholder="Phone*"
              onChange={this.handleChange}
            />
            <p>{errors.phone}</p>
          </div>
        </div>
        <textarea
          name="content"
          id="message"
          value={this.state.errors.content}
          className="form-control"
          rows="6"
          placeholder="Your Message ..."
          onChange={this.handleChange}
        ></textarea>
        <button type="submit" className="btn send_btn theme_btn">
          Send Message
        </button>
      </form>
    );
  }
}

export default Form;
