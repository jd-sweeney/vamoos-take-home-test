# Vamoos/Api Integration

A small program that provides an interface to connects to the vamoos api. It also has a task runners to collate and execute simple tasks.

## Getting Started

```bash
npm run test # Execute tests
npm run task-runner:createItinerary # Task runner to create itinerary
```

## Code Architecture

All src code can be found under the src directory. index.ts acts as the entry point. The src/utils folder contains all the utility functions to process each individual operation. With each util file categorically labelled for it's purpose.

Testing framework in use is jest. All tests can be found under the \_\_tests\_\_ folder for each of the src code directories. With each test file matching the relevant file it's particularly testing.
