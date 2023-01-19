# Demo of Forms Builder

## Stack

The app is using built:

- _frontend_ - TypeScript, Recoil and React Forms Builder;
- _backend_ - TypeScript, Fastify & socket-io;
- _db_ - Mongo

It is using pnpm as package manager and script runner.

## Starting

1. add `.env` file to /server:
```sh
MONGODB_URL=mongodb://localhost:27017/demo-form-builder
```
2. add `.env` file to /app:
```sh
REACT_APP_BACKEND_URL=http://0.0.0.0:8000
```
3. in _/server_ folder run:
```sh
pnpm run dev
```
4. in _/app_ folder run:
```sh
pnpm run app
```