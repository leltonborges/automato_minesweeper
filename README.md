# Índice
- [Configurações e Instalações](#configurações-e-instalações) 
	- [Instalação](#instalação) 
	- [Execução](#execução)
	    - [Requisitos](#requisitos)
	    - [Build](#build)
		    - [Front-End](#front-end)
		    - [Back-End](#back-end)
	    - [Run](#run)
- [Autômato](#autômato)
	- [Caça ao tesouro - Campo Minado](#caça-ao-tesouro---campo-minado)
	- [Definições](#definições)
	- [Configurações](#configurações)
	- [Regras de transição](#regras-de-transição)
# Configurações e Instalações
## Instalação
Dependências necessárias para o build do projeto

+ Front-End (Angular 17)
	+ Yarn V1.22+ [Site oficial](https://classic.yarnpkg.com/en/)
	+ ou NPM V10+ [Site oficial](https://docs.npmjs.com/)
+ Back-End(Rust V1.72)
	+ Cargo e Rust lang V1.72+ [Site oficial](https://doc.rust-lang.org/cargo/index.html)

## Execução
Com a finalidade de facilitar as execução, estão disponíveis imagens Docker do projeto no repositório do [docker hub](https://hub.docker.com/u/leltondev), deste modo é possível testar o projeto de forma simples e objetiva.
### Requisitos
+ Docker 
+ Docker-compose
### Build
+ Certifique-se que as portas da sua maquina `80/tcp` e `8090/tcp` estão livre ou ajuste os bind nos arquivos `docker-compose`
#### Criando as imagens Docker
##### Front-End
Image para o Front-End
```Dockerfile
# Dockerfile
FROM node:18-alpine3.20 AS build

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build --configuration production

FROM nginx:alpine AS run

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/front_minefield/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
##### Back-End
Image para o Back-End
```Dockerfile
# Dockerfile
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
```
### Run
#### 1ª Opção (simples)
Necessário executar o arquivo `docker-compose-run.yaml`
+ Arquivo
```
# docker-compose-run.yaml
version: '3.9'
services:
  back:
    image: leltondev/back-minefield:1.0.1
    ports:
      - "8090:8090"
    networks:
      - net-automato
  
  front:
    image: leltondev/front-minefield:1.0.1
    ports:
      - "80:80"
    networks:
      - net-automato
networks:
  net-automato:
    driver: bridge

```
+ Execução para disponibilizar o projeto
```sh
docker-compose -f docker-compose-run.yaml up --build --remove-orphans 
```
+ Encerrando a execução
```sh
docker-compose -f docker-compose-run.yaml down --remove-orphans   
```
#### 2ª Opção
É necessário baixar o projeto local e executar o arquivo `docker-compose-build.yaml`. Este arquivo criar uma imagem local do projeto e disponibilizando os serviços nas portas: `80/tcp`para o Front-End e `8090/tcp`para o Back-End
+ Arquivo
```yaml
# docker-compose-build.yaml
version: '3.9'
services:
  back:
    build: 
      context: ./back
      dockerfile: Dockerfile
    image: leltondev/back-minefield:1.0.1
    ports:
      - "8090:8090"
    networks:
      - net-automato
  
  front:
    build: 
      context: ./front
      dockerfile: Dockerfile
    image: leltondev/front-minefield:1.0.1
    ports:
      - "80:80"
    networks:
      - net-automato
networks:
  net-automato:
    driver: bridge

```
+ Execução para criar a imagem e disponibilizar o projeto
```sh
docker-compose -f docker-compose-build.yaml up --build --remove-orphans 
```
+ Encerrando a execução
```sh
docker-compose -f docker-compose-build.yaml down --remove-orphans   
```
# Autômato
## Automato Celulares
Automatos celulares é modelo discreto de computação estudado na teoria dos
autômatos. Estes se encontram em várias áreas, incluindo Biologia Teórica,
chamada também de Biomatemática, é um círculo de indagação interdisciplinar
focado na modelação dos processos biológicos empregando técnicas matemáticas,
envolvendo em um todo matemática e computação.

Autômatos celulares são sistemas computacionais dinâmicos, totalmente discretos
(estados, espaço e tempo) e distribuídos espacialmente, contendo componentes
simples e idênticos e interações locais que geram comportamentos globais. Os
autômatos celulares foram propostos originalmente por **Von Neumann** e **Ulam**
como uma possível idealização de sistemas biológicos, com a proposta de modelar
a auto-reprodução biológica \[Wolfram 1983\].

Um autômato celular (AC) é definido por seu espaço celular e sua regra de
transição. O espaço celular é composto por um reticulado de N células idênticas
dispostas em um arranjo d-dimensional, cada um com um padrão idêntico de
conexões locais entre as células e com condições de contorno definidas. A regra de
transição fornece o estado da célula no próximo passo de tempo baseado na
configuração da vizinhança atual. Todas as células do reticulado são atualizadas de
acordo com esta regra \[Oliveira 2003\].

O exemplo mais conhecido de autômato celular bidimensional é o chamado Game
of Life. O modelo foi proposto por John Conway em 1970 e foi primeiramente
publicado em \[Gardner 1970\]. Consiste em um autômato celular bidimensional, de
raio 1 e com vizinhança de Moore
## Caça ao tesouro - Campo Minado
O jogo  é uma abordagem para o estudo de autômatos na Ciência da Computação, com o objetivo de percorrer um grid(Campo)  X , onde  representa a quantidade de linhas e colunas. Linguagem de programação utilizadas: Angular V17+ e Rust Lang V1.78.0 e Linux(Fedora 37), o ilustrativo acessível  foi desenvolvido em Angular e as regras e cálculos em Rust Lang.

## Definições 
- grid(campo) é o tabuleiro
- Os elementos do grid são células: Livres, Dicas, Minas, Bloqueios e Tesouro;
- Livres($l$): Representa a maior parte das células, disponibilizando caminho até o tesouro.
- Dicas($d$): Oferecem a possibilidade do jogar rever o próximo vizinho sem quaisquer tipo de banimento, se uma dica já foi revelada, não é possível reutiliza-la;
- Minas($a$): Representam perigos que devem ser evitados, uma transição para uma celular desta recebe dando ou fim de jogo sem atingir o objetivo;
- Bloqueios($b$): Impedem a transação “movimentar” para certas células;
- Tesouro($t$): Significa fim de jogo com o objetivo atingido
- As transações são feitas para todas as suas vizinhas, mesmo que seja, para um vizinho já revelado
- Uma célula revelada está em seu estado final, não é possível revertê-la.
## Configurações
- Por padrão o jogo tem um $\text{grid}\:=\: 5$, ou seja, um grid $5X5$, que corresponde ao menor grid, sua definição em função é: $x \in \mathbb{N} \rightarrow x >= 5$;
- O conteúdo da célula se dar pela função:  $x \in \mathbb{N} \rightarrow x = (\pi * \beta) \: mod \: 4$, onde $\beta$ é o nanosegundo atual.
	- Logo, se $c = 0$, então o tipo de célula será  Mina($m$)
	- $c = 1$, então o tipo da célula é Bloqueio($b$)
	- $c = 2$, então o tipo da célula é Dica($d$)
	- $c= 3$, então o tipo da célula é Tesouro($t$)
- A posição das células $m$, $d$, $b$ é definida a partir das funções 
	- Para as linhas, está definida:  $x \in ℕ \rightarrow x = (\pi * \beta)\: mod \: \eta$, onde representa a quantidade de linhas, presente nas configurações
	- Para as colunas, está definida:  $y \in ℕ \rightarrow y = (\pi * \beta)\: mod \: \eta$,onde representa a quantidade de colunas, presente nas configurações
- A posição inicial é definida a partir de uma posição pré definida: $start = (\eta -1 , 0)$
- Sua movimentação se dar aplicando o conceito de vizinhança: $2r(r+1)+1$
- Dicas($d$), Minas($m$) e Bloqueios($b$) é pré configurado com 3 células para cada tipo, de modo que, a soma dos mesmos não ultrapassa 36% do tamanho do grid: 
	$$x \in \mathbb{N} \rightarrow\left\{ \begin{array}{ll} x= \frac{(d+m+b)\: * 100}{\eta^2} \\ \ x \leq 36\% \: \text{de} \: \eta^2  \end{array} \right.$$
- Só há um célula com o tesouro;
- É possível ajustar a quantidade dicas, minas, bloqueios
## Regras de transição 
Para o projeto, consiste em um autômato celular bidimensional, de raio 1 e com vizinhança de Von Neumann. Esse AC possui dois estados: **revelada(1)** ou **não revelada(0)**. As células podem ser de quatro tipos diferentes: *LIVRE*, *DICA*, *BLOQUEIO* e *MINA*. As regras de transição são as seguintes para as transições entre células:
- Transição para uma célula *LIVRE*: A célula é revelada, realiza e válida a transição. Não possui nem um impedimento ou recompensa para a posição.
- Transição para uma célula *DICA*: A célula é revelada, realiza e válida a transição. Contém uma recompensa para a posição de transição, isso, permite que possa revelar uma posição vizinha conforme o princípio de vizinhança, sem perder o jogo, mesmo que vá revelar uma vizinhança que é uma célula tipo Mina($m$)
- Transição para uma célula *BLOQUEIO*: A célula é revelada, realiza e válida a transição. Possui um impedimento de não permanecer Na célula, realizando uma transição de retorno.
- Transição para uma célula *MINA*:  A célula é revelada, realiza e válida a transição. A célula determina o fim do jogo.

O planejamento do caminho é armazenado em uma estrutura em árvore, permitindo transacionar entre vizinhos já revelados, de modo que, no fim do processo, é possível exibir todos os caminhos percorridos.
