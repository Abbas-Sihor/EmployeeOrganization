<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# EmployeeOrganization
This is an Employee oRganization web app to organize All the employee of a particular Oganization 

>>>>>>> 79c5bc67b9bea56d1c6b8854d07ef99b1740ee04
## Default Admin Credentials
For testing purposes, you can use the following admin account:

- **Email:** admin51@gmail.com  
- **Password:** admin515253
# Employee Management System

> ⚠️ Note: This project was built under a tight time constraint. The goal was to implement as much functionality as possible within the available time.  

## Overview
This is a basic **Employee Management System** built using **Next.js** and **MongoDB**. The system allows users to view, add, edit, and delete employee records. Admin users have additional privileges to manage employees.  

The project was built with an emphasis on functionality and demonstrating key concepts rather than production-ready error handling or UI polish.

---

## Features Implemented
- View all employees in a table
- Add a new employee (admin only)
- Edit employee details (admin only)
- Delete employee (admin only)
- Export employee data as CSV
- Role-based access (admin vs regular user)
- Basic client-side validation using alerts

---

## Technologies Used
- **Frontend:** Next.js, React
- **Backend / Database:** MongoDB
- **UI Components:** Tailwind CSS, Radix UI (Dialog, Select, Input)
- **Icons:** Lucide-react

---

## Limitations / Known Issues
- Error handling is limited to `alert` messages due to time constraints.
- Many functions and enhancements could not be implemented (e.g., detailed validation, pagination, sorting, and filtering).
- UI and styling are functional but minimal.
- No authentication tokens or secure login implemented (basic user role checks only).

---

## Future Improvements
- Replace alerts with proper notification components
- Add input validation on both client and server side
- Implement authentication with JWT / NextAuth
- Add pagination, sorting, and search functionality
- Improve UI/UX for a more polished interface

---

## How to Run
1. Clone the repository  
```bash
git clone <your-repo-url>
