# Air Quality Data API

This repository contains an API developed to receive, store, and process air quality data collected from various environments, using [ScadaBR](https://www.scadabr.com.br/) as the monitoring system. The received data is organized and made available for querying, allowing the calculation of the Air Quality Index (AQI) based on the parameters sent by sensors connected to ScadaBR.

## Environment Setup

### Prerequisites

- **Node.js:** Make sure [Node.js](https://nodejs.org/) is installed on your machine.
  - After installation, verify with:
    ```bash
    node -v
    npm -v
    ```

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pedzero/Air_Quality_Data_API.git
   cd air_quality_data_api

2. **Install dependencies:**
   ```bash
   npm install

3. **Create a .env file:**

   In the root directory of the project, create a .env file with the following variables:
   ```makefile
   DB_USER=<your_database_user>
   DB_PASS=<your_database_password>
   DB_NAME=<your_database_name>
   DB_HOST=<your_database_host>
   DB_PORT=<your_database_port>
   
   PORT=<api_port>

   DELETE_PASSWORD=<your_password>

4. **Start the API:**
   ```bash
   npm start

> **Note:** When dealing with a large volume of data, the use of indexes in the database is mandatory. Check out 'indexes_events.sql', it has some indexes that optimize queries and an event to delete old parameters.

## Configuring Publishers in ScadaBR

### General Properties

1. Create a name of your choice for the Publisher.
2. Mark it as **Enabled**.
3. HTTP Method: **POST**.
4. URL: http://<server_ip:port>/api/data.
5. Date Format: **Timezone**.

### Configuring Points

1. Choose the desired parameter and add it.
2. Check the option **Include timestamp**.
3. The parameter names must follow this pattern: **City_Institute_Room_Parameter**.

   Example: Rio de Janeiro_UFRJ_External_CO2.

4. Parameters used to calculate the AQI must be marked with an **asterisk** (*).

   Example: Rio de Janeiro_UFRJ_Hardware Lab_PM10*.

> **Note:** For correct AQI calculation, parameters must be sent in the unit **µg/m³**.

> Special characters (e.g. 'ã', 'é', 'ó') must be avoided.

Once the points are configured, click **Save**. The data will automatically be sent to the API whenever changes are detected by ScadaBR.

## API Documentation

The API documentation is available in **OpenAPI** (YAML) format, enabling integration with tools like Swagger and Postman. The openapi.yaml file is included in the repository and can be used to explore all the API's routes and functionalities.

## Related Project

This API is designed to be used with a mobile app for querying air quality data. Visit the related repository here: [Air Quality Mobile App](https://github.com/pedzero/Air_Quality_Data_APP).