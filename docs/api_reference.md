# CarbonSol API Reference

This document provides detailed information about the CarbonSol API endpoints, request parameters, and response formats.

## Base URL

All API endpoints are relative to the base URL:

```
https://api.carbonsol.io/v1
```

For local development, use:

```
http://localhost:5000
```

## Authentication

API requests require authentication using an API key. Include the API key in the request header:

```
Authorization: Bearer YOUR_API_KEY
```

To obtain an API key, please contact the CarbonSol team or register on the platform.

## Endpoints

### Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Response:**

```json
{
  "status": "healthy",
  "message": "CarbonSol AI API is running"
}
```

### Price Prediction

Predict carbon credit prices based on historical data.

**Endpoint:** `POST /predict/price`

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| historical_data | array | Yes | Array of historical price data points |
| days_ahead | integer | No | Number of days to predict (default: 30) |
| credit_type | string | No | Type of carbon credit (default: "VCU") |

**Example Request:**

```json
{
  "historical_data": [
    {"date": "2023-01-01", "price": 10.5, "volume": 1000},
    {"date": "2023-01-02", "price": 10.7, "volume": 1200},
    {"date": "2023-01-03", "price": 10.8, "volume": 1100},
    {"date": "2023-01-04", "price": 10.6, "volume": 900},
    {"date": "2023-01-05", "price": 10.9, "volume": 1300}
  ],
  "days_ahead": 10,
  "credit_type": "VCU"
}
```

**Example Response:**

```json
{
  "prediction": [11.0, 11.2, 11.3, 11.5, 11.6, 11.8, 11.9, 12.0, 12.1, 12.2],
  "credit_type": "VCU",
  "days_ahead": 10
}
```

### Carbon Footprint Calculation

Calculate carbon footprint based on various activities.

**Endpoint:** `POST /calculate/footprint`

**Request Parameters:**

The request body should contain key-value pairs for different emission sources. All parameters are optional, but at least one should be provided for meaningful results.

Common parameters include:

| Parameter | Type | Description |
|-----------|------|-------------|
| electricity_kwh | number | Electricity consumption in kWh |
| natural_gas_kwh | number | Natural gas consumption in kWh |
| car_petrol_km | number | Distance traveled by petrol car in km |
| car_diesel_km | number | Distance traveled by diesel car in km |
| car_electric_km | number | Distance traveled by electric car in km |
| flight_short_km | number | Short-haul flight distance in km |
| flight_medium_km | number | Medium-haul flight distance in km |
| flight_long_km | number | Long-haul flight distance in km |
| beef_kg | number | Beef consumption in kg |
| lamb_kg | number | Lamb consumption in kg |
| pork_kg | number | Pork consumption in kg |
| chicken_kg | number | Chicken consumption in kg |
| fish_kg | number | Fish consumption in kg |
| dairy_kg | number | Dairy consumption in kg |
| vegetables_kg | number | Vegetables consumption in kg |
| fruits_kg | number | Fruits consumption in kg |
| grains_kg | number | Grains consumption in kg |

**Example Request:**

```json
{
  "electricity_kwh": 300,
  "natural_gas_kwh": 500,
  "car_petrol_km": 1000,
  "flight_short_km": 2000,
  "beef_kg": 5,
  "dairy_kg": 10,
  "vegetables_kg": 20
}
```

**Example Response:**

```json
{
  "total_emissions": 1.25,
  "breakdown": {
    "energy": 0.16,
    "transportation": 0.94,
    "food": 0.15
  },
  "recommendations": [
    {
      "description": "Switch to renewable energy to reduce your electricity emissions",
      "potential_savings": 0.07
    },
    {
      "description": "Reduce beef consumption or switch to lower-carbon protein sources",
      "potential_savings": 0.11
    },
    {
      "description": "Consider taking the train instead of short-haul flights",
      "potential_savings": 0.41
    }
  ]
}
```

### Project Analysis

Analyze carbon reduction projects and estimate carbon credits.

**Endpoint:** `POST /analyze/project`

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| project_data | object | Yes | Project details |

The `project_data` object should contain information about the carbon reduction project. The required fields depend on the project type.

**Example Request for Reforestation Project:**

```json
{
  "project_data": {
    "project_type": "reforestation",
    "location": {
      "country": "Brazil",
      "region": "Amazon",
      "coordinates": {
        "latitude": -3.4653,
        "longitude": -62.2159
      }
    },
    "area_hectares": 1000,
    "tree_species": ["Mahogany", "Teak", "Eucalyptus"],
    "planting_density": 1000,
    "estimated_carbon_sequestration": 300,
    "project_duration_years": 30,
    "monitoring_plan": "Satellite imagery and ground surveys",
    "community_benefits": "Local employment and sustainable forestry training",
    "biodiversity_impact": "Habitat restoration for endangered species"
  }
}
```

**Example Response:**

```json
{
  "project_score": 85,
  "risk_assessment": {
    "overall_risk": "low",
    "permanence_risk": "medium",
    "leakage_risk": "low",
    "additionality_risk": "low"
  },
  "verification_status": "eligible",
  "estimated_credits": 9000000,
  "recommendations": [
    "Implement fire prevention measures to reduce permanence risk",
    "Enhance monitoring frequency to improve verification confidence",
    "Consider adding more diverse native species to increase biodiversity impact"
  ]
}
```

## Error Handling

The API returns standard HTTP status codes to indicate success or failure:

- 200: Success
- 400: Bad Request (invalid parameters)
- 401: Unauthorized (invalid or missing API key)
- 404: Not Found (endpoint does not exist)
- 500: Internal Server Error

Error responses include a JSON object with an `error` field containing a description of the error:

```json
{
  "error": "Missing required parameter: historical_data"
}
```

## Rate Limiting

API requests are subject to rate limiting to ensure fair usage. The current limits are:

- 100 requests per minute
- 1,000 requests per day

Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

If you exceed the rate limit, you will receive a 429 Too Many Requests response.

## Support

For API support or to report issues, please contact api@carbonsol.io or open an issue on our [GitHub repository](https://github.com/CarbonSol/CarbonSol). 