# InfantCareCompass
📜 Read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Overview

**InfantCareCompass** is a comprehensive web application designed to assist new and busy parents in managing their child's healthcare needs. The platform offers features such as vaccination tracking, childcare education, and more, empowering parents with a digital toolkit for effective child healthcare management. 

## Features

- **Vaccination Tracking**: Keep track of your child's vaccination schedule and receive timely reminders.
- **Childcare Education**: Access a wealth of resources and articles to help you navigate the challenges of parenting.
- **User-Friendly Interface**: Intuitive design ensures ease of use for all users.

## Technologies Used

- **Frontend**: React.js with Vite for fast and efficient development.
- **Styling**: TailwindCSS for responsive and modern UI design.
- **Backend**: Node.js and Express.js for handling API requests.
- **Database**: MongoDB for secure and scalable data storage.
- **Image Management**: Cloudinary for storing and retrieving user-uploaded images.

## 🚀 Future Goals

We are actively working to enhance the Infant Care Compass platform with features that go beyond basic healthcare tracking. Here's what’s coming next:

- **🎨 UI/UX Enhancements:** Improve responsiveness and visual design across devices to ensure a smoother user experience for both tech-savvy and non-tech-savvy parents.
  
- **📹 Integrated Video Conferencing:** Enable secure, real-time video consultations with pediatricians using ZegoCloud or WebRTC integration.

- **🤖 AI-Based First Aid Guidance:** Use OpenAI’s API or LangChain to provide parents with instant, AI-powered suggestions for minor health concerns and everyday parenting questions.

- **📅 Smart Vaccination Notifications:** Enhance the vaccination tracker with personalized reminders based on a child’s age, location, and medical history.

- **📰 Parenting Resource Center:** Add a content hub featuring doctor-written articles, trusted parenting tips, and a community Q&A space.

- **🌐 Multi-language Support:** Make the platform more inclusive by supporting major Indian regional languages for broader accessibility.

- **🔐 Role-Based Access & Security:** Strengthen access control for doctors, parents, and admins to ensure data privacy and secure consultation flow.

- **📈 Analytics Dashboard:** Build a dashboard to track vaccination compliance, user engagement, and doctor consultation trends.

## Getting Started
<details>
    <summary><b> Getting Started  </b></summary><br>
### Prerequisites

- Node.js installed on your machine.
- MongoDB instance running locally or a cloud MongoDB URI.
- Cloudinary account for image management.

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

3. **Set up environment variables:**
Create a .env file in the root directory and add the following:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4. **Run the application:**
   ```bash
   # Start the backend server
   npm start

   # In a separate terminal, navigate to the client directory and start the frontend
   cd client
   npm run dev


5. **Project Structure:**

   ```bash
   InfantCareCompass/
   ├── client/                 # React frontend
   │   ├── public/             # Public assets
   │   └── src/                # Source files
   │       ├── components/     # Reusable components
   │       ├── pages/          # Page components
   │       ├── App.jsx         # Main App component
   │       └── index.css       # TailwindCSS configuration
   ├── server/                 # Node.js backend
   │   ├── models/             # Mongoose models
   │   ├── routes/             # API routes
   │   ├── controllers/        # Route handlers
   │   └── index.js            # Entry point for the server
   ├── .env                    # Environment variables
   ├── package.json            # NPM package configuration
   └── README.md               # Project documentation
</details>

---

### License

This project is licensed under the [MIT License](LICENSE).  
You’re free to use, modify, and share this software under the license terms.

### Contributing

We welcome contributions to enhance the functionality and features of InfantCareCompass.

To contribute:
Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit them: git commit -m 'Add new feature'.
Push to the branch: git push origin feature/your-feature-name.
Submit a pull request detailing your changes.

# Screenshot 

<details>	
 <summary><b> View </b></summary><br>
<div style='display:flex; align-items:center; gap: 10px;' align='center'>
<img width="1920" height="5177" alt="screencapture-infantcarecompass-live-2025-07-20-10_41_19-min" src="https://github.com/user-attachments/assets/edecafaf-4f96-4969-835d-ca81720253e7" />



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
