Contexto:
Crie uma aplicação em React (Single Page Application) que será um jogo educativo sobre Segurança da Informação e Engenharia Social (OSINT). Os participantes atuarão como "Red Team" (hackers éticos). O objetivo do jogo é ler informações vazadas de uma vítima (um "Dossiê") e adivinhar a senha do banco dela.

Mecânica do Jogo (Fases):

O jogo deve ter 10 fases sequenciais.

A tela exibe a "Fase Atual (ex: 1/10)", o "Nome do Alvo", e um painel simulando "Dados Interceptados" (o dossiê com as pistas da vida da pessoa).

Abaixo do dossiê, há apenas um campo de input: "Senha" (tipo password) e um botão "Tentar Invasão".

Se a senha for incorreta, exiba uma mensagem de erro vermelha: "Acesso Negado. Tente outra combinação." e limpe o input.

Se a senha for correta, exiba uma tela de transição de sucesso por alguns segundos ("Acesso Concedido! Saldo de R$ [Valor Aleatório] comprometido.") e avance automaticamente para a próxima fase.

Ao concluir a Fase 10, exiba uma tela de "Missão Cumprida", parabenizando a equipe por entender como a mente de um engenheiro social funciona.

Design e UI (Tailwind CSS):

Estilo "Terminal Hacker / Cybersec": Use um fundo escuro (slate-900 ou gray-900), com detalhes em verde neon ou azul cibernético.

Use ícones da biblioteca Lucide React (ex: Terminal, Unlock, Lock, User, Database).

O "Dossiê" (dados da vítima) deve parecer um cartão de informações ou bloco de notas digital.

O design deve ser 100% responsivo para celulares.

Banco de Dados das Fases (Lógica no Estado do React):
Crie um array de objetos chamado levels contendo as 10 fases. Cada objeto deve ter: id, targetName, dossier (texto com as pistas, renderize com quebras de linha se necessário) e password. Use os dados exatos abaixo:

Fase 1:

targetName: "Marcos Silva"

dossier: "Bio do Twitter: Palmeirense roxo! \n Post recente no Instagram: 'Foto no Allianz Parque. Aquele título da Libertadores de 1999 foi o momento mais feliz da minha vida! #Obsessão'"

password: "Palmeiras1999"

Fase 2:

targetName: "Sandra Regina"

dossier: "Veterinária. No Instagram, posta muito sobre sua cadela Golden Retriever. Post fixado: 'Hoje faz 3 anos que essa princesa chamada Mel chegou! #Adoção #2018'. \n Nota técnica: O banco exige um caractere especial no final e ela adora usar exclamação."

password: "Mel2018!"

Fase 3:

targetName: "Lucas Oliveira"

dossier: "Estudante de TI e gamer. Nick no fórum: 'PokeMaster99'. Postou saudoso: 'Meu primeiro jogo foi no GameBoy, eu era obcecado pelo Pikachu'. \n Nota técnica: Ele costuma substituir a letra 'i' pelo número '1' (leet speak) e finaliza com '@'."

password: "P1kachu@"

Fase 4:

targetName: "Patrícia Lima"

dossier: "Concurseira. No blog, seu 'Sobre Mim' diz: 'Meu grande objetivo de vida é a Posse na Receita Federal. 2024 é o meu ano!'. No Twitter, só usa hashtags. \n Nota técnica: Finaliza a senha com '#'."

password: "Posse2024#"

Fase 5:

targetName: "Roberto Dias"

dossier: "Executivo. Foto de capa do Facebook é a Torre Eiffel com a legenda: 'Lembrança inesquecível da nossa lua de mel em 2015. O lugar mais lindo do mundo: Paris'. \n Nota técnica: O caractere especial padrão dele é '@'."

password: "Paris2015@"

Fase 6:

targetName: "Carlos Alberto"

dossier: "Corretor veterano. Bio no site: 'Fundei a C.A. Imóveis há 30 anos no mesmo endereço: Avenida Amazonas, número 1420'. No Facebook, reclama que as senhas modernas são difíceis de decorar e prefere usar coisas de sua rotina de trabalho."

password: "Amazonas1420"

Fase 7:

targetName: "Fernanda Costa"

dossier: "Chef de Cozinha. Restaurante 'Sabor & Arte' aberto em 2019. Em entrevista recente, declarou: 'Sou obcecada por ervas frescas. O Alecrim define a minha cozinha, coloco em quase tudo'."

password: "Alecrim2019"

Fase 8:

targetName: "Daniel Souza"

dossier: "Analista de sistemas e músico. No Twitter postou foto de uma guitarra velha: 'Minha primeira paixão. Ganhei essa Fender quando fiz 13 anos e nunca mais parei de tocar'. \n Nota: Senha contém apenas letras e números."

password: "Fender13"

Fase 9:

targetName: "Ricardo Mendes"

dossier: "Engenheiro. No Instagram, a bio diz: 'Casado com Mariana | Pai do Enzo'. O post mais recente é de 2022, segurando o pezinho de um bebê. \n Nota técnica: Ele usa suas próprias iniciais (maiúsculas) seguidas do nome do filho e do ano de nascimento do bebê."

password: "RMEnzo22"

Fase 10:

targetName: "Beatriz Silva"

dossier: "Ativista ambiental. Fez um post no blog listando desastres que não podem ser esquecidos: Mariana, Brumadinho e Chernobyl (1986). No Twitter, disse que a minissérie sobre Chernobyl mudou a vida dela."

password: "Chernobyl1986"

Requisitos de Implementação:

Entregue todo o código funcional em um único arquivo (componente principal do React).

Gerencie o estado da fase atual (currentLevel), o input da senha (inputValue) e as mensagens de erro ou sucesso.

Garanta que o fluxo de UI deixe claro que é um jogo progressivo e mostre claramente as pistas.