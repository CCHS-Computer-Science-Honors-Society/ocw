# Moved to http://github.com/not-ani/ocw-rewrite

```md

# Old Readme:  Cherry Creek High School Open CourseWare

Welcome to the **Cherry Creek High School Open CourseWare (OCW)** project! This repository hosts the codebase for [creekocw.com](https://creekocw.com), an initiative dedicated to providing free educational resources and course materials from Cherry Creek High School.

Note on contrubution history: this website has been written in many different languages and different repos, this repo was created in late 2024 but the idea has been worked on from 2023.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The **Cherry Creek High School Open CourseWare** project aims to make high-quality educational content accessible to everyone. This platform offers resources, lecture notes, practice problems, and more, covering various subjects taught at Cherry Creek High School.

## Features

- **Extensive Educational Resources**: Access a wide range of course materials across different subjects.
- **Interactive Content**: Engage with interactive elements to enhance the learning experience.
- **Search Functionality**: Easily find the content you need with a robust search feature.
- **Responsive Design**: Enjoy a seamless experience on all devices.
- **Open Source**: Community-driven development encourages collaboration and continuous improvement.

## Project Structure

```plaintext
.
├── .env.example
├── .eslintrc.cjs
├── .github/
│   └── ci.yml
├── .gitignore
├── bun.lockb
├── components.json
├── drizzle.config.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public/
├── scrapping/
│   └── README.md
├── SETUP.md
├── src/
│   ├── app/
│   │   └── layout.tsx
│   ├── styles/
│   │   └── globals.css
│   └── ...
├── start-database.sh
├── tailwind.config.ts
├── tsconfig.json
└── ...

```plaintext
src/            Main application code.
public/         Public assets like images and icons.
scrapping/      Tools and scripts for data scraping.
styles/         Global styles for the application.
SETUP.md        Guide for setting up the development environment.
package.json    Project dependencies and scripts.
tailwind.config.ts  Tailwind CSS configuration.


## Technologies Used

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Drizzle](https://orm.drizzle.team/)

## This project is built using the **T3 Stack** and was bootstrapped with `create-t3-app`

## Prerequisites

Ensure you have the following installed before starting:

- **Node.js** and **Bun**: [Download Node.js](https://nodejs.org/) and [Install Bun](https://bun.sh/)
- **Git**: [Install Git](https://git-scm.com/)

---

## Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repo-url> creekocw
cd creekocw


### 2. Copy Environment Variables

```bash
cp .env.example .env


Fill in the `.env` file with the necessary configuration settings.

### 3. Install Dependencies

Using **Bun**:

```bash
bun install

### 4. Set Up the Database with Neon.tech

1. **Create a PostgreSQL Database on Neon.tech**:

   - Go to [Neon.tech](https://neon.tech/) and sign up or log in.
   - Create a new PostgreSQL project and note the connection string.

2. **Configure the Environment**:

   Add your Neon connection string to the `.env` file:

   ```plaintext
   DATABASE_URL="your-neon-connection-string"


3. **Run Database Migrations**:

bash
   bun run db:push

---

## Usage

### Start the Development Server

Using **Bun**:

```bash
bun dev
``

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command      | Description                            |
| ------------ | -------------------------------------- |
| `dev`        | Starts the development server.         |
| `build`      | Builds the application for production. |
| `start`      | Runs the built application.            |
| `db:push`    | Runs database migrations.              |
| `lint:fix`   | Lints the codebase using ESLint.       |
| `format:fix` | formats the codebase using prettier.   |
| `test`       | Runs tests.                            |

---

## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the Repository**: Click the "Fork" button on the repository page.
2. **Clone Your Fork**:

   ``bash
   git clone https://github.com/yourusername/creekocw.git
   ``

3. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ``

4. **Make Your Changes**: Implement your feature or fix the bug.
5. **Commit Your Changes** using **Conventional Commits**:
   ``bash
   git commit -m "feat: add new feature description"
   ``

   Examples of Conventional Commit prefixes:

   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation changes
   - `refactor`: Code changes that aren't new features or fixes
   - `test`: Adding or updating tests

6. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ``

7. **Create a Pull Request**: Open a PR to the main repository with a detailed description of your changes.

### Guidelines

- **Code Quality**: Maintain clear and concise code. Follow the existing code style.
- **Testing**: Ensure your changes are covered by tests.
- **Documentation**: Update documentation and comments where necessary.
- **Communication**: Be clear in your PR description and commit messages.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

- **Website**: [creekocw.com](https://creekocw.com)
- **Email**: [cherrycreekcshs@gmail.com](mailto:cherrycreekcshs@gmail.com)

---
```
