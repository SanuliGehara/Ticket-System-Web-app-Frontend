# Ticket-System-Web-app - Web Application (Frontend part only)
Contains the frontend part of the Ticket Management Web App. Built using React and Tailwind CSS. Includes User Login and SignUp, Ticket Booking feature for customers, Ticket release functioality for vendors and Configuration and Control panel for Admin. 

## Table of Contents - GUI + Backend

- [Introduction](#introduction)
- [GUI Setup Guidance](#GUI-Setup)
- [GUI Usage](#GUI-Usage)
- [API documentation](#API-documentation)

## GUI-Setup

### Prerequisites

- react installed
- react-router-dom intalled for routes
- axios installed for react app
- Tailwind CSS installed for react app

Installing commands:

```bash
#install react-router-dom
npm install react-router-dom

# axios installation
npm i axios

# install Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init
```

### Get started with the project

1. First go to correct folder which contains frontend files.

2. In the project directory, you can run:

```bash
npm start
```

3. Open http://localhost:3000 with your browser to see the result.

## GUI-Usage

### Step 1 - Sign Up & Login

### Sign Up

All the users should have an account of their specific user type (Customer, vendor or admin). New users can create an account using the “Sign Up” section. They need to specify all the expected user information (username, email, password, and user type).

If the email is in incorrect format, it will ask you to enter the correct email. Once the user clicks Sign in, A new account will be created in the database.

The user can not create an account without completing any of the expected input fields. They must enter valid inputs to fill their user information before signing in.

### Login

All the users are directed to the login page when opening this application. They need to successfully log in before starting to buy/release tickets.

Users can log in with their account using their selected user type (Customer, vendor, admin). If the username, password and user type are all correctly entered, the user will be redirected to the relevant page (Admin– configuration form & control panel, Vendor - vendor dashboard and customer to customer dashboard).

To successfully log in, all the input fields must be filled out with the correct credentials. If the credentials are wrong, the user is unable to log in. In Login, they must select the exact user type they chose when signing in/ creating the account.

### Step 2 - Redierscting to the relevant page (Admin/ Customer/ Vendor)

### Admin page - Configuration Form & Control Panel

After the user successfully logs in as the admin, he will be redirected to the admin page. Admin has a configuration form and control panel to start or stop the system.

Configuration form is used to set the configuration parameters to start the system. Admin can select the default configuration, which will appear in input fields as values. If not, they can specify a custom configuration and set the configuration. The new configuration will be saved in the database. Finally, the admin should start the system. They can stop the system. Appropriate error and success messages are shown.

### Vendor Dashboard

The vendor page is visible to the vendors. After logging in as a vendor, they will be redirected to this vendor dashboard. Vendors can release tickets. They can see the maximum ticket capacity, current available tickets (total tickets released to the ticket pool), remaining ticket size, and number of tickets to be released. After entering the number of tickets to release, the vendor can release tickets to the pool.

Then, the total tickets and remaining size dynamically update according to each ticket release. Also, it updates the ticket pool layout correctly to show the updated total tickets in the pool after the new ticket release. Also, it will update the collection (configuration, transactions) in the database.

### Customer Dashboard

After successful login, customer is redirected to the customer dashboard. Here, the customer can see the current layout of the ticket pool. They can see the max tickets, total tickets (released tickets by vendors), total available tickets (green), and already booked tickets (red).

Customer can book tickets by entering the no of tickets he wants to buy and pressing “buy tickets” button. The total price will be updated according to the number of tickets entered. I assumed that the price of a ticket is Rs. 1000.

After clicking buy tickets button, the ticket pool layout will be updated to show the booked tickets in red colour. Also, it will update the relevant collections in the database (configuration, tickets, transaction).

## API-documentation

Used Postman APU to check the API endpoints and their ability to give expected responses. Here is the link to Postman's API documentation of this project

- Link - https://documenter.getpostman.com/view/36636886/2sAYHwKjuM

