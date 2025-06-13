# 🚀 Project Setup Guide

Welcome! This guide will walk you through setting up and running the project locally on your development machine.

---

## 🔧 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [.NET 6 SDK or later](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com/) or another code editor

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git init
git clone https://github.com/TamarDehan2005/ai-learning-platform.git
```

### 2️⃣ Install Frontend Dependencies

```bash
cd ai-learning-platform
cd client
npm install --legacy-peer-deps
```
Please note! This may take a little while.

---

## 🛠️ Technologies Used

| Layer       | Technology             | Description                                                                 |
|-------------|------------------------|-----------------------------------------------------------------------------|
| Backend     | C# / .NET 6            | Backend built using ASP.NET Core Web API with MVC pattern                  |
| Frontend    | React + Vite           | Modern JavaScript library (React) with fast bundler (Vite) for development |
| Styling     | CSS / MUI (optional)   | Basic styling with CSS, optionally using Material UI for components         |
| HTTP Client | Axios                  | Promise-based HTTP client used in the frontend to communicate with the API |
| Database    | LocalDB (SQL Server)   | Lightweight local SQL database used for development (can also use SQLite)  |
| ORM         | Entity Framework Core  | Object-relational mapper (ORM) for database access in the .NET backend     |

---

## 💡 Assumptions made during development

- **C#** was chosen as the server side:  
Because it is a high-level language that leads to correct and structured thinking in system development.  
It allows for professional-level maintenance, high security, and clean code management.

- **React** was chosen as the client side:  
Because it is a modern and flexible solution with advanced tools, a wide community,  
and great support for rapid development of user interfaces.

- **Use of a local database**:  
Since the system was built for educational purposes and not as a commercial product,  
there was no requirement for an external database.  
A local solution provides a perfect solution in such projects.

---

## ▶️ How to Run the Project Locally

### 🖥️ Frontend

```bash
npm start
```

The React app will open in your browser at:

```
http://localhost:3000
```

---

### 🔌 Backend

Open the solution file (`.sln`) located in the `server` directory using **Visual Studio**.

Once opened, click on **Run (F5)** to start the backend server.

The backend server will typically be available at:

```
http://localhost:5000
```

---

## ✅ Everything Is Ready!

You now have both the frontend and backend running locally.  
Feel free to customize, build, and experiment! 🎉

---

Made with ❤️ for learning and development.
