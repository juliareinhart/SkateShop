# 🛼 Skates-R-Us – AI-Powered Roller Skate Shop

A full-stack MERN e-commerce application where users can browse and shop for roller skates and wheels. Includes an AI chat assistant powered by OpenAI to recommend skates based on user questions like "What are good beginner skates in pink?"

---

## 🚀 Features

- 🔍 **Product search & filtering**
- 🛒 **Cart functionality with login required for checkout**
- 🧠 **AI Chat Assistant**: Uses OpenAI to answer product questions and recommend skates
- 🔐 **JWT-based user auth**
- 📦 **MongoDB product storage**
- 🎨 **Responsive UI with Bootstrap 5.3.3**

---

## 🛠 Tech Stack

- **Frontend**: React + Bootstrap
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **AI**: OpenAI API (gpt-3.5-turbo)

---

## 🧪 Demo

- 📹 [YouTube Demo](https://youtu.be/MbjVxq_bwhU)
- 🔗 [Live Site Coming Soon]

---

## ⚙️ Setup Instructions

> 💡 *Note: This is a developer-focused demo repo. It requires your own API keys to run locally.*

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/skates-r-us.git
cd skates-r-us
```

### 2. Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```


### 3. Create Environment Files

Create a .env file in the backend folder:

DATABASE=mongodb+srv://<your-mongo-uri>
JWT_KEY=yourSecretKey
OPENAI_API_KEY=yourOpenAIKey

Create a .env file in the frontend folder:

REACT_APP_API_BASE=http://localhost:9000


### 4. Run the App

Start the backend:

cd backend
npm start

Start the frontend:

cd ../frontend
npm start


### 5. 📂 Folder Structure

skates-r-us/
├── backend/
│   ├── routes/
│   ├── models/
│   └── .env
├── frontend/
│   ├── src/
│   └── .env
└── README.md

## 🙋 About Me

👩‍💻 Built with 💖 by **Julia Reinhart** –  
Math graduate, self-taught MERN developer, JavaFX and MySQL and passionate about creating accessible tools that are smart and beautiful.


🔗 [Connect with me on LinkedIn](https://www.linkedin.com/in/julia-reinhart-798aa6258/)


