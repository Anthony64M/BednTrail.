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
      </div>
    );
  }
}

function Run() {
    return (
      <div>
        <StravaConnect 
          clientId={105214} 
          redirectUri={'https://bedntrail.netlify.app/strava-redirect'}
          render={({ accessToken }) => (
            <div>
              <h1>BednTrail</h1>
              <p>Connect to Strava to view your progress data:</p>
              {accessToken ? <StravaProgress /> : <a href={window.location.href}>Connect to Strava</a>}
            </div>
          )}
        />
      </div>
    );
  }
  
  export default Run;
  