## Introduction

Welcome to this blog post on building a secure Express application with TypeScript, AWS Cognito and Prisma ORM. In this project, I had the opportunity to upskill myself in various areas including Node.js, TypeScript, clean code principles, best practices, AWS Cognito, validation using Joi, ORM concepts, and more.

Throughout the project, I worked closely with my mentor, @robertwilkinson-dev, who provided invaluable guidance and support. With his help, I was able to develop a robust and secure application architecture that I'm excited to share with you.

I'll cover each component in detail, providing step-by-step instructions, code examples, and explanations of the core concepts. By the end of this post, you'll have a comprehensive understanding of each technology and how it fits into the overall architecture.

Let's dive into the exciting world of building application architecture!

## Section 1: Overview of the architecture

This architecture ensures a robust and scalable foundation for our application.

![Architecture Diagram](images/diagram.png)

### 1. AWS Cognito Authentication Middleware

At the core of our application's security is AWS Cognito, a powerful authentication and user management service provided by Amazon Web Services (AWS). We utilize AWS Cognito Authentication Middleware to handle user authentication. This middleware ensures that only authenticated users can access protected routes in our application.

### 2. Route Handlers

Route Handlers are responsible for handling incoming requests and directing them to the appropriate controllers. They act as the entry point for requests and are responsible for request routing and initial request processing.

### 3. Validation Middleware

Validation Middleware plays a role in validating requests and ensuring proper data handling. We have used the popular Joi library as our choice for request validation, but you can choose any validation library that suits your preferences and requirements. The validation process ensures that incoming requests adhere to predefined schemas or rules, verifying that the data is in the correct format and meets the necessary criteria for further processing.

By incorporating the Validation Middleware into our architecture, we can confidently handle requests, knowing that the data has been **validated** and is ready for processing by the appropriate components. This step adds an extra layer of security and reliability to our application.

### 4. Controllers

Controllers are the heart of our application, responsible for processing requests and orchestrating the interactions between various components. They serve as the bridge between incoming requests and the underlying business logic. Each controller in our architecture has a specific purpose and focuses on a **single responsibility**.

Here are some examples of our controllers:

- **Message Controller**: This controller handles operations related to messages within our application. It receives requests and then passes on the responsibility of performing actual database operations to the relevant Message Operations component.

- **Channel Controller**: The Channel Controller manages channels, which serve as containers for messages. Similarly, it passes on database operations to the Channel Operations component.

- **User Controller**: The User Controller is responsible for managing user-related operations. Similarly, it passes on database operations to the User Operations component.

By following the single responsibility principle, controllers are designed to focus on request handling by delegating tasks to dedicated components. This approach ensures a clear separation of concerns, improving code organisation, maintainability, and reusability across our application.

### 5. Operations

Operations encapsulate the business logic of our application. They define reusable functions that handle specific tasks within our controllers. These functions interact with the database using Prisma to perform the necessary operations.

For example, within our message-related operations, we have created the following operations:

#### 5a. Message operations

- **createMessageOperation**: Handles the creation of new messages.
- **getChannelMessagesOperation**: Retrieves messages for a specific channel.
- **updateMessageOperation**: Updates an existing message.
- **deleteMessageOperation**: Deletes a message from the system.

The operations provide a clear separation between the controller and the database, allowing for easier testing, debugging, and future enhancements.

### 6. Prisma ORM (PostgreSQL)

[Prisma ORM](https://www.prisma.io/) is an essential component of our architecture, providing a type-safe database toolkit. It enables us to interact with the PostgreSQL database efficiently. Prisma ORM simplifies database operations, including querying, migrations, and data modelling.
