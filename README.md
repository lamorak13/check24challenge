# CHECK24 GenDev Challenge
This is my solution for the Check24 GenDev Coding Challenge 2024 🥳.  

## Description
A simple application that allows its users to bet on the outcome of the games of the European Championship 2024 ⚽.
Users are awarded points based on how correct their bets are. There is also the possiblity to create & join communities, where all the participants are ranked based on their points total and other metrics 🚀.

## UI Demo
To demonstrate the user interface and all included featuers I recorded a short video of a local installation.
Since part of the focus of the project was on performance, I loaded 2 million users and bets in the databse to showcase the application's performance in a more realistic scenario.
Cick here to look at the video

## Implementation
### Frontend 🎨
The frontend is built with TypeScript using Solidjs, an upcoming frameworking with a focus on performance. <br>

Unlike React or Vue, Solid works with a compiler instead of diffing using a virtual DOM. The code gets compiled into vanilla JavaScript, which makes it possible to precisely update only those elements that change and allows a more finegrained and explicit approach to reactivity. Additionally, I used TailwindCSS for easier styling.

Notable features include the following: 
- Generic Table Component
- Custom Model Component
- Perpetual Generic Carousel Component
- A notification system that listens to server messages via a socket and displays them using Toasts
- A mechanism to subscribe to server messages and automatically refetch APIs whenever appropriate

Note: All components are built from scratch, i.e. no component libraries were used during development.

---

### Backend 💼
At its core, the backend is a node expressjs, REST-based server which handles all API requests from the client.<br>
I used Prisma as ORM to communicate with the database. Among other benefits, prisma offers type safty and a convenient interface to define and update data models.

The server also manages a websocket, which makes it possible to notify all active clients whenever an important update was made (e.g. a new game started).

The app contains a feature to display the delta of each user, which is defined as the point gain during one day (from 00:00 to 23:59). To implement that feature the node server also registers a cron job which updates all deltas each day at 00:00 by sending a corresponding query to the database. 

---

### Database 💾
For managing data and relations, I used a standard Postgres database. <br>
Besides tables for games, users and communities, the database also stores a materialized view for each community ranking. This dramastically improves response time of the application and ensures that the user points only have to be calculated once. Whenever a game finishes, the underlying "User" table is udpated with the new points per user. After that, a custom function is called that refreshes all materialized views and notifies all clients afterwards.


## Setup 
### Prerequisits
- local docker installation
- node

### Run the project
To run the application, you need to do the following: 
- run `docker-compose up` in the root directoy to start the postgres database and pgAdmin (an open source program to manage postgres isntances).
- run `npm i` and `npm start` in backend to start the server. You should see "Server is running on http://localhost:5000" in the console
- run `npm i` and `npm start` in frontend to start the SPA

### Automtatic setup scripts
In the backend folder, there are 2 setup scripts: 
- `setup.ts`
- `test_setup.ts`

Both automatically store all games as well as the global standings community in the database. 
`test_setup.ts` also loads 2 million auto-generated users with corresponding bets into the databse. This script takes a LONG time to run, so use it at your own discretion.
To use them, uncomment one of the following two lines in `index.ts`: 

```
app.listen(port, async () => {
  /* await setup(); */
  /* await test_setup(); */
  cron.schedule("0 0 * * *", async () => await resetDelta());
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Admin actions
There are 3 endpoints that can be used to simulate real game events: 

- `curl -X PUT http://localhost:5000/games/:gameId/start` -> starts a game
- `curl -X PUT http://localhost:5000/games/:gameId/home/score` (or away/score) -> scores a goal for the corresponding team
- `curl -X PUT http://localhost:5000/games/:gameId/finish` -> ends the game

## Improvements/future features
As with all applications, there is always room for improvement. 
Here is a non-exhaustive list of possible improvements or features to consider: 

- Frontend
  + Add better feedback for user actions (sign in, placing bets, etc.)
  + Add an onboarding that explains how the user can navigate the application
  + Expand the server notification system

- Backend
  +  Better parameter sanitization/validation with something like express-validator
  +  Improve error messages and logging for easier debugging
  + Reduce the risk of SQL-injection attacks by using a different templating library for querying the database

- Database
  + Postgres doesn't support partial refreshs on materialized views. Therefore, joining large communities can take a long time. Materialized views are also read-only, which means that there is no way to quickly add users to a community without triggering a refresh
  + Take measures to allow for millions of users to access the app at the same time without performance loss

## Final Remarks
I had a lot of fun developing this project. As I wanted to take this as a learning opportunity, I only used technologies that I was not familiar with (the only exception being TailwindCss). <br>
I never worked with Solid, Prisma or Postgres prior to this project and I really appretiate how much I was able to learn about that Tech Stack in such a short time. I hope you like my solution to the GenDev Coding Challenge and I would be honored if you consider me for a personal interview 😊
