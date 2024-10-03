
# Overview

This web application is designed for India's leading electricity board to manage 
and track electricity connection requests. The app allows staff to view, add, 
edit, and filter connection requests through a user-friendly multi-page 
interface. It provides advanced functionality like data validation, connection 
status filtering, and visual representations of the data.

# Features

## Part A: User Management & Connection Requests


Display Records: Shows connection requests in a tabular format.

Search Functionality:Allows staff to search connection requests by Applicant ID.

Add User: Provides functionality to add new electricity connection users.

Delete User: Allows deletion of users with "Rejected" connection status.

Date Filter: A date picker allows filtering requests by the date of application.

Edit Requests: Enables staff to view and edit electricity connection requests.

Data Validation:
Date of Application, Government ID Type, and ID Number are immutable.
Load applied should not exceed 200KV.

## Part B: Data Visualization

Bar Chart: Shows the number of connection requests per month, with an option to filter by request status (pending, approved, etc.).

# Tech Stack

## Frontend

ReactJS: For building the interactive UI.
CSS: Styling for the web pages.
Chart.js: For visualizing data through charts (bar, line, and pie charts).
React Datepicker: A calendar-based date picker for filtering users by date.

## Backend

Firebase: Firestore for real-time database, authentication, and hosting.

# Usage

## Home Page: Displays all connection requests in a table format.

Search by Applicant ID.
Add or delete users.
Filter connection requests by date using the calendar-based date picker.

## Charts Page:

View monthly connection requests by status (Pending, Approved, etc.).
Use the dropdown to filter connection requests by status.
Visualize data using a bar chart.



