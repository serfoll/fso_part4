# Fullstack Part 4 - Blog list

A blog list application, that allows users to save information about interesting blogs they stumble across on the internet. For each listed blog we will save the author, title, URL, and amount of upvotes from users of the application.

## Links

- [Repo](https://github.com/serfoll/fso_part4)
- [Live Demo on Render]()

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/serfoll/fso_part4.git
```

### 2. Navigate into the Project Directory

```bash
cd fso_part4
```

### 3. Install Dependencies

Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

or

```bash
npm run dev
```

## Topics covered

- Backend app structure
- Backend Testing
- User administration
- Token authentication

## Tech stack

- Node.js
- Express.js
- MongoDB
- Morgan

## API Endpoints

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/api/blogs` | Get blog lists           |
| POST   | `/api/blogs` | Add a new blog list item |
