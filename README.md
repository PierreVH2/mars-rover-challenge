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

#### Type Assertions

I committed a cardinal sin in the `load.ts` file, largely to open a conversation around the use of the `as` keyword in Typescript. It is very rare that I would agree to the use of `as`, because it imposes assumptions regarding the structure of whatever is being handled without any checks whatsoever. The highlighted lines are examples of where it is strictly speaking not unsafe, due to the RegEx tests. That said, a better way would have been to implement type checks, for example:

```typescript
const isCommand = (cmd: string): cmd is Command => !!['L','R','F'].includes(cmd);
const isCommandArray = (cmds: string[]): cmds is Command[] => cmds.every((c) => isCommand(c));
const processCommandsLine = (line: string): Command[] => {
  const cols = line.split('');
  if (!isCommandArray(cols)) {
    throw new Error(`Invalid rover commands line: ${line}`);
  }
  return cols;
}
```

#### Unit Tests

I implemented unit tests for the `rover.ts` and `mars.ts` files. I did not write unit tests for the main `index.ts` file because it merely orchestrates the execution of the logic that's implemented in `rover.ts` and `mars.ts`. Similarly I did not write tests for the loader, as it only performs basic input validation.

The unit tests I wrote are by no means exhaustive, and conversely in some cases they may seem a bit redundant in some cases. Here are some key points regarding what I deem to be ideal unit tests:

1. Static code analysis can show you which code paths aren't properly covered by the unit tests, but that's just part of a bigger picture. The full parameter space of all input parameters must be probed. An example is where an `if` block is executed if one of two (or more) conditions are met - both conditions need to be tested individually.
1. Unit tests are best written in isolation of the implementation. Sometimes it's useful to ask another developer to implement a battery of unit tests for you because as developers we can sometimes get bogged down with our preconceptions of how the code should function.
1. They should be structured such that the pre-conditions that comprise the input parameter space are nested (hierarchically) with the least significant pre-conditions in the outermost layer. A good indicator for this is that each of the variables or input parameters should be set only once. Taking a look at `rover.spec.ts`, the reader will note that there are 2 instances where the same variable is set more than once. The unit tests can be restructured to avoid this, although this would lead to a lot of duplication of code, so I decided to break the rule in this instance.
1. Only a single unit of code should be tested at a time, be it a file, class or module. Anything that gets imported into the unit must be properly stubbed.
1. Unit tests should not be impacted by outside factors and should not depend on random data. All data that gets pulled into the unit must again be properly stubbed.
1. Last, but certainly least, the unit test results should read like a story. In theory, a non-technical person (eg. a business analyst) should be able to read the unit test output and verify that all the business rules have been adequately implemented.
