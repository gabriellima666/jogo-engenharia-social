# Jogo de Engenharia Social & OSINT (Open Source Intelligence)

Este é um jogo educativo interativo e dinâmico, desenvolvido com **React 19**, **Vite** e **Tailwind CSS v4**. O objetivo principal do jogo é ensinar conceitos práticos de segurança da informação, conscientização de senhas e engenharia social.

A simulação simula uma estação de trabalho hacker de elite ("Red Team") com interface de comando retro cyberpunk, scanlines CRT, beeps sintetizados e um terminal interativo.

---

## 🎮 Conceito do Jogo

Os jogadores assumem o papel de agentes de segurança realizando testes de intrusão éticos. Para acessar as contas bancárias simuladas dos alvos, eles devem analisar **dossiês contendo rastros digitais públicos** (posts em redes sociais como Twitter, Instagram, perfis profissionais, blogs, etc.) deixados pelas vítimas. 

Com base nessas informações públicas (**OSINT**), os jogadores devem deduzir as senhas correspondentes.

---

## 🛠️ Recursos e Mecânicas Implementadas

1. **Tela Inicial de Boot (Red Team Workstation)**:
   - Uma tela de carregamento que simula o boot de um sistema hacker, inicializando logs, túneis de proxies e conexão segura com o banco de dados.

2. **Dossiês com Efeito Typewriter**:
   - Os dados interceptados de cada alvo são digitados na tela caractere por caractere com efeitos sonoros de digitação em tempo real.

3. **Sistema de Dicas Temporizadas (Time-Locked Hints)**:
   - Para incentivar o esforço de dedução inicial, as pistas operacionais são trancadas.
   - **0 a 60 segundos**: Nenhuma dica disponível (botão de dicas desabilitado com ícone de cadeado e contagem regressiva).
   - **Após 1 minuto**: A primeira dica de OSINT é liberada.
   - **Após 2 minutos**: A segunda dica de OSINT é liberada.
   - Um contador dinâmico exibe os segundos restantes para a liberação da próxima pista.

4. **Bloqueador de 2FA (Pedagogical Twist - Fase 10)**:
   - Na última fase (Beatriz Silva), o jogador deduz a senha correta (`Chernobyl1986`). 
   - Ao invadir, a tela de acesso concedido é substituída por uma tela vermelha de **"Invasão Impedida - Múltiplo Fator de Autenticação (2FA) Ativo"**.
   - O jogo só pode ser concluído ao clicar no botão manual **"Gerar Relatório e Finalizar"**, dando tempo ilimitado para o professor ou palestrante explicar a importância do 2FA.

5. **Sons Sintetizados (Web Audio API)**:
   - Efeitos sonoros retro gerados dinamicamente via sintetizadores nativos do navegador (sem necessidade de arquivos MP3/WAV pesados):
     - Cliques curtos durante a digitação automática de dossiês.
     - Sons de buzzer grave duplo ao errar a senha.
     - Sons de acordes harmônicos crescentes ao acertar a autenticação.

6. **Design Visual Premium & Grid Retro**:
   - Layout responsivo com efeitos de brilho ciano e verde, scanlines interativas, efeito de vidro fosco (glassmorphism) e fonte monoespaçada.
   - Menu superior fixo com indicador visual de progresso e controle de som integrado (Mutar/Desmutar).
   - Layout de camadas com z-index ajustado (`z-50`) para que o menu nunca seja coberto ao rolar a página.

---

## 📊 Tabela de Alvos e OSINT

O jogo possui **10 fases** progressivas com lógicas de senhas variadas:

| Fase | Alvo | Resumo da Pista OSINT | Senha Esperada |
| :---: | :--- | :--- | :--- |
| **1** | Marcos Silva | Libertadores de 1999 + Time do coração | `Palmeiras1999` |
| **2** | Sandra Regina | Cachorra Golden Retriever chamada Luna | `LunaGolden` |
| **3** | Roberto Santos | Banda favorita de metal + Ano de lançamento de "Black Album" | `Metallica1991` |
| **4** | Mariana Costa | Viagem favorita (Paris) + Ano da viagem | `Paris2023` |
| **5** | Felipe Almeida | Time (Cruzeiro) + Fundação em 1921 | `Cruzeiro1921` |
| **6** | Letícia Oliveira | Hobby (Fotografia) + Número favorito | `Fotografia8` |
| **7** | Gustavo Lima | Comida preferida (Sushi) + País de origem | `SushiJapao` |
| **8** | Camila Ribeiro | Prática diária (Yoga) + Saudação | `YogaNamaste` |
| **9** | Rodrigo Souza | Time (Flamengo) + Título histórico do mundial | `Flamengo1981` |
| **10** | Beatriz Silva | Desastre ecológico de Chernobyl + Ano | `Chernobyl1986` (Bloqueada por 2FA) |

---

## 🛡️ Conclusões Educacionais (Dashboard Final)

Ao finalizar o jogo, o dashboard exibe estatísticas:
* **Alvos Invadidos**: 9 / 10
* **Bloqueios por 2FA**: 1 / 10
* **Taxa de Sucesso do 2FA**: 100% Eficaz

### Mensagens-chave para Dinâmica:
* **Evite o óbvio**: Criar senhas com base em dados de fácil acesso público (nascimento, pets, hobbies) facilita o trabalho de engenharia social.
* **Segurança em camadas**: A senha primária forte é importante, mas o **2FA (Segundo Fator de Autenticação)** é a barreira crítica que impede invasões mesmo quando a senha é descoberta.

---

## 🚀 Como Executar o Projeto

Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Instalar as dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor estará rodando em [http://localhost:5173/](http://localhost:5173/).

### 3. Compilar para produção
```bash
npm run build
```
O build de produção otimizado e minificado será gerado dentro da pasta `dist/`.

---

Desenvolvido para dinâmicas de conscientização sobre segurança digital e Phishing (Aula JA).
**Pratique a segurança digital ética!**
