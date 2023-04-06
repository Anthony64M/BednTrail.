import React from 'react';
import Strava from 'strava-v3';

class StravaConnect extends React.Component {
state = {
accessToken: null,
error: null,
};

componentDidMount() {
const { clientId } = this.props;
const code = new URLSearchParams(window.location.search).get('code');
if (code) {
  Strava.oauth.getToken(clientId, code, (err, payload, limits) => {
    if (err) {
      this.setState({ error: 'Error exchanging authorization code for access token.' });
      console.error('Error exchanging authorization code for access token:', err);
    } else {
      this.setState({ accessToken: payload.access_token });
      localStorage.setItem('accessToken', payload.access_token);
    }
  });
} else {
  window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=https://yourdomain.com/strava-redirect&response_type=code&scope=read_all`;
}
}

render() {
const { accessToken, error } = this.state;
const { children } = this.props;
if (error) {
  return <p>{error}</p>;
}

if (!accessToken) {
  return <p>Loading...</p>;
}

return children({ accessToken });
}
}

class StravaProgress extends React.Component {
state = {
progress: null,
error: null,
};

componentDidMount() {
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  Strava.athletes.stats({ access_token: accessToken }, (err, payload, limits) => {
    if (err) {
      this.setState({ error: 'Error retrieving progress data.' });
      console.error('Error retrieving progress data:', err);
    } else {
      this.setState({ progress: payload });
    }
  });
} else {
  this.setState({ error: 'Please connect to Strava to view progress data.' });
}
}

render() {
const { progress, error } = this.state;
if (error) {
  return <p>{error}</p>;
}

if (!progress) {
  return <p>Loading...</p>;
}

return (
  <div>
    <h2>Strava Progress</h2>
    <p>Total Distance: {progress.all_ride_totals.distance}</p>
    <p>Total Time: {progress.all_ride_totals.elapsed_time}</p>
    <button onClick={this.handleLike}>Like this ride!</button>
  </div>
);
}

handleLike = () => {
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
Strava.activities.createComment({
access_token: accessToken,
id: this.state.progress.recent_ride_totals[0].id,
text: "I loved this ride!",
}, (err, payload, limits) => {
if (err) {
this.setState({ error: 'Error liking post.' });
console.error('Error liking post:', err);
} else {
console.log('Liked post:', payload);
}
});
} else {
this.setState({ error: 'Please connect to Strava to like a post.' });
}
}
}

class StravaEvents extends React.Component {
state = {
activities: null,
routes: null,
error: null,
};

componentDidMount() {
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  Strava.athlete.listActivities({
    access_token: accessToken,
    per_page: 10,
    if (err) {
      this.setState({ error: `Error retrieving athlete: ${err.message}` });
    } else {
      this.setState({ athlete: payload });
    }

class Bike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      activities: null,
      athlete: null,
      error: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("access_token");
    this.setState({ accessToken }, () => {
      if (accessToken) {
        Strava.athlete.get({ access_token: accessToken }, (err, athletePayload) => {
          if (err) {
            this.setState({ error: `Error retrieving athlete: ${err.message}` });
          } else {
            this.setState({ athlete: athletePayload });
          }
        });

        Strava.athlete.listActivities(
          {
            access_token: accessToken,
            per_page: 10,
          },
          (err, activitiesPayload) => {
            if (err) {
              this.setState({
                error: `Error retrieving activities: ${err.message}`,
              });
            } else {
              this.setState({ activities: activitiesPayload });
            }
          }
        );
      } else {
        this.setState({ error: "Access token not found." });
      }
    });
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
