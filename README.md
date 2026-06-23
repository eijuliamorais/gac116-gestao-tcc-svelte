# Sistema de Gestão de TCCs

Projeto desenvolvido para a disciplina **GAC116 - Programação Web** utilizando **Svelte** como tecnologia frontend e consumindo uma API REST desenvolvida em **Django REST Framework**.

O sistema tem como objetivo realizar o gerenciamento completo dos Trabalhos de Conclusão de Curso (TCCs), permitindo a administração de alunos, professores, cursos, departamentos, unidades acadêmicas e trabalhos de conclusão.

---

# Integrantes

- Julia Aparecida de Faria Morais
- Luiz Francisco de Jesus

---

# Tecnologias Utilizadas

## Frontend

- Svelte
- JavaScript (ES6+)
- Tailwind CSS
- Axios
- Chart.js

## Backend

- Python
- Django
- Django REST Framework

## Ferramentas

- Git
- GitHub
- Visual Studio Code
- Node.js
- NPM

---

# Arquitetura do Projeto

O frontend foi desenvolvido utilizando a arquitetura baseada em componentes do Svelte.

```text
src/
│
├── components/
│   ├── dashboard/
│   │   ├── StatCard.svelte
│   │   ├── StatusChart.svelte
│   │   └── OrientadorChart.svelte
│   │
│   ├── layout/
│   │   ├── Header.svelte
│   │   └── Sidebar.svelte
│   │
│   └── modals/
│       ├── AlunoModal.svelte
│       ├── ProfessorModal.svelte
│       ├── CursoModal.svelte
│       └── TccModal.svelte
│
├── pages/
│   ├── Dashboard.svelte
│   ├── Alunos.svelte
│   ├── Professores.svelte
│   ├── Cursos.svelte
│   ├── Departamentos.svelte
│   ├── Unidades.svelte
│   └── Tccs.svelte
│
├── services/
│   ├── api.js
│   ├── alunoService.js
│   ├── professorService.js
│   ├── cursoService.js
│   ├── departamentoService.js
│   ├── unidadeService.js
│   ├── tccService.js
│   └── dashboardService.js
│
├── stores/
│   └── navigation.js
│
├── App.svelte
└── app.css
```

---

# Funcionalidades Implementadas

## Dashboard

Painel inicial contendo estatísticas gerais do sistema.

### Indicadores

- Total de TCCs cadastrados
- TCCs aprovados
- TCCs enviados
- TCCs em elaboração

### Gráficos

- Distribuição de TCCs por status
- Quantidade de orientações por professor

### Resumo Geral

- Total de trabalhos
- Quantidade de orientadores ativos
- Quantidade de status cadastrados

---

# Módulo de Alunos

CRUD completo de alunos.

### Funcionalidades

- Listagem de alunos
- Pesquisa por nome
- Cadastro de novos alunos
- Edição de alunos existentes
- Exclusão de alunos
- Associação com curso

### Dados

- Nome
- Matrícula
- Curso

---

# Módulo de Professores

CRUD completo de professores.

### Funcionalidades

- Listagem de professores
- Pesquisa por nome
- Cadastro
- Edição
- Exclusão
- Associação com departamento

### Dados

- Nome
- Departamento

---

# Módulo de Cursos

CRUD completo de cursos.

### Funcionalidades

- Listagem
- Cadastro
- Edição
- Exclusão
- Pesquisa

### Dados

- Nome
- Sigla
- Código

---

# Módulo de Departamentos

Gerenciamento de departamentos acadêmicos.

### Dados

- Nome
- Unidade Acadêmica

---

# Módulo de Unidades Acadêmicas

Gerenciamento das unidades institucionais.

### Dados

- Nome
- Sigla

---

# Módulo de TCCs

CRUD completo dos trabalhos de conclusão de curso.

### Funcionalidades

- Cadastro
- Edição
- Exclusão
- Pesquisa
- Visualização

### Dados Gerenciados

- Título
- Resumo
- Palavras-chave
- Tipo do trabalho
- Idioma
- Status
- Semestre letivo de defesa
- Aluno
- Orientador
- Coorientador
- Presidente da banca
- Primeiro membro
- Segundo membro

---

# Integração com API

A comunicação com o backend é realizada através do Axios.

Exemplo:

```javascript
import api from "./api";

export async function listarProfessores() {
  const response = await api.get("/professores/");
  return response.data;
}
```

Configuração da API:

```javascript
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api"
});
```

---

# Rotas Disponíveis na API

O backend disponibiliza os seguintes endpoints:

| Recurso | Endpoint |
|----------|-----------|
| Unidades Acadêmicas | `/api/unidades-academicas/` |
| Departamentos | `/api/departamentos/` |
| Cursos | `/api/cursos/` |
| Alunos | `/api/alunos/` |
| Professores | `/api/professores/` |
| TCCs | `/api/tccs/` |

---

# Padrão Visual Utilizado

O sistema segue uma identidade visual baseada na paleta Slate do Tailwind.

### Tipografia

| Uso | Classe |
|------|---------|
| Título principal | `text-slate-900` |
| Subtítulo | `text-slate-700` |
| Texto comum | `text-slate-800` |
| Texto secundário | `text-slate-600` |

### Componentes

- Cards com bordas arredondadas
- Modais reutilizáveis
- Sidebar fixa
- Header dinâmico
- Tabelas responsivas
- Gráficos interativos

---

# Instalação

## Backend

Clone o projeto:

```bash
git clone <repositorio-backend>
```

Crie ambiente virtual:

```bash
python -m venv venv
```

Ative:

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

Instale dependências:

```bash
pip install -r requirements.txt
```

Execute migrações:

```bash
python manage.py migrate
```

Inicie servidor:

```bash
python manage.py runserver
```

Servidor disponível em:

```text
http://localhost:8000
```

---

## Frontend

Acesse a pasta:

```bash
cd frontend
```

Instale dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Servidor disponível em:

```text
http://localhost:5173
```

---

# Como Executar

É necessário iniciar os dois projetos simultaneamente.

### Terminal 1

Backend:

```bash
python manage.py runserver
```

### Terminal 2

Frontend:

```bash
npm run dev
```

---

# Trabalho Acadêmico

Disciplina:

**GAC116 - Programação Web**

Professor:

**Departamento de Ciência da Computação - UFLA**

Trabalho:

**Implementação de Tecnologia Livre para Frontend**

Objetivo:

Desenvolver uma aplicação frontend moderna utilizando uma tecnologia diferente do backend fornecido, consumindo os recursos de uma API REST já implementada.

Tecnologia escolhida pelo grupo:

**Svelte**

---

# Funcionalidades Extras Implementadas

- Dashboard com gráficos Chart.js
- Componentização completa
- CRUDs independentes por módulo
- Consumo de API REST
- Interface responsiva
- Modais reutilizáveis
- Busca dinâmica em tabelas
- Organização por Services
- Gerenciamento de estado utilizando Stores do Svelte

---

# Resultado

O sistema permite o gerenciamento completo do fluxo acadêmico de TCCs através de uma interface moderna desenvolvida em Svelte consumindo uma API REST em Django, atendendo aos requisitos propostos no Trabalho Prático de Programação Web.