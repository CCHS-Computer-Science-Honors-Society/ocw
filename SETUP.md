# SETUP Guide for Project

<!--toc:start-->

- [SETUP Guide for Project](#setup-guide-for-project)
  - [Prerequisites](#prerequisites)
  - [Setup Commands](#setup-commands) - [Additional Tips](#additional-tips)
  <!--toc:end-->

Welcome to the OCW project setup guide. This guide will walk you through the steps to set up your development environment. This guide is aimed at beginners as well, providing links and more detailed explanations where necessary.

## Prerequisites

Before proceeding with the setup, make sure you have the following installed on your machine:

1. **NodeJS** and **Bun** - Bun is an ultra-fast JavaScript runtime like Node.js. You can [download NodeJS here](https://nodejs.org/en/download/) and [install Bun here](https://bun.sh/).

2. **Docker** - Docker is used to create and manage containerized environments, which is helpful for managing our database. You can find Docker installation instructions [here](https://docs.docker.com/get-docker/).

## Setup Commands

1. **Clone the Repository**

   Run the command below to clone the repository. Make sure Git is installed. If not, you can [download Git here](https://git-scm.com/downloads).

   ```bash
   git clone https://github.com/CCHS-Computer-Science-Honors-Society/ocw.git
   ```

2. **Navigate to the Project Directory**

   Move into the newly cloned project directory:

   ```bash
   cd ocw
   ```

3. **Copy Environment Variables Template**

   Copy the example environment variables file to create your own `.env` file. This file holds configuration settings such as API keys and database connection strings.

   ```bash
   cp .env.example .env
   ```

4. **Fill in `.env` File**

   Open the `.env` file in your favorite text editor (e.g., VS Code, Sublime, Vim) and fill in the required variables. These might include database credentials, API keys, etc. Make sure to save the changes after you are done.

5. **Create the PostgreSQL Docker Container**

   To create a PostgreSQL database container, use the following command. This will download and start a PostgreSQL instance named `drizzle-postgres` with the password `mypassword` and make it accessible at port 5432.

   ```bash
   docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
   ```

6. **Access the PostgreSQL Container**

   Now that the container is running, execute the following command to enter the PostgreSQL shell:

   ```bash
   docker exec -it drizzle-postgres psql -U postgres
   ```

7. **Enable Required PostgreSQL Extension**

   Inside the PostgreSQL shell, type the following to enable the `pg_trgm` extension, which provides fast text search capabilities:

   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_trgm;
   ```

   After that, exit the PostgreSQL shell by typing:

   ```sql
   \q
   ```

8. **Install Dependencies with Bun**

   Install the necessary project dependencies using Bun. This is similar to `npm install` but much faster.

   ```bash
   bun install
   ```

9. **Run the Development Server**

   Start the development server using Bun:

   ```bash
   bun run dev
   ```

   > **Note:** You might get connection errors because the PostgreSQL container may shut down after inactivity. To restart the container, use:

   ```bash
   docker start drizzle-postgres
   ```

### Additional Tips

- If you are unfamiliar with Docker, you can learn the basics [here](https://docs.docker.com/get-started/).
- For understanding how environment variables work and why they are important, check out [this guide](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html).

This should get your development environment up and running. If you encounter any issues, make sure to consult the Docker, Bun, or NodeJS documentation or reach out to your team for help.
