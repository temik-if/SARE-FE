
# Visão Geral do Projeto

## Nome do Projeto: SARE

### Objetivo
O projeto visa criar um sistema de agendamento online para facilitar o uso e a gestão eficiente dos recursos escolares (notebooks, projetores, salas, etc.). Seus objetivos incluem:
- Centralizar agendamentos.
- Aumentar a transparência sobre a disponibilidade de recursos.
- Evitar conflitos de horários.
- Controlar devoluções de recursos.
- Aprimorar a comunicação com notificações.

---

## Tecnologias Utilizadas

### Frontend (Client-side)
- **Framework**: Next.js + TypeScript.
- **Bundler**: Webpack.
- **Estilos**: CSS puro, com possibilidade de uso de componentes prontos do Bootstrap ou Tailwind CSS (importar antes para evitar conflitos no layout).
- **Autenticação**: JWT (JSON Web Tokens) + OAuth.
- **Gerenciamento de Estado**: Context API.

---

## Estrutura de Pastas do Frontend

```plaintext
/SARE-FE
│
├── /src                # Código-fonte da aplicação React
|   ├── /app            # 
│   ├── /components     # Componentes reutilizáveis (ex.: botão)
│   ├── /pages          # Páginas da aplicação (ex.: Login, Dashboard)
│   ├── /context        # Arquivos Context API
│   ├── /assets         # Imagens, ícones, fontes
│   ├── /services       # Funções para interagir com a API
│   └── /utils          # Funções auxiliares no frontend
│
├── /public             # Arquivos estáticos
├── .env                # Variáveis de ambiente
├── package.json        # Dependências do frontend
├── webpack.config.js   # Arquivo de configuração do Webpack
└── Dockerfile          # Arquivo para construir a imagem Docker do frontend
```

---

## Boas Práticas de Organização de Projetos e Codificação

### Estrutura Geral de Diretórios
- **src/**: Contém o código-fonte principal do projeto.
- **tests/**: Arquivos para testes automatizados.
- **docs/**: Documentação e outros arquivos auxiliares.

### Organização por Componentes
- **components/**: Componentes reutilizáveis, organizados por pasta.
- **pages/**: Arquivos relacionados a páginas específicas.
- **styles/**: Arquivos de estilo compartilhados, como variáveis e mixins.

---

## Convenções de Nomenclatura

### Padrões Recomendados
1. **Arquivos**:
   - Use `kebab-case` para arquivos CSS e HTML (ex.: `about-page.css`).
   - Use `CamelCase` ou `PascalCase` para arquivos JavaScript que contenham classes ou componentes (ex.: `App.js`, `ButtonComponent.js`).

2. **Pastas**:
   - Utilize `kebab-case` para nomes de pastas (ex.: `components`, `navbar`).

3. **Classes e Métodos**:
   - Classes: `CamelCase` (ex.: `UserController`).
   - Métodos e variáveis: `camelCase` (ex.: `getUserData`).

4. **Constantes**:
   - Use `UPPER_CASE` para constantes (ex.: `API_BASE_URL`).

---

## Estilo de Codificação

1. **Ponto e Vírgula**:
   - Sempre inclua `;` no final das linhas para evitar ambiguidades no JavaScript:
     ```javascript
     const message = "Hello, World!";
     ```

2. **Comentários**:
   - Comente apenas quando necessário, explicando o *porquê* do código, não o *como*:
     ```javascript
     // Calcula o total com base no desconto aplicado
     const total = subtotal - (subtotal * discount);
     ```

3. **Formatadores de Código**:
   - Utilize ferramentas como [Prettier](https://prettier.io) ou [ESLint](https://eslint.org) para garantir um código limpo e padronizado.

---

## Exemplos Práticos

### Configuração de um Componente Reutilizável
```javascript
// src/components/Button/Button.js
import './Button.css';

export default function Button({ label, onClick }) {
  return <button className="button" onClick={onClick}>{label}</button>;
}
```

### Variáveis Globais de Estilo
```scss
// src/styles/variables.scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: 'Roboto', sans-serif;
```
