# teaching-suite-react

## Introduction

Teaching Suite is a platform to help teach students in a virtual teaching platform. It features group calling, reviewing previous lessons, and allows teachers to control a slide.

## Notes

- After running several times, Docker may run out of space in your system. This is due to volumes not being pruned by default. When this occurs, you can cleanup by running: `docker system prune --volumes`. [Read More](https://docs.docker.com/config/pruning/#prune-everything)

## Prerequisites

Have the following installed:

- Node.js
  - This is for TypeScript checkings depending on your code editor
- Docker
- Agora Account

Or, if you want to run without docker:

- Node.js
- Postgres
- Agora Account

## How to Setup

Create an Agora account and set up a new application.

Create a .env file for both the server and client folders. These will contain your Agora App Id and Certificate.

## How to Run

To run the project, execute:

```
docker-compose up --build
```

## Improvements

- Be able to add more than one teacher; this would require setting up another table such as departments and classrooms
- Teachers should be able to create new lessons
- Add other slide item contents: Tables, Links
- Add Automatic scrolling on slides
