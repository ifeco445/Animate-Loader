# Top Rated Movies with Skeleton Animation

This is a simple React project that fetches popular movies from the TMDb API and displays them in a grid layout. Initially, skeleton animations are shown while the data is being fetched. When a movie is clicked, a modal appears displaying the movie details, including the cast and production companies.

## Features

- Fetches popular movies from the TMDb API.
- Displays movies in a grid layout.
- Shows skeleton animations while the data is being fetched.
- Displays movie details, including cast in a modal when a movie is clicked.

### Overview

The project screen opens up by fetching data from an API endpoint, and instead of an empty screen while the data is been fetched, a skeleton animation is rendered first. This will mimic the way the items will be rendered after loading.

More, the loader can be set to stop displaying once the data is fetched, it could also be set based on timeout in seconds.

## Technologies Used

- React
- Bootstrap (for modal and layout)
- Framer Motion (for animations)
- TMDb API

## Installation

1. Clone the repository
   `
2. Install all dependencies
   `npm install`
3. Start project
   `npm start
`

Open your browser and navigate to http://localhost:3000 to view the app.
