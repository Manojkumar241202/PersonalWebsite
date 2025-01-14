# Portfolio

This is my personal portfolio showcasing my skills, achievements, and coding journey. The project fetches and displays competitive programming ratings from various platforms and maintains a robust backend for data storage and updates.

## Features

- **Frontend**: Built using React for an interactive and user-friendly interface.
- **Backend**: Developed with Node.js to fetch and process rating distributions from popular competitive programming platforms via [Clist](https://clist.by/coder/manojkumar2412/).
- **Data Storage**:
  - **Firebase Firestore**: Used to back up the rating distributions.
  - **Relational Database (RDBMS)**: Maintains the titles of competitive programming platforms.
- **Data Generation (Datagen)**: Updates the rating distributions daily to ensure accuracy and freshness.

## Competitive Programming Platforms Integrated

- CodeChef
- CodeForces
- AtCoder
- LeetCode

## Setup and Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PersonalWebsite.git
   cd portfolio
   ```
2. Install dependencies:

    For the frontend:
    ```bash
      cd PersonalWebsite
      npm install
    ```

    For the backend:
    ```bash
      cd backend
      npm install
    ```

3. Start the development servers:
    
    Frontend:
    ```bash
      npm start
    ```

    Backend:
    ```bash
    node server.js
    ```

## Deployment
This project can be deployed using your preferred hosting platform. Ensure the backend and frontend are correctly linked and environment variables are properly configured for production.

Technologies Used
  - Frontend: React.js
  - Backend: Node.js
  - Database: Firebase Firestore, RDBMS
  - API Integration: Clist API
  - Task Scheduler: Datagen for daily updates

Feel free to contribute or raise issues to improve this project! 😊
