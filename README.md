# Configurações e Instalações

## Instalações
+ Yarn ou NPM
+ Carga - Rust lang
+ Docker
+ WLS2 para janelas

## Configurações
### Criando as imagens Docker
+ Imagem para a frente
```yaml
DO nó:18-alpine3.20 AS build

WORKDIR /aplicativo

COPIE pacote.json ./

EXECUTAR instalação do fio

CÓPIA DE . .

EXECUTAR construção de fio --configuração de produção

DE nginx:alpine AS executado

EXECUTAR rm -rf /usr/share/nginx/html/*

COPIAR --from=build /app/dist/front_minefield/browser /usr/share/nginx/html

EXPOSIÇÃO 80

CMD ["nginx", "-g", "daemon desativado;"]
```
+ Imagem para o verso
```yaml
DA ferrugem: 1,78-alpine AS build

WORKDIR /aplicativo

COPIAR ./Cargo.toml ./Cargo.toml
COPIAR ./Cargo.lock ./Cargo.lock
COPIAR ./src ./src

EXECUTAR apk add --no-cache musl-dev

EXECUTAR construção de carga --release

DE alpine: última execução do AS

WORKDIR /aplicativo

COPIAR --from=build /app/target/release/back_minefield ./back_minefield

COPIAR ./properties.yaml ./properties.yaml

EXECUTAR chmod +x ./back_minefield

EXPOSIÇÃO 8090

CMD ["./back_minefield"]
```
