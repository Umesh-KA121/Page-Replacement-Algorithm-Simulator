# Backend Server

Express.js backend server for the Page Replacement Algorithm Simulator.

## Structure

- `src/server.ts` - Server entry point
- `src/app.ts` - Express app configuration
- `src/routes/simulation.ts` - API routes for simulation
- `src/utils/simulator.ts` - Page replacement algorithm logic
- `src/types.ts` - TypeScript type definitions

## API Endpoints

### POST `/api/simulate`

Runs a page replacement simulation.

**Request:**
```json
{
  "pageSequence": ["1", "2", "3", "4", "1", "2", "5"],
  "memorySize": 3,
  "algorithm": "lru"
}
```

**Response:**
```json
{
  "steps": [...],
  "totalHits": 2,
  "totalFaults": 5,
  "hitRatio": 0.285
}
```

### GET `/health`

Health check endpoint.

## Development

Run in development mode with hot reload:
```bash
npm run dev:server
```

Build for production:
```bash
npm run build:server
```

Run production build:
```bash
npm run start:server
```

## Port

Default port: `3001` (configurable via `PORT` environment variable)

