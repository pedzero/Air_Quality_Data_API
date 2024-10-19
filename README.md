# Air Quality Data API

This repository contains an API developed to receive, store, and process air quality data collected from various environments, using [ScadaBR](https://www.scadabr.com.br/) as the monitoring system. The received data is organized and made available for querying, allowing the retrieval of the Air Quality Index (AQI) based on the parameters sent by sensors connected to ScadaBR.

## Configuring Publishers in ScadaBR

### General Properties

1. Create a name of your choice for the Publisher.
2. Mark it as **Enabled**.
3. HTTP Method: **POST**.
4. URL: `http://<server_ip:port>/api/data`.
5. Date Format: **Timezone**.

### Configuring Points

1. Choose the desired parameter and add it.
2. Check the option **Include timestamp**.
3. The parameter names must follow this pattern: **City_Institute_Room_Parameter**.

   Example: `Rio de Janeiro_UFRJ_External_CO2`.

4. Parameters used to calculate the AQI must be marked with an **asterisk** (*).

   Example: `Rio de Janeiro_UFRJ_Hardware Lab_PM10*`.

> **Note:** For correct AQI calculation, parameters must be sent in the unit **µg/m³**.

> Special characters (e.g. 'ã', 'é', 'ó') must be avoided.

Once the points are configured, click **Save**. The data will automatically be sent to the API whenever changes are detected by ScadaBR.

## API Documentation

The API documentation is available in **OpenAPI** (YAML) format, enabling integration with tools like Swagger and Postman. The `openapi.yaml` file is included in the repository and can be used to explore all the API's routes and functionalities.
