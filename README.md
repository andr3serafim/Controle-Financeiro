# Projeto com Estrutura para ReactJs apps

## Estrutura de pastas

`assets`: Serve para armazenar imagens (imagens leves, se forem pesadas sempre prefira hospedar em uma CDN), ícones, etc.

`components`: Componentes reutilizáveis da app. Componentes que são unidades para sua app, um button, um dropdown, um modal, etc.

`hooks`: São funções que tem estado. Essa pasta é usada para armazenar hooks que são genéricos, tem interação com hooks do react(useState, usEffect) e normalmente reutilizáveis e qualquer projeto, exemplos: useScreenSize, useLocalStorage, useSession, useUserActive...

`pages`: As pages são as páginas que usam vários componentes. É essa a página que o usuário vai ver.

`services`: Aqui ficam as configurações de HTTP clients, normalmente utilizando Axios.

`store`: Ficam as definições de state managers, context api, zustand, redux...

`types`: Armazenam as tipagens de typescript (types e interfaces) que são comuns em várias áreas do projeto.

`util`: Funções utilitárias como formatCurrency, formatPhone, convertTimeZone, parsePhone. (Js puro)

## A aplicação simula uma loja de carros