# Bill Receipt Generation System

## Overview
The Bill Receipt Generation System is a web-based application that allows users to generate and manage bill receipts efficiently. The system includes user authentication, bill generation, transaction tracking, and revenue statistics with a monthly revenue summary.

## Features
- User Authentication (Login & Registration)
- Bill Generation with customer details and itemized billing
- Transaction Tracking
- Monthly Revenue Calculation with filtering options
- Revenue Summary (Graph/Table View)

## Technologies Used
### Frontend
- React.js
- CSS
- bootstrap

### Backend
- Express.js (Node.js framework)
- MySQL (Database)

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- Node.js
- MySQL
- Git

### Clone the Repository
```sh
git clone https://github.com/arunthiw20/bill-receipt-generation-system.git
cd bill-receipt-generation-system
```

### Backend Setup
1. Navigate to the backend folder:
```sh
cd backend
```
2. Install dependencies:
```sh
npm install
```
3. Configure `.env` file with database credentials.
4. Start the backend server:
```sh
npm start
```

### Frontend Setup
1. Navigate to the frontend folder:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Start the React app:
```sh
npm start
```

## API Endpoints
| Method | Endpoint | Description |

| GET    | `/api/revenue/monthly/:year/:month` | Get monthly revenue summary |
| POST   | `/api/bills/create`                 | Create a new bill           |
| POST   | `/api/api/auth/login`               | Retrieve a bill by ID       |
| GET    | `/api/auth/profile`                 | Get profile info            |

## Usage
1. Register/Login to the system.
2. Create bill receipts by entering customer details and purchased items(Recipt  -> 'backend/recipts').
3. View and track transactions.
4. Analyze monthly revenue statistics.

## Author

- **Thiwanka Arunalu**

#
