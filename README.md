# RS School REST service
---
## Table of contents
* [Prerequisites](#prerequisites)
* [Downloading](#downloading)
* [Installing](#installing)
* [Running](#running)
* [Development](#development)
---

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- [Docker](https://docs.docker.com/engine/install/) and `docker-compose` - must be installed on your system

## Downloading

```
git clone {repository URL}
git checkout task7/TypeORM-Postgres
```

## Installing

```
npm i
```
Strongly recommend to install official Docker extension for VS-Code, it makes docker workflow 
and task testing much more easier
![preview](https://i.ibb.co/C6v9PQ0/Screenshot-from-2021-06-21-14-04-41.png)


## Running

In this task all migrations runs at app startup, so all You got to do just run the command:
```
docker-compose up
```
To start migration you should wait till app start 
and then exec command `npm run typeorm:cli -- migraion:run` **!! inside a container !!**
If you installed Docker extension which I mentioned earlier click on its icon 
on the side panel in VS-Code or if You don't installed --> [check this instruction](#No-extension)

![preview](https://i.ibb.co/txG3yQW/Screenshot-from-2021-06-21-14-18-43.png)
Then navigate to `Containers` section

![preview](https://i.ibb.co/Wsy4CXQ/Screenshot-from-2021-06-21-14-21-28.png)

Right-click on `petrgali/rest-api` and then `Attach Shell` line

![preview](https://i.ibb.co/HgkNBXV/Untitled.png)

And finally in opened terminal on the bottom of VS-Code just type `npm run typeorm:cli -- migraion:run` and hit enter!

![preview](https://i.ibb.co/88B5qPW/Screenshot-from-2021-06-21-14-28-27.png)

That's all! You're done!

## No-extension

Type `docker ps`. To run migration we need first 
to get `CONTAINER_ID` with runnning app - `petrgali/rest-api`

![preview](https://i.ibb.co/prgxBhG/Screenshot-from-2021-06-21-15-00-22.png)

And now to run migration inside container 
type command `docker container exec CONTAINER_ID npm run typeorm:cli -- migration:run`.

In my case command looks like this way

![preview](https://i.ibb.co/c3BL8Bc/Screenshot-from-2021-06-21-15-07-44.png)


## Testing

After application running and migration ran open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
