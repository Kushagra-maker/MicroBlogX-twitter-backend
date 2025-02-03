# Twitter App Backend

## Overview

Welcome to the Twitter App Backend, a social media backend built using Node.js and MongoDB. This backend mimics core functionalities of Twitter, enabling users to interact with posts (tweets), comment, like, and upload media. The backend leverages JSON Web Tokens (JWT) for authentication and integrates with Amazon S3 for image uploads, ensuring secure and efficient handling of media.

The app supports core features such as:

- User authentication (sign-up, login)
- Tweet creation, retrieval, and pagination
- Liking and commenting on tweets
- Liking and commenting on comments (threaded comments)
- Support for image uploads for tweets
- Robust folder structure for better code organization

## Features

- **Tweet Creation**: Users can create posts (tweets) with a maximum of 250 characters.
- **Image Upload**: Each tweet supports image uploads, stored on Amazon S3.
- **User Interaction**: Authenticated users can comment on tweets and like tweets and comments.
- **Threaded Comments**: Comments can have replies, allowing users to engage in threaded conversations.
- **Pagination**: Tweets are fetched with pagination, improving the performance for large datasets.
- **User Authentication**: Secure authentication using JWT for protected routes.
- **Hashtags**: Supports hashtags within tweets. Hashtags are stored and associated with tweets.
- **AWS S3 Integration**: Tweets support media uploads, and images are stored on AWS S3, ensuring scalability and reliable file management.

## Folder Structure

The project follows a well-organized folder structure to separate concerns and improve maintainability:

```
.
└── src/
  ├── config/                 # Configuration files (e.g., database, AWS S3)
  │   ├── database.js         # MongoDB connection
  │   ├── file-upload-s3-config.js  # AWS S3 configuration
  ├── controllers/            # Route handlers for various actions
  │   ├── auth-controller/    # Handles user sign-up and login
  │   ├── comment-controller/ # Handles comment creation
  │   ├── like-controller/    # Handles liking and unliking tweets/comments
  │   └── tweet-controller/   # Handles tweet creation and retrieval
  ├── middlewares/            # Custom middlewares (e.g., authentication, error handling)
  │   └── jwt-middleware.js   # JWT authentication middleware
  ├── models/                 # Mongoose models (Tweet, User, Like, Comment, Hashtag)
  ├── repository/             # Database operations (e.g., CRUD, repository pattern)
  ├── routes/                 # API routes (v1 and other versions)
  ├── services/               # Business logic (services for tweets, likes, users, etc.)
  ├── utils/                  # Utility functions (e.g., error codes)
  └── index.js                # Entry point of the application


```

## Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node package manager)
- MongoDB (local or remote instance)
- Git (optional for cloning the repo)

## Setup & Installation

1.  Clone the repository:

    Clone the repository to your local machine:

    `git clone https://github.com/Kushagra-maker/twitter-backend.git`

    Alternatively, you can download the project as a ZIP archive and extract it to a folder.

2.  Install the dependencies:

    Navigate to the project directory and install all the necessary dependencies:

    ```cd twitter-backend-api
    npm install
    ```

3.  Configure environment variables:

    Create a `.env` file in the project root directory and set the following environment variables:

    ```PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    AWS_REGION=<your-aws-region>
    AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
    ACCESS_KEY_ID=<your-aws-access-key-id>
    BUCKET_NAME=<your-aws-bucket-name>
    ```

4.  Start the server:

    After setting up your environment variables, start the server using the following command:

    `npm start`

    This will launch the backend server on http://localhost:3000.

5.  Access the application:

    Once the server is running, you can access the API through http://localhost:3000. Use tools like Postman or Insomnia to interact with the API endpoints.

    That's it! You can now start exploring the application locally on your system.

## API Endpoints

Below is a brief overview of the API endpoints available:

- `POST /api/signup`: Create a new user (sign-up).
- `POST /api/login`: Login an existing user and get a JWT token.
- `GET /api/tweets`: Get a paginated list of tweets.
- `POST /api/tweets`: Create a new tweet (with optional image upload).
- `POST /api/tweets/:id/comments`: Add a comment to a tweet.
- `POST /api/comments/:id/reply`: Reply to a comment.
- `POST /api/tweets/:id/like`: Like a tweet.
- `POST /api/comments/:id/like`: Like a comment.

For more detailed documentation on the API, please refer to the API Documentation (if available).

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data, tweets, comments, etc.
- **Mongoose**: MongoDB object modeling tool.
- **JWT**: Authentication mechanism using JSON Web Tokens.
- **AWS S3**: Cloud storage service for uploading and storing tweet images.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: Module for managing environment variables.

## Contributing

Contributions are welcome! If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push the branch.
4. Open a pull request explaining your changes.

Please ensure that you follow proper coding standards and write tests for any new features or bug fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to the project maintainer:

- **Kushagra**
- [LinkedIn](https://www.linkedin.com/in/kushagraanand12/)
- Email: kushagranand12345@gmail.com
