# BuildForge API

## Base URL

`/api/v1`

## Endpoints

### `GET /health`

Returns service health and server time.

### `GET /projects`

Returns the current project list.

### `GET /projects/:projectId`

Returns a single project summary if it exists.

### `GET /generate`

Returns stored generation responses.

### `POST /generate`

Creates a new generation request.

Example payload:

```json
{
  "projectName": "ForgeFit",
  "prompt": "Build a fitness tracking app with progress charts and social sharing.",
  "target": "mobile-app",
  "stack": "React Native",
  "audience": "Busy professionals tracking strength progress",
  "requiredFeatures": ["Workout logs", "Progress charts", "Social sharing"]
}
```

### `POST /deployments`

Queues a deployment.

```json
{
  "projectId": "proj_restaurant_001",
  "environment": "preview"
}
```

### `GET /admin/overview`

Returns starter analytics for the admin dashboard.
