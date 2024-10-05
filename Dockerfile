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

COPY . /bun_app
RUN rm -rf node_modules
EXPOSE 2510
ENTRYPOINT [ "bun", "start" ]
