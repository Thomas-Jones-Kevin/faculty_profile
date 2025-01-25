# Faculty Profile Management Portal

This repository contains the code for a portal designed and implemented for faculty profile management at SSN College of Engineering. The portal streamlines interactions and report generation, ultimately improving the efficiency of the department.

## Setup Instructions

To get started with the project, follow the steps below:

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) for database setup

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the server using `nodemon`:

    ```bash
    nodemon backend/server.js
    ```

    This will start the backend server on your local machine.

### Additional Notes

- Ensure that MongoDB is running on your system, or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting.
- The server is set to run on `http://localhost:5000` by default. You can change the port in the `server.js` file if needed.
