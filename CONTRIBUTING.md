# Contributing to InfantCareCompass

Thank you for your interest in contributing to InfantCareCompass! Your support helps us improve this project for caregivers everywhere. This guide will walk you through setting up the project, coding guidelines, and how to submit your changes smoothly.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- Git

### Setting Up the Project

1. **Fork the Repository**
   
   Start by forking the repo on GitHub to have your own copy. Then clone it locally:
   
    ```bash
   git clone https://github.com/YOUR_USERNAME/InfantCareCompass.git
   cd InfantCareCompass
   ```

3. **Install Dependencies**
   
   Install the necessary packages for both backend and frontend:
   
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory with the following variables:
   
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   TOKEN_SECRET_KEY=your_jwt_secret_key
   ```
   
>💡 Tip: Never share your .env file or secrets publicly.

---


## ✨ Making Changes

### Creating a Feature Branch
Always create a new branch for your work to keep changes organized:

```bash
git checkout -b feature/your-feature-name
```

### Development Workflow

1. **Start the Development Servers**
   ```bash
   # Terminal 1: Start the backend server
   npm start
   
   # Terminal 2: Start the frontend development server
   cd client
   npm run dev
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## 🧑‍💻 Code Style Guidelines

To maintain a clean and consistent codebase, please follow these best practices:

- ✅ **Use Meaningful Commit Messages**  
  Clearly describe what your commit does.  
  Example:  
  ```bash
  git commit -m "Fix: Resolve crash on login when credentials are empty"
  ```
- 🧹 **Follow Existing Code Formatting**
  
  Stick to the project's code style conventions. Use linters or formatters where applicable (e.g., Prettier, ESLint).

- 💬 **Comment Complex Logic**

  Add comments to explain why something is done a certain way — especially for non-obvious or tricky implementations.

- 🧪 **Test Before You Commit**

   Make sure your changes don't break existing features. Run tests and check the functionality locally.

> 🔍 Tip: If you're unsure about any part of the code style, look at existing files and follow the established patterns.

## Submitting Changes

1. **Push Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template
   - Submit the PR

## Pull Request Guidelines

- Provide a clear description of your changes
- Include screenshots if UI changes are made
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed

## ❓ Need Help?

If you run into issues or have questions, here are a few ways to get support:

- 📂 **Check Existing Issues & Discussions**  
   Browse the **Issues** and **Discussions** tabs — your question might already be answered!

- 💬 **Join Our Discord Community**  
  Connect with other contributors, ask questions, and get help in real time. *(Link to your Discord server here)*

- 📫 **Contact the Maintainers**  
  Still stuck? Reach out to the maintainers via GitHub or through the contact info listed in the repository.

Thank you for contributing to InfantCareCompass! 🚀
