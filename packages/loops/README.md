# Vamoos/Loops

A small program that provides a four different implementations that iterates through a collection to request and extract the dimensions of an image.

## Getting Started

```bash
npm run test # Execute tests
```

## Code Architecture

All src code can be found under the src directory. index.ts acts as the entry point. The src/utils folder contains all the utility functions to process each individual operation. With each util file categorically labelled for it's purpose.

Testing framework in use is jest. All tests can be found under the \_\_tests\_\_ folder for each of the src code directories. With each test file matching the relevant file it's particularly testing.

Tested on node v12.14.1

## Traditional for loop

The signature specifies a series of statements that is processed for the loop to start, continue and end. This is suitable for iterating when the size of the collection is known in advance and the loop has a fixed looping criteria (e.g for each object or every second object, etc).

## for of loop

An es6 looping structure that iterates through all of values of the entire collection. It's a cleaner markup over the traditional loop where every item must be accessed.

## While loop

Continues to loop while some condition is met. This is handy for when collection sizes are unknown or the condition can change at any moment of the looping cycle.

## Do While loop

The same as the while except in which it must execute the loop at least once before the condition is met

## The Best One?

So the implementation I've approached this with was "optimising" the collection based on the looping structure. So, setting up iterables for while based loops and, leaving as an array for for. Simply because these are the sort of scenarios they mainly deal with. So for me, to specify why one looping structure should be preferred over the other doesn't make much sense since at the end of the day, we're dealing with the same collection and the looping conditions (every object must be accessed). And if there is a performance benefit, I see it as negligable. So, since this is the case, I would simply use the for...of loop, because it's concise and meets the requirements.
