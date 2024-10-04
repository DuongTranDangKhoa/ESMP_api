FROM oven/bun:1.1.12-debian AS builder
WORKDIR /bun_app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

FROM oven/bun:1.1.12-debian
WORKDIR /bun_app

COPY --from=builder /bun_app /bun_app

EXPOSE 2510

ENTRYPOINT [ "bun", "start" ]
