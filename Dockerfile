FROM oven/bun:1.1.12-debian
ENV TZ='Asia/Saigon'

# Output file
WORKDIR /bun_app

COPY ./package.json ./
COPY ./bun.lockb ./
RUN rm -rf node_modules
RUN bun install

COPY prisma prisma
RUN bun db:generate
RUN bun db:generate:mongo
COPY . /bun_app

EXPOSE 2510
ENTRYPOINT [ "bun", "start" ]
