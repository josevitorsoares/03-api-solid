# App

DinoGymPass style app.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar.
- [ ] Deve ser possível se autenticar.
- [ ] Deve ser possível obert o perfil de um usuário logado.
- [ ] Deve ser possível obter o número de check-ins realizado pelo usuário.
- [ ] Deve ser possível o usuário ober seu histórico de check-ins.
- [ ] Deve ser possível o usuário buscar academias próximas.
- [ ] Deve ser possível o usuário buscar academias pelo nome.
- [ ] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.
- [ ] Deve ser possível cadastrar uma academia.

## RNs (Regras de Negócio)

- [ ] O usuário não deve poder se cadastar com o email duplicado.
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia.
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- [ ] O check-in só pode ser validado até 20 minutos após criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.

## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuário precisa estar criptografada.
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL.
- [ ] Todas as listas de dados devem estar paginadas em até 20 itens por página.
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token).
