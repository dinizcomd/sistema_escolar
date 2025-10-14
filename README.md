Sistema Escolar — TypeScript

 Funcionalidades

- Solicita nome do aluno e série
- Coleta número de faltas (mínimo de 75% de presença para aprovação)
- Coleta 8 notas por matéria:
  - Português  
  - Matemática  
  - Geografia  
  - História  
  - Química
- Calcula médias e define se o aluno foi Aprovado ou Reprovado 
- Gera um boletim em formato `.txt` dentro da pasta `boletins/`
- Armazena todos os alunos e seus resultados em um arquivo `alunos.csv`


Estrutura do Projeto

```
sistema_escolar/
│
├── src/
│   └── index.ts      
├── boletins/          
│
├── alunos.csv          
│
├── package.json
├── tsconfig.json
└── README.md
```


Instalação e Execução

 1 Clonar o repositório
```bash
git clone https://github.com/seu-usuario/sistema_escolar.git
cd sistema_escolar
```

2 Instalar dependências
```bash
npm install
```

3 Compilar o TypeScript
```bash
npm run build
```

4 Executar o sistema
```bash
npm start
```



 📄 Exemplo de Boletim Gerado


==============================
        BOLETIM ESCOLAR
==============================

Aluno: João Silva
Série: 9º ano

Faltas: 40
Presença: 80.00%

--------------------------------
MÉDIAS DAS MATÉRIAS:
Português: 7.5
Matemática: 6.8
Geografia: 8.0
História: 7.0
Química: 6.9
--------------------------------
MÉDIA GERAL: 7.24

STATUS FINAL: APROVADO ✅
--------------------------------
