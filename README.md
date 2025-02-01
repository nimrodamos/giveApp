# GiveApp - Donation Platform

GiveApp is a digital platform developed as part of a 24-hour hackathon, allowing anyone to register, create donation projects, and contribute to other projects. The project is based on modern Full Stack development technologies.

## Technologies Used

### **Frontend**

- **React** with **TypeScript** - for building a dynamic and modular user interface.
- **Vite** - for improved performance during development.
- **Tailwind CSS** - for modern and efficient UI styling.
- **Shadcn/ui** - for convenient and customizable UI components.
- **React Query** - for efficient data management, including Background Prefetching and Caching.
- **Context API** - for managing user access state.
- **Axios** - for making API requests.

### **Backend**

- **Node.js** with **Express.js** - for creating a flexible and efficient REST API.
- **MongoDB** with **Mongoose** - for distributed and efficient data storage.
- **JWT (JSON Web Token)** - for user authentication management.
- **bcrypt** - for encrypting user passwords.
- **Custom Middleware** - for authentication and access control.

## Key Features

- **User Registration and Login** - secure user account creation and authentication.
- **Creating Donation Projects** - users can launch fundraising projects with descriptions, images, and financial goals.
- **Online Donations** - users can contribute to various projects and track progress.
- **User Management** - personal profiles with editable details.
- **Advanced Dynamic Interface** - fast and interactive user experience.

## Installation and Running

### **Frontend**

```bash
cd client
npm install
npm run dev
```

### **Backend**

```bash
cd server
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Additional Information

This project was developed as part of a 24-hour hackathon, focusing on providing a quick and accessible solution for online fundraising. Any user can join, create a project, and support others through direct donations.

