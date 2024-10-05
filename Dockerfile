# Stage 1: Build stage
FROM oven/bun:1.1.12-debian AS build
ENV TZ='Asia/Saigon'
WORKDIR /bun_app
COPY ./package.json ./bun.lockb ./
RUN bun install

COPY prisma prisma
RUN bun db:generate

COPY . /bun_app

# Stage 2: Final image for production
FROM oven/bun:1.1.12-debian
ENV TZ='Asia/Saigon'
WORKDIR /bun_app
COPY --from=build /bun_app /bun_app
EXPOSE 2510
ENTRYPOINT [ "bun", "start" ]
