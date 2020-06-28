# Cinema App

The project is deployed on heroku: [https://lukkiasz-cinema.herokuapp.com](https://lukkiasz-cinema.herokuapp.com).

This is full-stack app, PWA, SPA.<br />
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
Used for front-end: react, react-router, redux.<br />
Used for back-end: express.js, mongoDB (mongoose) and database on MongoDB Atlas service.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs all dependencies needed to run the app.

### `yarn dev`

Runs the app in the development mode.<br />
It uses nodemon to start the app so after updates app will automatically reload.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
Server is running on [http://localhost:8000](http://localhost:8000). <br /> 
Server is needed to provide data from database.

#### Important for development mode:
```diff 
- in development mode the server uses local database.
- data for create database are not included in git repository - the author has them. To see how they work look at published version.
```

### `yarn start`

Runs the server. Useful only for production!!!<br />

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.