
<div align="center">
  <h1>InfantCareCompass</h1>
  <p><strong>A digital toolkit for modern parents to manage their child's healthcare with confidence and ease.</strong></p>
  <p>
    <a href="https://infantcarecompass.live/"><strong>Live Demo »</strong></a>
    ·
    <a href="https://github.com/Amarjha01/InfantCareCompass/issues">Report Bug</a>
    ·
    <a href="https://github.com/Amarjha01/InfantCareCompass/issues">Request Feature</a>
  </p>

  <p>
    <img src="https://img.shields.io/github/stars/Amarjha01/InfantCareCompass?style=for-the-badge" alt="GitHub Stars"/>
    <img src="https://img.shields.io/github/forks/Amarjha01/InfantCareCompass?style=for-the-badge" alt="GitHub Forks"/>
    <img src="https://img.shields.io/github/license/Amarjha01/InfantCareCompass?style=for-the-badge" alt="License"/>
    <img src="https://img.shields.io/github/contributors/Amarjha01/InfantCareCompass?style=for-the-badge" alt="Contributors"/>
  </p>
</div>

## ✨ Overview

**InfantCareCompass** is a comprehensive web application designed to assist new and busy parents in managing their child's healthcare needs. The platform offers features such as vaccination tracking, childcare education, and direct consultations, empowering parents with a digital toolkit for effective child healthcare management.

---

## 🚀 Key Features

* **📅 Vaccination Tracking**: Never miss a shot! Keep track of your child's vaccination schedule with personalized timelines and receive timely reminders.
* **📚 Childcare Education**: Access a wealth of expert-written articles, guides, and resources to navigate the challenges of parenting with confidence.
* **🧑‍⚕️ Professional Consultations**: Connect with pediatricians and healthcare experts for advice and consultations (coming soon).
* **📱 User-Friendly Interface**: An intuitive design ensures a seamless and stress-free experience for all users, regardless of technical skill.

---

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite for fast and efficient development.
- **Styling**: TailwindCSS for responsive and modern UI design.
- **Backend**: Node.js and Express.js for handling API requests.
- **Database**: MongoDB for secure and scalable data storage.
- **Image Management**: Cloudinary for storing and retrieving user-uploaded images.

---

## 🎯 Future Roadmap

We are actively working to enhance the InfantCareCompass platform. Here’s what’s coming next:

* **🎨 UI/UX Enhancements:** Continuously improving responsiveness and visual design for a smoother user experience.
* **📹 Integrated Video Conferencing:** Enable secure, real-time video consultations with pediatricians using **ZegoCloud** or **WebRTC**.
* **🤖 AI-Based First Aid Guidance:** Implement an AI-powered assistant using **OpenAI’s API** or **LangChain** for instant suggestions on minor health concerns.
* **📰 Parenting Resource Center:** Build a content hub with doctor-written articles, parenting tips, and a community Q&A forum.
* **🌐 Multi-language Support:** Add support for major Indian regional languages to improve accessibility.
* **🔐 Role-Based Access Control:** Strengthen security with distinct roles and permissions for doctors, parents, and admins.
* **📈 Analytics Dashboard:** Create a dashboard to track vaccination compliance, user engagement, and consultation trends.

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v18.x or higher)
* **MongoDB** instance (local or a cloud URI from MongoDB Atlas)
* **Cloudinary** account for image management.

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    # Replace <your-github-username> with your actual username
     git clone https://github.com/<your-github-username>/InfantCareCompass.git
     cd InfantCareCompass
    ```

2.  **Install Server Dependencies**
    ```bash
    # From the root directory
    npm install
    ```

3.  **Install Client Dependencies**
    ```bash
    # Navigate to the client directory
    cd client
    npm install
    ```

4.  **Set Up Environment Variables**
    Go back to the root directory, create a `.env` file, and add the following keys.
    ```bash
    # Navigate back to the root directory if you are in /client
    cd ..
    touch .env
    ```
    Your `.env` file should look like this:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_uri
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

5.  **Run the Application**
    You'll need two separate terminal windows for this step.

    * **Terminal 1: Start the Backend Server** (from the root directory)
        ```bash
        npm start
        ```

    * **Terminal 2: Start the Frontend Development Server**
        ```bash
        # Navigate to the client directory
        cd client
        npm run dev
        ```

The application should now be running on your local machine!

### Project Structure


  ```bash
  INFANTCARECOMPASS/
  ├── .github/
  │   ├── ISSUE_TEMPLATE/
  │   └── workflows/
  │       └── FUNDING.yml
  ├── client/
  │   ├── public/
  │   │   └── logo.png
  │   ├── src/
  │   │   ├── api/
  │   │   ├── common/
  │   │   ├── components/
  │   │   ├── helpers/
  │   │   ├── pages/
  │   │   ├── routes/
  │   │   ├── store/
  │   │   ├── App.css
  │   │   ├── App.jsx
  │   │   ├── iceServers.js
  │   │   ├── index.css
  │   │   └── main.jsx
  │   ├── .env
  │   ├── .gitignore
  │   ├── eslint.config.js
  │   ├── index.html
  │   ├── package-lock.json
  │   ├── package.json
  │   ├── postcss.config.js
  │   ├── README.md
  │   ├── tailwind.config.js
  │   └── vite.config.js
  ├── server/
  │   ├── config/
  │   ├── controller/
  │   ├── middleware/
  │   ├── models/
  │   ├── routes/
  │   ├── utils/
  │   ├── .gitignore
  │   ├── index.js
  │   ├── package-lock.json
  │   └── package.json
  ├── .gitignore
  ├── LICENSE
  ├── package-lock.json
  ├── package.json
  ├── PULL_REQUEST_TEMPLATE.md
  └── README.md

  ```
### 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:
1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/YourAmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/YourAmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information. You’re free to use, modify, and share this software under the license terms.

---

## 📸 Screenshots

<details>
 <summary><b>Click to View Application Screenshots</b></summary>
 <br>
 <div align="center">
    <img src="https://github.com/user-attachments/assets/edecafaf-4f96-4969-835d-ca81720253e7" alt="Application Screenshot" />
 </div>
</details>

---

## 🙏 Our Amazing Contributors

<h3 align="center">Thanks to these wonderful people for helping build InfantCareCompass!</h3>

<p align="center">
  <a href="https://github.com/Amarjha01/InfantCareCompass/graphs/contributors">
    <img src="https://api.vaunt.dev/v1/github/entities/Amarjha01/repositories/InfantCareCompass/contributors?format=svg&limit=54" width="700" height="250" alt="Contributors Graph by Vaunt.dev" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/Amarjha01/InfantCareCompass/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Amarjha01/InfantCareCompass&max=300" alt="GitHub Contributors Avatars" />
  </a>
</p>