# 🎯 Mockmate – AI-Powered Interview Preparation

**Mockmate** is a smart web application that helps job seekers prepare for interviews by simulating real-world scenarios using AI.  
Enter your target job role and receive **10 personalized interview questions** along with **AI-generated feedback** on your responses.  
It’s like having a personal AI interview coach! 🚀

---

## ✨ Features

🎤 **Role-Based Interview Simulation** – Get 10 dynamic questions tailored to your desired job role  
🧠 **AI Feedback Engine** – Post-interview strengths/weaknesses analysis with suggestions  
📊 **Actionable Insights** – Understand how to improve your communication and technical responses  
⚡ **Fast & Responsive UI** – Built with React & Tailwind CSS  
🛠️ **Scalable Backend** – Node.js & Express-powered REST API  
🤖 **Gemini Flash 2.5 Integration** – Leverages Google’s latest AI model to generate questions and feedback

---

## 🛠️ Tech Stack

| Layer       | Technology                        |
|------------|------------------------------------|
| Frontend   | React, Tailwind CSS                |
| Backend    | Node.js, Express                   |
| AI Model   | Google Gemini Flash 2.5            |
| API Type   | RESTful APIs                       |
| Deployment | (Add platform: e.g. Vercel/Render) |

---

## 📂 Project Structure

Mockmate/
│── client/ # React + Tailwind frontend
│── server/ # Node.js + Express backend
│── .env # API keys and config (not committed)
│── README.md # Project documentation

yaml
Copy code

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahil-2005/Mockmate.git
cd Mockmate
2️⃣ Install Dependencies
Frontend:

bash
Copy code
cd client
npm install
Backend:

bash
Copy code
cd ../server
npm install
3️⃣ Set Up Environment Variables
In the server/ folder, create a .env file:

ini
Copy code
GEMINI_API_KEY=your_google_gemini_flash_api_key
PORT=3001
4️⃣ Run the Application
Start the backend:

bash
Copy code
cd server
npm run dev
Start the frontend:

bash
Copy code
cd ../client
npm start
Visit the app at 👉 http://localhost:3000

🧪 How It Works
User enters a job role in the UI.

The frontend sends the role to the Node.js backend.

The backend calls the Gemini Flash 2.5 API, which:

Generates 10 role-specific interview questions

Provides feedback on user responses (strengths, weaknesses, and suggestions)

The results are returned to the frontend and displayed elegantly.

📈 Roadmap
 Voice-based answers & feedback

 Scoring system per question

 Question difficulty levels

 Save and track interview history

 Multi-role interview simulation

🤝 Contributing
Contributions are welcome! 🎉

Fork the repo

Create a feature branch:

bash
Copy code
git checkout -b feature-name
Commit your changes:

bash
Copy code
git commit -m "Add feature"
Push to your branch:

bash
Copy code
git push origin feature-name
Open a Pull Request 🚀

👨‍💻 Author
🌐 Portfolio: sahil-gawade.netlify.app
💼 LinkedIn: linkedin.com/in/sahil-gawade-920a0a242
📌 GitHub: Sahil-2005

📜 License
This project is licensed under the MIT License – feel free to use and modify it for your own projects.

⭐ Support
If you found this project helpful, don’t forget to star ⭐ the repository and share it with others!
Your support helps improve the tool for everyone. 🚀