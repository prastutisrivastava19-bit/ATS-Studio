# ATS Studio – ATS Resume Checker

ATS Studio is a web-based Applicant Tracking System (ATS) Resume Checker that helps job seekers evaluate their resumes against a specific job description. It analyzes resume content and provides an overall ATS score, category-wise scores, identified issues, and suggestions for improvement.

## Features

- **User Authentication:** Secure registration and login.
- **Resume Upload:** Upload resumes in PDF and DOCX formats.
- **Resume Text Extraction:** Extracts text from uploaded resumes.
- **ATS Score Analysis:** Evaluates resumes against a given job description.
- **Score Breakdown:** Displays scores for keywords, skills, formatting, experience, and education.
- **Issue Detection:** Identifies potential weaknesses in the resume.
- **Improvement Suggestions:** Provides recommendations to improve resume quality.
- **Dashboard:** Displays resume analysis results in an organized interface.

## Technology Stack

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Other Tools and Libraries
- JWT – Authentication
- bcryptjs – Password hashing
- Multer – File uploads
- pdf-parse – PDF text extraction
- Mammoth – DOCX text extraction
- Git and GitHub – Version control

## Project Structure

```text
ATS-Studio/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       └── styles/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── utils/
│
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/prastutisrivastava19-bit/ATS-Studio.git
cd ATS-Studio
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ats_studio
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## How It Works

1. Register or log in to your account.
2. Upload your resume in PDF or DOCX format.
3. Enter the job description for the role you are targeting.
4. Submit the resume for analysis.
5. View your overall ATS score and category-wise breakdown.
6. Review detected issues and improvement suggestions.

## Future Scope

- Enhanced resume analysis techniques.
- Additional resume evaluation criteria.
- Improved reporting and analysis features.

## Author

**Prastuti Srivastava**

B.Tech – Computer Science and Engineering

GitHub: [@prastutisrivastava19-bit](https://github.com/prastutisrivastava19-bit)

---

*ATS Studio – Making resumes more job-ready.*
