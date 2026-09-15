```markdown
# 📋 Sistema de Cadastro de Clientes

Aplicação web desenvolvida em **Angular** com **Angular Material** e integração com a **BrasilAPI** para cadastro e gerenciamento de clientes, apresentando validações de formulário, máscaras de entrada de dados e consumo de APIs externas.

---

## 📸 Demonstração e Telas

### 🟢 Tela de Cadastro
Formulário dinâmico com suporte a máscaras de CPF e Data de Nascimento, além de carregamento dinâmico de UFs e Municípios via BrasilAPI.

![Tela de Cadastro](/cadastro.png)

### 🔵 Tela de Consulta
Listagem e busca de clientes cadastrados no sistema.

![Tela de Consulta](/consulta.png)

---

## 🚀 Tecnologias Utilizadas

- **Angular** (Componentes Standalone & Control Flow Syntax)
- **Angular Material** (Card, Form Fields, Select, SnackBar, Buttons, Icons)
- **Flex Layout Module** (Layouts responsivos)
- **ngx-mask** (Máscaras de CPF e Data)
- **BrasilAPI** (Integração para carregamento de UFs e Municípios do IBGE)
- **UUID** (Geração de IDs únicos)

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Angular CLI** instalado globalmente (`npm install -g @angular/cli`)

### Passos para instalação

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
   cd seu-repositorio

```

2. **Instalar as dependências:**
```bash
npm install

```


3. **Executar a aplicação:**
```bash
ng serve

```


4. **Acessar no navegador:**
Abra [http://localhost:4200](http://localhost:4200) para visualizar a aplicação.

---

## 🌐 Consumo da BrasilAPI

A aplicação consome a [BrasilAPI](https://brasilapi.com.br/) para popular dinamicamente os seletores de localização:

* **UFs:** `GET /api/ibge/uf/v1`
* **Municípios:** `GET /api/ibge/municipios/v1/{uf}`

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizar e modificar!

```

---

💡 **Dica para o GitHub:** Certifique-se de que os arquivos `cadastro.png` e `consulta.png` foram commitados no repositório (`git add cadastro.png consulta.png` e depois `git commit -m "docs: adiciona prints no README"`), caso contrário as imagens ficarão quebradas na visualização do GitHub.

<FollowUp label="Quer adicionar instruções de como fazer o build ou o deploy do projeto?" query="Como posso adicionar instruções de build de produção e deploy no README?"/>

```