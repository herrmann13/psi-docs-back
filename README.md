# Psi-Docs Backend

> API para gerenciamento clínico de psicólogos.

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)

---

## 📖 Sobre o Projeto

**Psi-Docs Backend** é a API responsável pelo armazenamento e gerenciamento seguro de dados de pacientes, sessões e registros clínicos. Fornece endpoints REST para integração com o front-end, garantindo dados estruturados e controle de acesso.

O backend é desenvolvido com **Node.js**, **Express** e **SQLite**, priorizando simplicidade, leveza e facilidade de deploy.

---

### Funcionalidades Principais

- [ ] **CRUD de Pacientes:** Criação, leitura, atualização e exclusão de registros de pacientes.  
- [ ] **Agenda de Sessões:** CRUD de atendimentos com status e valores.  
- [ ] **Cobranças e Pagamentos:** Registro de cobranças, pagamentos e anexos de comprovantes.  
- [ ] **Autenticação e Autorização:** Controle de acesso para psicólogos e administradores.  
- [ ] **Integração com Front-end:** Endpoints REST prontos para consumo pela aplicação web.

---

## Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** - Plataforma para execução do backend.  
- **[Express](https://expressjs.com/)** - Framework minimalista para criação de APIs REST.  
- **[SQLite](https://www.sqlite.org/)** - Banco de dados leve e fácil de configurar.  
- **[Zod](https://zod.dev/)** - Validação de dados em runtime.  

---

## Endpoints

Rotas de pacientes, usuarios, enderecos e contatos de emergencia exigem `Authorization: Bearer <token>`.
Usuarios sao autenticados via Google e recebem um JWT interno no login; o campo `password` nao e usado no momento.
As rotas novas de agenda e financeiro estao sem autenticacao por enquanto.

## Documentacao

Swagger disponivel em `GET /docs`.

## Autenticacao

Login via Google:
- `POST /auth/google` com `{ "idToken": "..." }`
- Resposta: `{ token, user }`

Use o `token` retornado em `Authorization: Bearer <token>`.

### Padrão de leitura (GET)

- `GET /patients` lista todos
- `GET /patients?id=1` busca por id

O mesmo padrão se aplica para:
- `GET /users`
- `GET /addresses`
- `GET /emergency-contacts`
- `GET /appointments`
- `GET /charges`
- `GET /payments`
- `GET /payment-charges`
- `GET /payment-attachments`

### CRUD básico

- `POST /patients`
- `PUT /patients/:id`
- `DELETE /patients/:id`

- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

- `POST /addresses`
- `PUT /addresses/:id`
- `DELETE /addresses/:id`

- `POST /emergency-contacts`
- `PUT /emergency-contacts/:id`
- `DELETE /emergency-contacts/:id`

- `POST /appointments`
- `PUT /appointments/:id`
- `DELETE /appointments/:id`

- `POST /charges`
- `PUT /charges/:id`
- `DELETE /charges/:id`

- `POST /payments`
- `PUT /payments/:id`
- `DELETE /payments/:id`

- `POST /payment-charges`
- `PUT /payment-charges/:id`
- `DELETE /payment-charges/:id`

- `POST /payment-attachments`
- `PUT /payment-attachments/:id`
- `DELETE /payment-attachments/:id`
