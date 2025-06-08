# mars-rover-challenge

This is my submission toward my job application at Red Badger.

## Installing

Please ensure you have a recent version of Node and NPM on your machine - [Installing Node](https://nodejs.org/en/download).

Install all dependencies by executing

```bash
npm install
```

## Running

```bash
npm run start -- <filename>

```

where `<filename>` is the relative or absolute path to a file containing correctly formatted instructions for the challenge.

## Running Unit Tests

```bash
npm run test
```

## Discussion

### Language

I considered several languages, primarily those with which I have recent experience (eg. Javascript, Typescript, C#, Python). I considered Python seriously for the ease with which formatted input and output can be managed, which could cut down development time. That said, I do not have as much recent experience with Python, which may again increase dev time. Javascript is perhaps not he best option for a challenge such as this, since potential employers would look at things like SOLID design principles, which is less easy to demonstrate in a self-evident maneer than strongly types languages such as C# or Typescript due to Javascript's duck-typing ideology.

There was no clear winner along these lines of reasoning, so I decided to tackle the challenge in the language with which I am currently most familiar - Typescript.

### Design

#### Grid management

All of the grid-related code is contained within `mars.ts`, the idea being that this file could be expanded to cater for a greater variety of surface shapes - a traingular or oval shape, for example. This would require simply creating a function that would determine if a given coordinate falls within the surface or not, providing an adequate loader to read it from the input file and referencing it acoordingly in `index.ts`.

#### Direction

I considered making the direction a float/number value while the process is running. This would allow for greater extensibility of this code, because directions other than the cardinal directions would then be viable. I decided against this because the input is given and the output is expected in the form of cardinal directions, which would require more text processing and would be redundant given the requirements.

#### Scent

The "scent" presented a particular challenge during the implementation (and not only because robots tend toward the odourless end of the spectrum). My first thought was to implement the non-negative quarter of a Cartesian plane as a 2D array. However, after some thought I realised it would be more efficient to simply keep an array of the final positions of all the robots and to indicate whether or not the robot was lost. This would be more efficient due to the way V8 handles arrays (they are basically hash maps ie. always sparse arrays) relative to a language like Python where there are different implementations for sparse and dense arrays.

This would naturally mean that the entire list of previous rovers' final positions needs to be traversed every time the rover moves forward, but this can be optimised with Javascript's map-reduce operators.

#### Potential improvement

It would have been interesting if the instructions had additionally indicated no 2 rovers may occupy the same grid position - ie. no rover may move to the same grid coordinate where a previous rover had come to rest.


#### Type Definitions

The reader will note that I have created a single `types.ts` file - while this is a common practice in Typescript, I do not subscribe to this school of thought mostly because types files like this tend to snowball and become unmanageable. I tend to prefer keeping the type definitions in the files where they are primarily used. This is, however, a relatively simple challenge without much risk of this file ballooning.