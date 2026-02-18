# Weather App - Glass Morphism

A modern weather web application built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons. Features current weather, historical data, and marine conditions with a glass morphism design.

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd weather-app
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Features

- **Current Weather** - City, country, local time, temperature, description, icon, humidity, wind, pressure
- **Historical Weather** - Date picker, avg/min/max temp, description, wind, humidity
- **Marine Weather** - Lat/lon input, wave height, water temp, wind, visibility
- **Location Search** - Search with dropdown suggestions, dynamic updates

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Axios
- Framer Motion
- Lucide React (icons)

## API

Uses [WeatherStack API](https://weatherstack.com/). API key configured in `src/services/api.js`.
