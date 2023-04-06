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
      window.location.href = `https://www.strava.com/oauth/authorize?client_id=${105214}&redirect_uri=${'https://bedntrail.netlify.app/strava-redirect'}&response_type=code&scope=read_all`;
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

class Walk extends React.Component {
  state = {
    events: null,
    error: null,
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      Strava.activities.get({ access_token: accessToken }, (err, payload, limits) => {
        if (err) {
          this.setState({ error: 'Error retrieving activity data.' });
          console.error('Error retrieving activity data:', err);
        } else {
          this.setState({ events: payload });
        }
      });
    } else {
      this.setState({ error: 'Please connect to Strava to view activity data.' });
    }
  }

  render() {
    const { events, error } = this.state;

    if (error) {
      return <p>{error}</p>;
    }

    if (!events) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Strava Activities</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.name} - {new Date(event.start_date).toLocaleString()} - {event.type}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Walk;
