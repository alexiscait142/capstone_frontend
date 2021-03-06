import React, { Component } from "react";

class Form extends Component {
  state = {
    user: localStorage.user,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    login: true,
    distance: "",
    race_name: "",
    workout_type: "",
    pace: "",
    duration: "",
    location: "",
    race: this.props.race,
    week: this.props.week,
    day: this.props.day,
    photo: "",
    subject: "",
    message: "",
    receiver: 0,
    error: false,
    error_message: "",
    sender: localStorage.user,
  };

  componentDidMount() {
    if (typeof this.props.friend !== "undefined") {
      this.setState({
        receiver: this.props.friend["id"],
      });
    } else if (this.props.recipient) {
      this.setState({
        receiver: this.props.recipient,
        subject: this.props.subject,
      });
    } else if (this.props.workout) {
      this.setState({
        race_name: this.props.race_name,
      });
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  handleClick = (event) => {
    if (this.props.userRaces) {
      if (event.target.className === "race-button") {
        event.preventDefault();
        const findUserRace = this.props.userRaces.find(
          (userRace) =>
            userRace["distance"] == event.target.innerText.toLowerCase() &&
            !userRace["completed"]
        );
        if (findUserRace) {
          this.setState({
            error: true,
            error_message: `You are already training for a ${event.target.innerText.toLowerCase()}.`,
          });
        } else {
          this.setState({
            distance: event.target.innerText.toLowerCase(),
            error: false,
            error_message: "",
          });
        }
      }
    } else if (event.target.className === "form-button") {
      this.setState({
        login: !this.state.login,
      });
    } else if (!this.props.userRaces) {
      event.preventDefault();
      this.setState({
        distance: event.target.innerText.toLowerCase(),
      });
    }
  };

  handleSubmit = (event) => {
    if (event.target.className === "signup") {
      event.preventDefault();
      const { first_name, last_name, username, email, password } = this.state;
      this.props.signUp(
        {
          first_name,
          last_name,
          username,
          email,
          password,
        },
        this.props.history
      );
    } else if (event.target.className === "login") {
      event.preventDefault();
      const { username, password } = this.state;
      this.props.logIn(
        {
          username,
          password,
        },
        this.props.history
      );
    } else if (event.target.className === "add-workout") {
      event.preventDefault();
      const {
        distance,
        race_name,
        user,
        race,
        week,
        day,
        workout_type,
        pace,
        duration,
        location,
      } = this.state;
      this.props.addWorkout({
        distance,
        race_name,
        user,
        race,
        week,
        day,
        workout_type,
        pace,
        duration,
        location,
      });
    } else if (event.target.className === "distances") {
      event.preventDefault();
      if (!this.state.error) {
        const { user, race_name, distance } = this.state;
        this.props.addUserRace({
          user,
          race_name,
          distance,
        });
        this.props.toggleNewRace();
      }
    } else if (event.target.className === "add-photo") {
      const { user, photo } = this.state;
      event.preventDefault();
      this.props.addPhoto({
        user,
        photo,
      });
      this.props.togglePhotoForm();
      this.setState({
        photo: "",
      });
    } else if (event.target.className === "update-photo") {
      event.preventDefault();
      this.props.updatePhotoFunction(this.props.photos["id"], this.state.photo);
      this.props.toggleUpdatePhoto();
    } else if (event.target.className === "message-form") {
      event.preventDefault();
      const { subject, message, sender, receiver } = this.state;
      this.props.sendMessage({
        subject,
        message,
        sender,
        receiver,
      });
      this.props.toggleSent();
    } else if (event.target.className === "reply-form") {
      event.preventDefault();
      const { subject, message, sender, receiver } = this.state;
      this.props.reply({
        subject,
        message,
        sender,
        receiver,
      });
      this.props.toggleSent();
    }
  };

  showForm = () => {
    if (this.props.loginreg) {
      if (this.state.login) {
        return (
          <form onSubmit={this.handleSubmit} className="login">
            <input
              onChange={this.handleChange}
              className="login-input"
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
            ></input>
            <input
              onChange={this.handleChange}
              className="login-input"
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
            ></input>
            <input className="login-button" type="submit" value="Login"></input>
            <p className="account">Don't have an account?</p>
            <button onClick={this.handleClick} className="form-button">
              Register
            </button>
          </form>
        );
      } else if (!this.state.login) {
        return (
          <form onSubmit={this.handleSubmit} className="signup">
            <input
              onChange={this.handleChange}
              className="signup-input"
              type="text"
              placeholder="first name"
              name="first_name"
              value={this.state.first_name}
            ></input>
            <input
              onChange={this.handleChange}
              className="signup-input"
              type="text"
              placeholder="last name"
              name="last_name"
              value={this.state.last_name}
            ></input>
            <input
              onChange={this.handleChange}
              className="signup-input"
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
            ></input>
            <input
              onChange={this.handleChange}
              className="signup-input"
              type="text"
              placeholder="email"
              name="email"
              value={this.state.email}
            ></input>
            <input
              onChange={this.handleChange}
              className="signup-input"
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
            ></input>
            <input
              className="signup-button"
              type="submit"
              value="Register"
            ></input>
            <p className="account">Already have an account?</p>
            <button onClick={this.handleClick} className="form-button">
              Login
            </button>
          </form>
        );
      }
    } else if (this.props.race_type) {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="distances">
            <div className="race-div">
              <div
                onClick={this.handleClick}
                className={
                  this.state.distance === "5k"
                    ? "selected-race-button"
                    : "race-button"
                }
                value="5k"
              >
                5k
              </div>
              <div
                onClick={this.handleClick}
                className={
                  this.state.distance === "10k"
                    ? "selected-race-button"
                    : "race-button"
                }
                value="10k"
              >
                10k
              </div>
              <div
                onClick={this.handleClick}
                className={
                  this.state.distance === "half marathon"
                    ? "selected-race-button"
                    : "race-button"
                }
                value="half marathon"
              >
                Half Marathon
              </div>
              <div
                onClick={this.handleClick}
                className={
                  this.state.distance === "full marathon"
                    ? "selected-race-button"
                    : "race-button"
                }
                value="full marathon"
              >
                Full Marathon
              </div>
            </div>
            <div className="submit-div">
              {this.state.error ? (
                <p className="error">{this.state.error_message}</p>
              ) : null}
              <input
                onChange={this.handleChange}
                className="race-name-input"
                type="text"
                placeholder="enter race name"
                name="race_name"
              ></input>
              <input
                className="submit-race"
                type="submit"
                value="Submit"
              ></input>
            </div>
          </form>
        </div>
      );
    } else if (this.props.workout) {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="add-workout">
            <input
              onChange={this.handleChange}
              className="workout-input"
              type="text"
              placeholder="workout type (run, bike, etc)"
              name="workout_type"
            ></input>
            <input
              onChange={this.handleChange}
              className="workout-input"
              type="text"
              placeholder="distance  (3 miles, 50 miles, etc)"
              name="distance"
            ></input>
            <input
              onChange={this.handleChange}
              className="workout-input"
              type="text"
              placeholder="pace (00:00)"
              name="pace"
            ></input>
            <input
              onChange={this.handleChange}
              className="workout-input"
              type="text"
              placeholder="duration (00:00:00)"
              name="duration"
            ></input>
            <input
              onChange={this.handleChange}
              className="workout-input"
              type="text"
              placeholder="location (Boston, Denver, etc)"
              name="location"
            ></input>
            <input
              className="workout-submit"
              type="submit"
              value="Complete Workout"
            ></input>
          </form>
        </div>
      );
    } else if (this.props.photo) {
      return (
        <form onSubmit={this.handleSubmit} className="add-photo">
          <input
            onChange={this.handleChange}
            className="photo-input"
            type="text"
            name="photo"
            value={this.state.photo}
          ></input>
          <input
            className="photo-submit"
            type="submit"
            value="add photo"
          ></input>
        </form>
      );
    } else if (this.props.updatePhoto) {
      return (
        <form onSubmit={this.handleSubmit} className="update-photo">
          <input
            onChange={this.handleChange}
            className="photo-input"
            type="text"
            name="photo"
            value={this.state.photo}
          ></input>
          <input
            className="photo-submit"
            type="submit"
            value="update photo"
          ></input>
        </form>
      );
    } else if (this.props.message) {
      return (
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            onChange={this.handleChange}
            className="message-input"
            type="text"
            placeholder="subject"
            name="subject"
          ></input>
          <textarea
            onChange={this.handleChange}
            className="message-input enter-message"
            type="text"
            placeholder="enter message"
            name="message"
          ></textarea>
          <input type="submit" className="submit-message"></input>
        </form>
      );
    } else if (this.props.reply) {
      return (
        <form onSubmit={this.handleSubmit} className="reply-form">
          <textarea
            onChange={this.handleChange}
            className="message-input enter-message"
            type="text"
            placeholder="enter message"
            name="message"
          ></textarea>
          <input type="submit" className="submit-message"></input>
        </form>
      );
    }
  };

  render() {
    return <>{this.showForm()}</>;
  }
}

export default Form;
