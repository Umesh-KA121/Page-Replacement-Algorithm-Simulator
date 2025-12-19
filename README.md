# Page Replacement Algorithm Simulator

A full-stack web application for simulating various page replacement algorithms used in operating systems memory management.

## Features

- **Five Page Replacement Algorithms:**
  - FIFO (First In First Out)
  - LRU (Least Recently Used)
  - OPT (Optimal)
  - LFU (Least Frequently Used)
  - Clock Algorithm

- **Interactive Visualization:**
  - Step-by-step simulation visualization
  - Real-time frame status display
  - Hit/Fault statistics
  - Detailed explanations for each step

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── utils/              # Frontend utilities (API client)
│   └── types.ts            # TypeScript types
├── server/                 # Backend source code
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Backend utilities (simulator)
│   │   ├── types.ts        # Backend types
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│   └── tsconfig.json       # TypeScript config for backend
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Page-Replacement-Algorithm-Simulator
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev:all
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173` (or next available port)

#### Option 2: Run Separately

**Backend only:**
```bash
npm run dev:server
```

**Frontend only:**
```bash
npm run dev
```

### Building for Production

**Build frontend:**
```bash
npm run build
```

**Build backend:**
```bash
npm run build:server
```

**Start production server:**
```bash
npm run start:server
```

## API Endpoints

### POST `/api/simulate`

Run a page replacement simulation.

**Request Body:**
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

**Response:**
```json
{
  "status": "ok",
  "message": "Page Replacement Algorithm Simulator API"
}
```

## Usage

1. Select a page replacement algorithm from the dropdown
2. Enter a page request sequence (e.g., `1,2,3,4,1,2,5,1,2,3,4,5`)
3. Set the memory size (number of frames, 1-10)
4. Click "Start Simulation"
5. Navigate through steps to see detailed visualization

## Development

The project uses:
- **Vite** for frontend development with hot module replacement
- **tsx** for backend development with watch mode
- **Concurrently** to run both servers simultaneously

## License

MIT
