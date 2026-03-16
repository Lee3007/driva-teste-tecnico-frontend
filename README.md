# Plataforma de Inteligencia de Mercado

> Dashboard interativo para analise de oportunidades de expansao no varejo brasileiro.

## Links
- **Aplicacao:** https://driva-teste-tecnico-frontend-app.onrender.com/
- **API:** https://driva-teste-tecnico-frontend-api.onrender.com/api
- **Video:** [URL_VIDEO]

## Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                     Docker Compose                            │
│  ┌─────────────────┐       ┌────────────────────────────┐   │
│  │  Frontend        │ :3000 │  Backend (API)             │   │
│  │  React Router    │◄─────►│  Controllers (HTTP)        │   │
│  │  Pages + Features│  /api │    → Services (logica)     │   │
│  │  Deck.gl + Map   │       │      → Repositories        │   │
│  │  Zustand         │       │  Fastify + TypeScript      │   │
│  └─────────────────┘       └────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Arquitetura do Frontend

O frontend usa arquitetura **feature-first** com React Router para navegacao:

```
frontend/src/
├── pages/           # Paginas (rotas) da aplicacao
├── features/        # Modulos por dominio (map, sidebar, search, state-panel)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       └── store/
├── shared/          # Codigo compartilhado entre features
│   ├── api/         # Cliente HTTP (axios)
│   ├── hooks/       # Hooks globais (useApiData, useFilteredData)
│   ├── store/       # Stores globais (filterStore)
│   └── utils/       # Formatadores, mapeamentos, constantes
└── components/      # Componentes de layout reutilizaveis
```

| Conceito | Descricao |
|----------|----------|
| **Pages** | Componentes de rota, uma page por URL |
| **Features** | Modulos auto-contidos por dominio funcional |
| **Shared** | Infraestrutura e utilidades usadas por 2+ features |

### Arquitetura do Backend

O backend segue uma arquitetura em camadas:

| Camada | Responsabilidade | Exemplo |
|--------|-----------------|---------|
| **Controller** | Recebe requisicoes HTTP, extrai parametros, retorna respostas | `state.controller.ts` |
| **Service** | Logica de negocio, filtragem e agregacao de dados | `store.service.ts` |
| **Repository** | Acesso e abstracao da fonte de dados | `state.repository.ts` |

```
backend/src/
├── controllers/     # Rotas HTTP (Fastify plugins)
├── services/        # Regras de negocio e filtragem
├── repositories/    # Acesso aos dados
└── data/            # Dados mockados (fonte de dados)
```

### Stack
| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript + Vite + React Router |
| Mapa | Deck.gl + MapLibre GL JS |
| State Management | Zustand |
| Graficos | Recharts |
| Backend | Node.js + Fastify + TypeScript (Controller/Service/Repository) |
| Package Manager | pnpm (workspaces) |
| Containerizacao | Docker Compose |
| API Testing | Bruno |
| Deploy | Render.com |

## Como Executar

### Pre-requisitos
- Docker e Docker Compose instalados
- OU Node.js 18+ e pnpm 9+

### Com Docker (recomendado)
```bash
git clone https://github.com/Lee3007/driva-teste-tecnico-frontend.git
cd driva-teste-tecnico-frontend
docker compose up --build
# Acesse http://localhost:3000
```

### Sem Docker (desenvolvimento)
```bash
git clone https://github.com/Lee3007/driva-teste-tecnico-frontend.git
cd driva-teste-tecnico-frontend
pnpm install
pnpm dev    # Roda frontend e backend em paralelo
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
```

## API (Bruno)

