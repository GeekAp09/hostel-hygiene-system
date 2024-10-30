
# Hostel Hygiene System

This project is a backend solution for managing hostler requests and cleaner assignments within a hostel hygiene management system. Built with Express and MongoDB (with Mongoose ORM), the application provides an API allowing hostlers to raise requests and cleaners to log in, view, and complete tasks. Hostlers also have control to confirm task completion.


Let's try it out 🎉

-[MyCleaner](https://hostel-hygiene-system.vercel.app/Login)



## Features
- User Authentication: Cleaners can log in securely using their credentials.
- Request Handling: Hostlers can create new requests for cleaning or maintenance services, which are dynamically routed and handled.
- Task Completion: Only hostlers can confirm if a task has been completed by clicking a tick button next to the pending status, updating the task status from "pending" to "Completed."
- Role-based Access: Routes are tailored for different user roles—hostlers and cleaners—ensuring data isolation and security.
- Available Services: The website offers two main services: cleaning and maintenance, each with tailored request handling and tracking.
## Tech Stack

**Backend**: Node.js, Express.js
**Database**: MongoDB with Mongoose ORM
**Middleware**: CORS
**Authentication**: No sessions or JWT; local storage is used for user identification

## Feedback

If you have any feedback, please reach out to me at g.garvit227@gmail.com and worklikeakshay@gmail.com


## Contributing

Contributions are always welcome!


## Authors

- [@Garvit](https://www.github.com/garvit2207)
- [@Akshay](https://github.com/AkshayPratapSingh09)

