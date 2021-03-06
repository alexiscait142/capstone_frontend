import React, { Component } from "react";
import Day from "./Day";
import { NavLink } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";

class FiveK extends Component {
  state = {
    weeks: 6,
    completed_days: 0,
    complete: true,
  };

  showDayNames = () => {
    const dayArray = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return dayArray.map((day) => {
      return <div className="dayname">{day}</div>;
    });
  };

  showWeek = (number) => {
    if (typeof this.props.race_name !== "undefined") {
      const halfActivities = this.props.activities.filter(
        (activity) => activity["race"] === "5k"
      );
      const filteredAct = halfActivities.filter(
        (activity) => activity["week"] === number
      );
      const userWorkouts = this.props.workouts.filter(
        (workout) =>
          workout["user"] == localStorage.user &&
          workout["week"] == number &&
          workout["race_name"] === this.props.race_name
      );
      return filteredAct.map((activity) => {
        if (userWorkouts.length > 0) {
          const thisUserWorkout = userWorkouts.filter(
            (user) => user["day"] == activity["day"]
          );
          if (thisUserWorkout.length > 0) {
            // this.setState({completed_days: this.state.completed_days + 1})
            return (
              <Day
                workout={activity}
                race_name={this.props.race_name}
                userworkout={thisUserWorkout[0]}
              />
            );
          } else
            return <Day workout={activity} race_name={this.props.race_name} />;
        } else
          return <Day workout={activity} race_name={this.props.race_name} />;
      });
    }
  };

  userWorkouts = (number) => {
    const userWorkouts = this.props.workouts.filter(
      (workout) =>
        workout["user"] == localStorage.user && workout["week"] == number
    );
    return userWorkouts;
  };

  showDays = () => {
    const numberArray = [1, 2, 3, 4, 5, 6];
    return numberArray.map((number) => {
      return (
        <div className="week">
          <div className="space">Week {number}</div>
          {this.showWeek(number)}
        </div>
      );
    });
  };

  showUserWeek = (id, number) => {
    const halfActivities = this.props.activities.filter(
      (activity) => activity["race"] === "5k"
    );
    const filteredAct = halfActivities.filter(
      (activity) => activity["week"] === number
    );
    const thisRace = this.props.userRaces.find(
      (userRace) =>
        userRace["user"] == id &&
        userRace["distance"] === "5k" &&
        !userRace["completed"]
    );
    const userWorkouts = this.props.workouts.filter(
      (workout) =>
        workout["user"] == id &&
        workout["week"] == number &&
        workout["race_name"] === thisRace["race_name"]
    );
    return filteredAct.map((activity) => {
      if (userWorkouts.length > 0) {
        const thisUserWorkout = userWorkouts.filter(
          (user) => user["day"] == activity["day"]
        );
        if (thisUserWorkout.length > 0) {
          return (
            <Day
              friend={true}
              workout={activity}
              userworkout={thisUserWorkout[0]}
            />
          );
        } else return <Day friend={true} workout={activity} />;
      } else return <Day friend={true} workout={activity} />;
    });
  };

  showUserDays = () => {
    const numberArray = [1, 2, 3, 4, 5, 6];
    return numberArray.map((number) => {
      return (
        <div className="user-week">
          <div className="user-space">Week {number}</div>
          {this.showUserWeek(this.props.thisFriend, number)}
        </div>
      );
    });
  };

  handleClick = () => {
    const thisSchedule = this.props.userRaces.find(
      (userRace) =>
        userRace["user"] == localStorage.user && userRace["distance"] == "5k"
    );
    this.props.completeRace(
      thisSchedule["id"],
      this.state.complete,
      this.props.history
    );
  };

  calculateProgress = () => {
    const userWorkouts = this.props.workouts.filter(
      (workout) =>
        workout["user"] == localStorage.user &&
        workout["race_name"] === this.props.race_name
    );
    const numberWorkouts = userWorkouts.length;
    const numberTrainingDays = this.state.weeks * 7;
    const progressPercentage = (numberWorkouts / numberTrainingDays) * 100;
    if (Math.round(progressPercentage) !== "NaN") {
      return Math.round(progressPercentage);
    } else return 0;
  };

  calculateUserProgress = (id) => {
    const thisRace = this.props.userRaces.find(
      (userRace) =>
        userRace["user"] == id &&
        userRace["distance"] === "5k" &&
        !userRace["completed"]
    );
    const userWorkouts = this.props.workouts.filter(
      (workout) =>
        workout["user"] == id && workout["race_name"] === thisRace["race_name"]
    );
    const numberWorkouts = userWorkouts.length;
    const numberTrainingDays = this.state.weeks * 7;
    const progressPercentage = (numberWorkouts / numberTrainingDays) * 100;
    if (Math.round(progressPercentage) !== "NaN") {
      return Math.round(progressPercentage);
    } else return 0;
  };

  render() {
    return (
      <>
        {!this.props.friend
          ? [
              <div className="race">
                <h1>5k Training Schedule</h1>
                <ProgressBar progress={this.calculateProgress()} />
                <div className="week">
                  <div className="space"></div>
                  {this.showDayNames()}
                </div>
                {this.showDays()}
              </div>,
              <button onClick={this.handleClick} className="complete-button">
                Click to Complete Race
              </button>,
            ]
          : null}
        {this.props.friend
          ? [
              <p className="friend-training-schedule">5k Training Schedule</p>,
              <ProgressBar
                progress={this.calculateUserProgress(this.props.thisFriend)}
              />,
              <div className="user-race">
                <div className="user-week">
                  <div className="dayname-space"></div>
                  {this.showDayNames()}
                </div>
                {this.showUserDays()}
              </div>,
            ]
          : null}
      </>
    );
  }
}

export default FiveK;
