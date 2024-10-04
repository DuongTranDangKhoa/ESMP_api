FROM oven/bun:1.1.12-debian
ENV TZ='Asia/Saigon'

WORKDIR /bun_app

# Sao chép package.json và bun.lockb để cài dependencies
COPY package.json bun.lockb ./

# Cài đặt dependencies
RUN bun install

# Sao chép prisma để chạy lệnh generate
COPY prisma ./prisma
RUN bun db:generate

# Sao chép các thư mục quan trọng khác
COPY src ./src
COPY public ./public

EXPOSE 2510
ENTRYPOINT [ "bun", "start" ]
