FROM rust:1.78-alpine AS build

WORKDIR /app

COPY ./Cargo.toml ./Cargo.toml
COPY ./Cargo.lock ./Cargo.lock
COPY ./src ./src

RUN apk add --no-cache musl-dev
RUN cargo build --release

FROM alpine:latest AS run

WORKDIR /app

COPY --from=build /app/target/release/back_minefield ./back_minefield
COPY ./properties.yaml ./properties.yaml

RUN chmod +x ./back_minefield

EXPOSE 8090

CMD ["./back_minefield"]
