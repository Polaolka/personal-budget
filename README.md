# Personal Budget Application

A full-stack application for managing personal finances. The app includes a frontend for managing transactions and a backend for processing data. Both services are containerized using Docker for easy deployment and local development.

---

## **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Accessing the Services](#accessing-the-services)
5. [Development Notes](#development-notes)

---

## **Prerequisites**

Before running the application, ensure you have the following installed on your system:

- **Docker**: [Download Docker](https://www.docker.com/get-started)
- **Docker Compose**: (Included with Docker Desktop)

---

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Polaolka/personal-budget.git
   cd personal-budget
   ```

---

## **Running the Application**

### Start the Application

To build and start the Docker containers, run the following command:

```bash
docker-compose up --build
```

### Stop the Application

To stop and remove the running containers, run:

```bash
docker-compose down
```

The application will now be accessible at the URLs mentioned in the next section.

---

## **Accessing the Services**

After starting the application, you can access the services at the following URLs:

- **Frontend**: [http://localhost:3000](http://localhost:3000)  
  This is the user interface where you can manage transactions and view summaries.

- **Backend API**: [http://localhost:7000/api](http://localhost:7000/api)  
  REST API endpoints for managing transactions and categories.

---

## **Development Notes**

### Hot Reloading

The frontend supports hot reloading, so changes to the source code will automatically be reflected in the browser.

#### Enable Hot Reloading

Ensure the `volumes` are properly configured in `docker-compose.yml` to mount the source code.

#### Run in Development Mode

For development purposes, use the following command:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Adding Dependencies

To add dependencies to the project:

- **Frontend**:

  ```bash
  docker exec -it personal_budget_frontend npm install <dependency-name>
  ```

- **Backend**:
  ```bash
  docker exec -it personal_budget_backend npm install <dependency-name>
  ```

### Database Management

The application uses PostgreSQL as its database. The database is initialized automatically when the containers are started.

#### Access the Database

To access the database shell, use:

```bash
docker exec -it personal_budget_postgres psql -U postgres
```

#### Running Migrations

To run database migrations, ensure the backend container is running, and execute:

```bash
docker exec -it personal_budget_backend npx typeorm migration:run
```

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
