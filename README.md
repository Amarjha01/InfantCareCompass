<p align="center">
  <a href="CODE_OF_CONDUCT.md">
    <img src="https://img.shields.io/badge/📜-Code%20of%20Conduct-FF69B4?style=for-the-badge&logo=github" alt="Code of Conduct"/>
  </a>
</p>


<div align="center">
  <img src="client/public/logo.png" alt="InfantCareCompass Logo" width="150"/>
  
  <p align="center" style="font-style: italic; color: #FF69B4; font-size: 18px; margin-top: -10px;">
  "Guiding little steps, one health check at a time"
</p>

---------
  
  <div style="margin: 15px 0;">
    <img src="https://readme-typing-svg.herokuapp.com?size=35&color=FF69B4&width=800&lines=Welcome+to+InfantCareCompass+Grounds;Your+AI+Powered+Health+Companion;Monitors+and+Safeguarding+Future+steps;Smart+Insights+for+Parents+and+Monitoring" />
  </div>
  
  <div style="margin: 15px 0;">
    <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" height="10"/>
  </div>

</div>

## Overview  

**InfantCareCompass** isn’t just an app - it’s your **digital parenting partner**.  
Designed especially for **new and busy parents**, it makes managing your child’s healthcare effortless & stress-free.  

From **tracking vaccinations** to **learning childcare essentials**,  
we bring you a **one-stop compass** that points towards **better, smarter parenting**.  

---

### What Makes Us Special?

**Vaccination Tracking**   ---> Get timely reminders so you never miss a dose.  
**Childcare Education**    ---> Learn from trusted resources & expert-backed guides.  
**User-Friendly Design**   ---> A clean, modern UI that’s simple enough for everyone.  
**Future-Ready Vision**    ---> AI guidance, video consults, multilingual support & more!  

---

<p align="center">
  <img src="https://img.shields.io/badge/Parenting-Simplified-ff7e5f?style=for-the-badge&logo=heart&logoColor=white" />
  <img src="https://img.shields.io/badge/Healthcare-Digitalized-8e44ad?style=for-the-badge&logo=medapps&logoColor=white" />
  <img src="https://img.shields.io/badge/Built_with-Love-ff6ec7?style=for-the-badge&logo=github-sponsors&logoColor=white" />
</p>

## 🛠️ Technologies Used  

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWNnZzhhZjlscWxzZWl1YzVmZHZ4ZzQ4Mm9yazE2d3ljNHUyN3UzaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JIX9t2j0ZTN9S/giphy.gif" width="180" alt="Coding Cat"/>
</p>

<div align="center">

|  Tech | Purpose |
|---------|------------|
| **React.js + Vite** | Lightning-fast frontend development |
| **TailwindCSS** | Sleek, modern, and responsive styling |
| **Node.js + Express** | Powering backend APIs with ease |
| **MongoDB** | Secure, scalable database for user data |
| **Cloudinary** | Smart image storage & management |

</div>

---

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Node.js-3C873A?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Images-Cloudinary-F38020?style=for-the-badge&logo=cloudinary&logoColor=white" />
</p>

## Future Goals

<div align="center">

| Goal | Description |
|---------|----------------|
| **UI/UX Enhancements** | Smooth, responsive design for all devices and users |
| **Integrated Video Conferencing** | Real-time consultations with pediatricians via ZegoCloud/WebRTC |
| **AI-Based First Aid Guidance** | Instant AI suggestions for minor health issues & parenting tips |
| **Smart Vaccination Notifications** | Personalized reminders based on age, location & history |
| **Parenting Resource Center** | Doctor-written articles, tips & community Q&A hub |
| **Multi-language Support** | Regional Indian languages for wider accessibility |
| **Role-Based Access & Security** | Data privacy for doctors, parents & admins |
| **Analytics Dashboard** | Track vaccination, user engagement & consultations |

</div>

<p align="center">
  <img src="https://img.shields.io/badge/Coming-Soon-FF69B4?style=for-the-badge&logo=future&logoColor=white" />
  <img src="https://img.shields.io/badge/Innovation-AI-blueviolet?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Health-Tech-green?style=for-the-badge&logo=healthicons&logoColor=white" />
</p>

##  Getting Started

<details>
  <summary><b> Click to Expand Instructions</b></summary>
  <br>

### 🛠 Prerequisites

Before you begin, ensure you have the following installed and set up:

- **Node.js** – Install the latest stable version from [Node.js Official Website](https://nodejs.org/)
- **MongoDB** – Either a local instance or a cloud MongoDB URI via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** – For image storage & management, sign up at [Cloudinary](https://cloudinary.com/)

<p align="center">
  <img src="https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif" width="200" alt="Getting Started GIF"/>
</p>

### Installation
1. **Clone the repository:**

   ```bash
   git clone https://github.com/Amarjha01/InfantCareCompass.git
   cd InfantCareCompass

2. **Install dependencies:**

   ```bash
   # Install server dependencies
   npm install

   # Navigate to the client directory and install dependencies
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
    PORT=5000
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
  InfantCareCompass/
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
</details>

### 🤝 Contributing

Contributions are what make the **open-source community** such an amazing place to **learn, inspire, and create**.  

We **love** receiving contributions of all kinds - whether it's fixing bugs, adding new features, improving documentation, or just giving feedback!  

#### How You Can Contribute

1. **Star the repo** to show your support.  
2. **Report bugs** by opening an issue.  
3. **Add features** by submitting pull requests.  
4. **Improve docs** to help other developers.  
5. **Share feedback** to make the project even better.  

> Before contributing, please make sure to **read the [Code of Conduct](./CODE_OF_CONDUCT.md)** and **[Contribution Guidelines](./CONTRIBUTING.md)** for a smooth collaboration experience.

---

### License

This project is licensed under the [MIT License](LICENSE).  
You’re free to use, modify, and share this software under the license terms.


# Screenshot 

<details>	
 <summary><b> View </b></summary><br>
<div style='display:flex; align-items:center; gap: 10px;' align='center'>
<img width="1920" height="5177" alt="InfantCareCompass application screenshot showing the main interface and features" src="https://github.com/user-attachments/assets/edecafaf-4f96-4969-835d-ca81720253e7" />



 </div>
</details>

# Contributors

<h3 align="center">🙏 Thanks to These Amazing People for Helping Build <strong>InfantCareCompass</strong>!</h3>

<p align="center">
  <!-- Vaunt.dev (auto-updating SVG contributors graph) -->
  <a href="https://github.com/Amarjha01/InfantCareCompass/graphs/contributors">
    <img 
      src="https://api.vaunt.dev/v1/github/entities/Amarjha01/repositories/InfantCareCompass/contributors?format=svg&limit=54"  
      width="700" 
      height="250" 
      alt="Contributors Graph by Vaunt.dev" 
    />
  </a>
</p>

<p align="center">
  <!-- Contrib.rocks (profile avatars grid) -->
  <a href="https://github.com/Amarjha01/InfantCareCompass/graphs/contributors">
    <img 
      src="https://contrib.rocks/image?repo=Amarjha01/InfantCareCompass&max=300" 
      alt="GitHub Contributors Avatars" 
    />
  </a>
</p>

<h3 align="center">🔄 Auto-Updating with New Contributors!</h3>

---

<p align="center">
  Crafted with 💖 and lots of baby love by <b>Amarjha</b> and the <b>InfantCareCompass Crew</b>
</p>

