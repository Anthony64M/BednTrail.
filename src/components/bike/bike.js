import React from 'react';
import Strava from 'strava-v3';



class Bike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      athlete: null,
      activities: null,
      error: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("accessToken");
    this.setState({ accessToken }, () => {
      if (accessToken) {
        Strava.athlete.get({ access_token: accessToken }, (err, payload) => {
          if (err) {
            this.setState({ error: `Error retrieving athlete: ${err.message}` });
          } else {
            this.setState({ athlete: payload });
          }
        });
      } else {
        this.setState({ error: "Access token not found." });
      }
    });
    if (accessToken) {
      Strava.athlete.listActivities(
        {
          access_token: accessToken,
          per_page: 10,
        },
        (err, payload) => {
          if (err) {
            this.setState({ error: `Error retrieving activities: ${err.message}` });
          } else {
            this.setState({ activities: payload });
          }
        }
      );
    }
  }

  render() {
    const { accessToken, athlete, activities, error } = this.state;
    if (!accessToken) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <h1>{athlete.firstname}'s Last 10 Rides</h1>
        {error && <div>{error}</div>}
        {activities && (
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                {activity.name} - {activity.distance}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Bike;
