# Money Book

Money Book is a web-based financial management tool designed for tracking expenses, managing budgets, and providing insights into personal finance. The project is built for macOS Sierra 10.12.6 or later, and supports Chrome 68 or higher. Other operating systems and browsers are yet to be tested.

![Demostrate Cover](./src/cover.png)

## Prerequisites

Before you start, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation

To install project dependencies, run the following command in your terminal. This step is only required once:

```bash
npm install
```

## Running the Project Locally

To start the development server and run the project locally, use the following command:

```bash
npm run dev
```

This will launch the development environment, allowing you to preview and work on the project on your local machine.

## Testing

To execute the test suite for the project, run:

```bash
npm test
```

This will run all the unit and integration tests to ensure the application is functioning as expected.

## Production Build and Deployment

To prepare the project for deployment, first create a production build:

```bash
npm build
```

Once the build process is complete, you can start the application using:

```bash
npm start
```

This command is typically used for testing in a production-like environment on a local machine or cloud server.

For deploying the application directly to the cloud, use the following command:

```bash
lean deploy
```

This will push the application to your cloud environment for public access.

## Supported Environments

- **macOS**: Tested on macOS Sierra 10.12.6 or later.
- **Browser**: Supported on Chrome 68 or higher.

Other operating systems and browsers have not yet been tested.
