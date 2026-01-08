# Realtime Translator - Frontend

This is the frontend for a real-time text translation web application. It allows users to translate text, view their translation history, and persists language preferences for a seamless experience.

## ✨ Features

*   **Translation Page:** An interface for inputting text, selecting the source language, and the target language.
*   **Auto-translation:** An option to automatically translate text as the user types, without needing to click a button.
*   **Translation History:** A dedicated page to review previous translations.
*   **Pagination:** The history page supports pagination for easy browsing of a large number of records.
*   **Settings Persistence:** The application remembers the last selected source and target languages between sessions using `localStorage`.
*   **User Identification:** Each user is assigned a unique identifier, which is stored locally and used to personalize data (e.g., history).
*   **Loading Indicators:** Spinners indicate when data is being fetched from the server.
*   **Notifications:** Toast notifications inform the user about errors.

## 🛠️ Tech Stack

*   **TypeScript:** The primary development language.
*   **SCSS:** A preprocessor for styling.
*   **Bootstrap 5:** Used for UI components (Toasts, Spinners, Pagination) and the grid system.
*   **Vite:** A modern frontend build and development tool.
*   **ESLint / Prettier:** For maintaining code quality and a consistent style.

## 🚀 Getting Started

To run the project locally, follow these steps.

### Prerequisites

*   Node.js installed (version 18.x or higher).
*   `npm` or `yarn` package manager installed.
*   The application's backend server must be running.

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd realtime-translator-front
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    *(or `yarn install`)*

3.  **Configure the API Path:**
    Ensure the backend server is running. If necessary, change the server URL in the file:
    `src/shared/constants/server-path.constant.ts`

4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    *(or `yarn dev`)*

    The application will be available at `http://localhost:5173` (or another port specified by Vite).

## 📦 Available Scripts

*   `npm run dev` — Starts the development server with hot-reloading.
*   `npm run build` — Builds the project for production into the `dist` directory.
*   `npm run preview` — Runs a local server to preview the production build.

## 📂 Project Structure

The project is organized following the Feature-Sliced Design principles (simplified version).

```
src/
├── domain/         # Core business logic (models, services)
│   ├── history/
│   └── languages/
│
├── features/       # Functional modules (pages)
│   ├── history-page/
│   └── translate-page/
│
├── shared/         # Reusable code
│   ├── constants/
│   ├── services/   # General services (HTTP, LocalStorage, Toast)
│   └── utils/
│
└── styles/         # Global styles
```
