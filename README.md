# MindLink - Full-Stack Quiz Platform

MindLink is a complete, full-stack web application built with ASP.NET Core and React. It allows users to create, share, and take quizzes on various topics, featuring a secure authentication system, categorized browsing, quiz management, and a real-time quiz-taking experience.

![MindLink Demo GIF](https://your-image-url-here.com/demo.gif) 

## ✨ Core Features

-   **Secure User Authentication**:
    -   User registration with server-side validation.
    -   Email verification using a one-time password (OTP) sent via SMTP.
    -   Secure login with password hashing (`PasswordHasher`).
    -   Session management using JWTs stored in secure, `HttpOnly` cookies.
-   **Comprehensive Quiz Management**:
    -   An intuitive interface to create custom quizzes with titles, categories, and multiple-choice questions.
    -   Ability to set quizzes as 'Public' (discoverable) or 'Private'.
    -   Private quizzes are accessible only via a unique, randomly generated 6-character code.
-   **Interactive Quiz Experience**:
    -   Engaging UI for taking quizzes with a live timer and a progress bar.
    -   Easy navigation between questions (Next/Previous).
    -   Instant feedback with score and time-taken displayed upon completion.
-   **Categorized Browsing & Search**:
    -   Browse public quizzes from a wide range of predefined categories (e.g., Technology, Science, History).
    -   Search for specific quizzes within a category by title.
-   **Personalized User Dashboards**:
    -   **Your Created Quizzes**: A dedicated page to view, manage, and see the results for all quizzes you have created.
    -   **Quizzes You Took**: A history of quizzes you've attempted, showing your best score for each.
-   **RESTful API**: A well-structured and secure backend API to handle all application logic.

## 💻 Tech Stack

This project is built with a modern, robust, and scalable tech stack.

### Backend

-   **Framework**: **ASP.NET Core 8**
-   **Database**: **PostgreSQL**
-   **ORM**: **Entity Framework Core**
-   **Authentication**: **JWTs** (JSON Web Tokens) stored in `HttpOnly` cookies.
-   **Email Service**: **MailKit** for sending OTP emails via SMTP.
-   **Architecture**: RESTful API with a Service-Repository pattern.
-   **API Documentation**: **Swagger / OpenAPI** for development.

### Frontend

-   **Framework**: **React.js**
-   **UI Library**: **React Bootstrap** & **Bootstrap 5**
-   **Routing**: **React Router DOM**
-   **State Management**: **React Context API** for global state (Auth, Quiz, Category).
-   **Icons**: **Bootstrap Icons**
-   **HTTP Client**: A custom service built on the native `fetch` API.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
-   [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (or newer)
-   [Node.js & npm](https://nodejs.org/en/)
-   [PostgreSQL](https://www.postgresql.org/download/)
-   [dotnet-ef tool](https://docs.microsoft.com/en-us/ef/core/cli/dotnet) (`dotnet tool install --global dotnet-ef`)

### Backend Setup

1.  **Clone the Repository**
    ```sh
    git clone https:https://github.com/Adam556678/MindLink.git
    cd MindLink
    ```

2.  **Configure Backend Settings**
    Open `appsettings.json` in the backend project and update the following sections:
    -   **`ConnectionStrings`**: Set your PostgreSQL connection string.
        ```json
        "DefaultConnection" : "Host=localhost;Port=5432;Database=MindLink;Username=your_user;Password=your_password"
        ```
    -   **`AppSettings`**: It's highly recommended to change the `Token` secret for security.
    -   **`EmailSettings`**: Enter your Gmail address and an [App Password](https://support.google.com/accounts/answer/185833) for the email service to work.
        ```json
        "EmailSettings": {
          "FromEmail": "your-email@gmail.com",
          "AppPassword": "your-generated-app-password",
          "SMTPHost": "smtp.gmail.com",
          "SMTPPort": 587
        }
        ```

3.  **Apply Database Migrations**
    Navigate to the backend project directory in your terminal and run the following command to create the database schema.
    ```sh
    dotnet ef database update
    ```

4.  **Run the Backend Server**
    ```sh
    dotnet run
    ```
    The API will now be running, typically on `https://localhost:5116`.

### Frontend Setup

1.  **Navigate to the Frontend Directory**
    In a new terminal, navigate to your frontend project folder (e.g., `client-app`).
    ```sh
    cd mindlink-client
    ```

2.  **Install NPM Packages**
    ```sh
    npm install
    ```

3.  **Run the React App**
    The frontend is configured with a proxy to communicate with the ASP.NET Core backend.
    ```sh
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

## 📁 Project Structure

<details>
<summary><strong>Backend Structure</strong></summary>

```
/
├── Controllers/    # API endpoints (Auth, Quiz, Category, Result)
├── Data/           # DbContext for Entity Framework
├── Entities/       # Database models (User, Quiz, Question, etc.)
├── Enums/          # Enumerations for results (LoginResult, OTPResult)
├── Mappers/        # Extension methods to map Entities to DTOs
├── Migrations/     # EF Core database migrations
├── Models/         # Data Transfer Objects (DTOs) for API requests/responses
├── Services/       # Business logic (AuthService, UserService)
└── Program.cs      # Main application entry point and service configuration
```
</details>

<details>
<summary><strong>Frontend Structure</strong></summary>

```
/src
├── api/            # API call service
├── components/     # Reusable React components (NavBar, QuizCard, etc.)
├── constants/      # Application constants (e.g., quiz categories)
├── context/        # React Context providers (AuthContext, QuizContext)
├── pages/          # Top-level page components (Home, Login, Quiz)
├── utils/          # Helper functions (validation, formatting)
├── App.js          # Main component with routing
└── index.js        # Application entry point
```
</details>

## 🔐 API Endpoints

A summary of the main API endpoints available. All routes are prefixed with `/api`.

| Method | Endpoint                    | Description                                         | Auth Required |
| :----- | :-------------------------- | :-------------------------------------------------- | :------------ |
| **Auth** |
| `POST` | `/Auth/register`            | Registers a new user and sends a verification OTP.  | No            |
| `POST` | `/Auth/login`               | Authenticates a user and returns a JWT cookie.      | No            |
| `POST` | `/Auth/verify`              | Verifies a user's email with an OTP code.           | No            |
| `GET`  | `/Auth/me`                  | Returns the current authenticated user's data.      | Yes           |
| `POST` | `/Auth/logout`              | Logs out the user by clearing the JWT cookie.       | No            |
| **Quiz** |
| `POST` | `/Quiz`                     | Creates a new quiz.                                 | Yes           |
| `GET`  | `/Quiz`                     | Gets all quizzes created by the current user.       | Yes           |
| `GET`  | `/Quiz/{id}`                | Gets a specific quiz by its ID.                     | Yes           |
| `GET`  | `/Quiz/{id}/results`        | Gets all results for a quiz created by the user.    | Yes           |
| `GET`  | `/Quiz/find/{code}`         | Finds a quiz ID by its unique shareable code.       | Yes           |
| **Category** |
| `GET`  | `/Category`                 | Gets all available quiz categories.                 | Yes           |
| `GET`  | `/Category/{id}`            | Gets a specific category by its ID.                 | Yes           |
| `GET`  | `/Category/{id}/quizzes`    | Gets all public quizzes within a specific category. | Yes           |
| **Result** |
| `POST` | `/Result`                   | Submits the result of a quiz attempt.               | Yes           |
| `GET`  | `/Result`                   | Gets the highest-scoring results for the user.      | Yes           |
| `GET`  | `/Result/{id}`              | Gets a specific result by its ID (owner only).      | Yes           |


## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
