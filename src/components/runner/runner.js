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

            handleLike = (activityId) => {
              const accessToken = localStorage.getItem('accessToken');
              if (accessToken) {
                Strava.activities.createComment({
                  access_token: accessToken,
                  id: activityId,
                  text: 'Liked',
                }, (err, payload, limits) => {
                  if (err) {
                    console.error('Error liking activity:', err);
                  } else {
                    console.log('Activity liked:', payload);
                  }
                });
              }
            }

            handleComment = (activityId, comment) => {
              const accessToken = localStorage.getItem('accessToken');
              if (accessToken) {
                Strava.activities.createComment({
                  access_token: accessToken,
                  id: activityId,
                  text: comment,
                }, (err, payload, limits) => {
                  if (err) {
                    console.error('Error commenting on activity:', err);
                  } else {
                    console.log('Activity commented on:', payload);
                  }
                });
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
                  <button onClick={() => this.handleLike(progress.recent_ride_totals.id)}>Like</button>
          <button onClick={() => this.handleComment(progress.recent_ride_totals.id)}>Comment</button>
          </div>
          );
          }
          }

          class StravaEvents extends React.Component {
          state = {
          upcomingEvents: [],
          error: null,
          };

          componentDidMount() {
          Strava.events.listUpcoming({ per_page: 10 }, (err, payload, limits) => {
          if (err) {
          this.setState({ error: 'Error retrieving upcoming events.' });
          console.error('Error retrieving upcoming events:', err);
          } else {
          this.setState({ upcomingEvents: payload });
          }
          });
          }

          render() {
          const { upcomingEvents, error } = this.state;
          if (error) {
            return <p>{error}</p>;
          }

          if (upcomingEvents.length === 0) {
            return <p>No upcoming events to display</p>;
          }

          return (
            <div>
              <h2>Upcoming Events</h2>
              {upcomingEvents.map((event) => (
                <div key={event.id}>
                  <h3>{event.name}</h3>
                  <p>Date: {new Date(event.time).toLocaleDateString()}</p>
                  <p>Location: {event.location}</p>
                </div>
              ))}
            </div>
          );
          }
          }

          class StravaRoutes extends React.Component {
          state = {
          routes: [],
          error: null,
          };

          componentDidMount() {
          Strava.routes.list({ per_page: 10, bounds: [40.9539, -4.6308, -4.4067, 5.8833] }, (err, payload, limits) => {
          if (err) {
          this.setState({ error: 'Error retrieving routes.' });
          console.error('Error retrieving routes:', err);
          } else {
          this.setState({ routes: payload });
          }
          });
          }

          render() {
          const { routes, error } = this.state;
          if (error) {
            return <p>{error}</p>;
          }

          if (routes.length === 0) {
            return <p>No routes to display</p>;
          }

          return (
            <div>
              <h2>Routes in Kenya</h2>
              {routes.map((route) => (
                <div key={route.id}>
                  <h3>{route.name}</h3>
                  <p>{route.distance} meters</p>
                  <p>{route.elevation_gain} meters of elevation gain</p>
                </div>
              ))}
            </div>
          );
          }
          }

          function Runner() {
          return (
          <div>
          <StravaConnect clientId={105214} redirectUri={'https://bedntrail.netlify.app/strava-redirect'}>
          {({ accessToken }) => (
          <div>
          <h1>BednTrail</h1>
          <p>Connect to Strava to view your progress data:</p>
          {accessToken ? (
          <div>
          <StravaProgress accessToken={accessToken} />
          <StravaEvents />
          <StravaRoutes />
          </div>
          ) : (
          <a href={window.location.href}>Connect to Strava</a>
          )}
          </div>
          )}
          </StravaConnect>
          </div>
          );
          }

export default Runner;