O diretorio `bruno/` contem uma colecao [Bruno](https://www.usebruno.com/) com requests para todos os endpoints da API. Para usar, abra o Bruno e importe a pasta `bruno/`.

| Request | Endpoint |
|---------|----------|
| Health | `GET /api/health` |
| Get States | `GET /api/states` |
| Get State by Code | `GET /api/states/:code` |
| Get Stores | `GET /api/stores` |
| Get Competitors | `GET /api/competitors` |
| Get Demand | `GET /api/demand` |
| Get Expansion Zones | `GET /api/expansion-zones` |
| Get Summary | `GET /api/summary` |

A variavel `BASE_URL` esta configurada na colecao e aponta para o deploy em producao.

## Camadas de Dados

| Camada | Tipo Visual | Descricao |
|--------|-----------|-----------|
| Filiais Ativas | Pontos azuis | Localizacao das 45 lojas em operacao |
| Potencial de Mercado | Heatmap por estado | Coloracao verde→vermelho baseada em PIB, populacao e renda |
| Demanda Estimada | Bolhas proporcionais | Circulos cujo tamanho representa volume de demanda por estado |
| Zonas de Expansao | Estados destacados | Areas com alto potencial e sem presenca, marcadas por prioridade |
| Concorrencia | Pontos vermelhos | Localizacao de 30 concorrentes de 5 redes diferentes |

## Decisoes Tecnicas

### Por que React + TypeScript?
React e a tecnologia com a qual tenho mais experiencia e dominio. Combinado com TypeScript, oferece type-safety em todo o projeto, autocomplete robusto e deteccao de erros em tempo de desenvolvimento. Ambos sao padroes consolidados do mercado atual.

### Por que Vite?
Moderno, funcional e principalmente bem mais rapido que seu antecessor Webpack.

### Por que arquitetura Feature-First?
A organizacao por tipo (`components/`, `hooks/`, `store/`) nao escala: ao adicionar uma feature nova, voce espalha arquivos por varios diretorios. Com feature-first, cada dominio funcional (map, sidebar, search, state-panel) e auto-contido. Para adicionar uma feature como "relatorios", basta criar `features/reports/` — sem tocar nos demais diretorios.

### Por que pnpm Workspaces?
Monorepo com pnpm permite compartilhar tipos TypeScript entre frontend e backend via pacote `@market/shared`, garantindo type-safety end-to-end. pnpm usa hard links e content-addressable storage (modulos globais compartilhados), resultando em instalacao mais rapida e menor uso de disco comparado a npm/yarn.

### Por que Controller/Service/Repository no backend?
Separacao clara de responsabilidades: Controllers lidam com HTTP, Services contem logica de negocio, Repositories abstraem o acesso a dados. Essa estrutura facilita a manutencao e permite trocar a fonte de dados (ex: migrar de dados mockados para um banco) alterando apenas os Repositories, sem impacto nas demais camadas.

### Por que Fastify e nao NestJS?
Para uma API com 6 endpoints e dados mockados, NestJS traria excesso de boilerplate (modules, decorators, DI container). Fastify e mais leve, mais performatico que Express e tem excelente integracao com TypeScript — ideal para APIs simples e diretas.

### Por que Deck.gl + MapLibre GL?
Deck.gl oferece renderizacao WebGL para multiplas camadas simultaneas sem perda de performance, com suporte nativo a heatmaps, scatterplots e GeoJSON em escala. MapLibre GL e a base de tiles: open-source, sem necessidade de API key (tiles gratuitos via CARTO), e compatibilidade direta com Deck.gl. Leaflet nao suporta WebGL nativamente, e Mapbox exige API key paga.

### Por que Zustand?
Alternativa leve ao Redux e Context API. Redux exige muito boilerplate (actions, reducers, selectors). Context API causa re-renders desnecessarios em arvores grandes. Zustand resolve ambos: API minima, sem providers, sem boilerplate, otimizado para re-renders seletivos, e TypeScript-friendly nativamente.

### Por que Recharts?
Biblioteca de graficos baseada em componentes React, declarativa e facil de customizar. Alternativas como Chart.js ou D3 exigem manipulacao direta do DOM ou refs, quebrando o paradigma declarativo do React. Recharts se integra naturalmente com o restante do projeto.

### Por que Bruno?
Bruno e um cliente de API open-source que armazena as colecoes como arquivos YAML no repositorio (git-friendly). Diferente do Postman, nao exige conta na nuvem e as colecoes versionam junto com o codigo, facilitando colaboracao.

### Por que Render.com?
Deploy simples com integracao direta ao GitHub, suporte a static sites e web services no mesmo lugar, e tier gratuito suficiente para demonstracao. Alternativas como Vercel nao suportam backend Node.js facilmente no mesmo projeto, e AWS/GCP adicionariam complexidade desnecessaria para um teste tecnico.

### Trade-offs
- **Filtragem client-side:** toda a filtragem (regiao, periodo) ocorre no frontend via `useMemo`, dando resposta instantanea sem round-trips de rede. O trade-off e que todos os dados sao carregados na memoria — funciona bem para ~60 lojas, mas nao escalaria para milhares sem paginacao server-side.
- **GeoJSON via CDN:** optei por carregar o GeoJSON dos estados via CDN do GitHub em vez de embutir no bundle. Isso reduz o tamanho do bundle, mas cria dependencia de rede externa — se o CDN cair, o mapa nao renderiza.
- **Backend com tsx em producao:** o backend roda TypeScript diretamente via `tsx` sem etapa de compilacao. Isso simplifica o pipeline de deploy (sem build artifacts), mas adiciona overhead de transpilacao em runtime a cada startup do container.
- **Sem testes automatizados:** priorizei velocidade de desenvolvimento e cobertura funcional. O trade-off e a ausencia de protecao contra regressoes — refatoracoes dependem de testes manuais.
- **CORS aberto (`origin: "*"`):** simplifica o desenvolvimento e deploy em ambientes diferentes (local, staging, producao). Em um cenario real, seria restrito aos dominios autorizados.

## Responsividade
A aplicacao e totalmente responsiva, adaptando layout e interacoes para desktop, tablet e mobile.

## Possiveis Melhorias
- Integracao com dados reais
- Clustering de marcadores em zoom alto
- Testes E2E com Playwright
- CI/CD com GitHub Actions
- PWA para uso offline
- Adicionar métricas com posthog
