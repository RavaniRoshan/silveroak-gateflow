# GATE CLUB - Digital Excellence Hub

Welcome to the official repository for the GATE CLUB Digital Excellence Hub, a comprehensive web application designed to help students prepare for the GATE (Graduate Aptitude Test in Engineering) exams. This platform is developed by Silver Oak University to provide a seamless and effective learning experience.
<img width="1881" height="1070" alt="image" src="https://github.com/user-attachments/assets/00812261-d994-4d2b-b0a3-3cf5b02698d7" />


## 🚀 Features

This platform is packed with features to aid in GATE preparation:

- **Comprehensive Study Materials**: Access to university-curated content for all 27 GATE subjects.
- **Advanced Mock Tests**: A realistic GATE testing environment with detailed performance analytics.
- **Expert Community**: Connect with faculty, successful alumni, and peer study groups.
- **Video Lectures**: Interactive sessions from expert faculty at Silver Oak University.
- **Previous Year Papers**: An extensive bank of past GATE questions with detailed solutions.
- **Progress Analytics**: Personalized insights to track and improve performance.
- **24/7 Access**: Learn anytime, anywhere.
- **AI-Powered Personalization**: Get personalized recommendations for a tailored learning path.
- **Instant Doubt Resolution**: Get your questions answered instantly.

## 🛠️ Tech Stack

This project is built with a modern tech stack:

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.io/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Linting**: [ESLint](https://eslint.org/)

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (as a package manager)
- A [Supabase](https://supabase.io/) account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/gate-club.git
    cd gate-club
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Supabase project URL and anon key:
    ```
    VITE_SUPABASE_URL=your-supabase-project-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173`.

## 📂 Project Structure

The project follows a standard Vite + React project structure:

```
/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Supabase client and types
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── supabase/            # Supabase migrations and config
├── package.json         # Project metadata and dependencies
└── vite.config.ts       # Vite configuration
```

## ☁️ Supabase Setup

This project uses Supabase for its backend services.

1.  **Create a new Supabase project:**
    Go to the [Supabase Dashboard](https://app.supabase.io) and create a new project.

2.  **Get your API keys:**
    In your Supabase project, go to `Settings` > `API` to find your project URL and `anon` key.

3.  **Set up the database schema:**
    Use the SQL files in the `supabase/migrations` directory to set up your database schema. You can run these queries in the Supabase SQL editor.

## 🚀 Deployment

The application can be deployed to any static site hosting service like Vercel, Netlify, or GitHub Pages.

Run the following command to build the application for production:
```bash
npm run build
```
This will create a `dist` directory with the production-ready files.
