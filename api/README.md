## Project Introduction

**Food app API server** is currently created using Node.js on the top of Express framework and TypeScript. For database, we've decided to go with MongoDB and and Mongoose as an ODM.

The project serves as an API server for both users `/api/**` and admins `/api/admin/**` as well as a static host server for the admin web app at base url `/`.

> Before running the server in production mode using `npm run start` make sure to build the `/admin-app` project.

## Folder structure

```
|-- migrations        # Database migration dir
|-- tests             # All unit and integration test files goes here
|-- build             # Admin side web application build files
|-- dist              # Server side build files
|-- src
    |   app.js        # Load application modules
    |   index.js      # App entry point
    |-- config        # Environment variables and configuration related stuff
    |-- constants     # App constants
    |-- startup       # Split the startup process into modules
    |-- types         # TypeScript types
    |-- admin         # Admin side API related files
    |-- client        # User side API related files
    |-- shared        # Shared interfaces, modiles, services , utils etc between admin and client project

```

### Environment variables

In the root project folder, copy the `.env.docker` and save as `.env`. Update the variables.

### Install dependencies

Inside the current `/api` directory.

```bash
$ npm install
```

### Populate database collections with sample documents

```
$ npm run seed:import
```

### Start the application in development mode

```
$ npm run dev
```

### Run tests

```bash
# run test
$ npm run test

# run test in watch mode
$ npm run test:watch
```

### Run debugger

```bash
$ npm run debug
```

### Clear all database documents

```bash
$ npm run seed:delete
```

## Configuration

To add custom configuration, go to config folder and update your configuration

```
|-- src
    |-- config
      | ci.ts       # test environment configurations
      | dev.ts      # development environment configurations
      | index.ts    # entry point file for configurations
      | keys.ts     # separates configurations based on project environment
      | prod.ts     # production environment configurations
```
