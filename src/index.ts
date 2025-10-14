import fs from "fs";
import readlineSync from "readline-sync";

interface Aluno {
  nome: string;
  serie: string;
  faltas: number;
  totalAulas: number;
  presenca: number;
  notas: Record<string, number[]>;
  medias: Record<string, number>;
  aprovado: boolean;
}

const materias = ["Português", "Matemática", "Geografia", "História", "Química"];
const TOTAL_AULAS = 200;

console.log("=== SISTEMA ESCOLAR ===\n");

const nome = readlineSync.question("Nome do aluno: ");
const serie = readlineSync.question("Série: ");
const faltas = readlineSync.questionInt("Número de faltas: ");

const presenca = ((TOTAL_AULAS - faltas) / TOTAL_AULAS) * 100;
const notas: Record<string, number[]> = {};
const medias: Record<string, number> = {};

for (const materia of materias) {
  console.log(`\n--- ${materia} ---`);
  const notasMateria: number[] = [];

  for (let i = 1; i <= 8; i++) {
    const nota = readlineSync.questionFloat(`Nota ${i}: `);
    notasMateria.push(nota);
  }

  notas[materia] = notasMateria;
  const media = notasMateria.reduce((a, b) => a + b, 0) / notasMateria.length;
  medias[materia] = parseFloat(media.toFixed(2));
}

const mediaGeral =
  Object.values(medias).reduce((a, b) => a + b, 0) / materias.length;
const aprovadoNotas = mediaGeral >= 7.0;
const aprovadoPresenca = presenca >= 75;
const aprovado = aprovadoNotas && aprovadoPresenca;

const aluno: Aluno = {
  nome,
  serie,
  faltas,
  totalAulas: TOTAL_AULAS,
  presenca: parseFloat(presenca.toFixed(2)),
  notas,
  medias,
  aprovado,
};

if (!fs.existsSync("boletins")) fs.mkdirSync("boletins");

const boletim = `
==============================
        BOLETIM ESCOLAR
==============================

Aluno: ${aluno.nome}
Série: ${aluno.serie}

Faltas: ${aluno.faltas}
Presença: ${aluno.presenca.toFixed(2)}%

--------------------------------
MÉDIAS DAS MATÉRIAS:
${materias.map(m => `${m}: ${aluno.medias[m]}`).join("\n")}
--------------------------------
MÉDIA GERAL: ${mediaGeral.toFixed(2)}

STATUS FINAL: ${aluno.aprovado ? "APROVADO ✅" : "REPROVADO ❌"}
--------------------------------
`;

fs.writeFileSync(`boletins/${aluno.nome.replace(/ /g, "_")}.txt`, boletim);
console.log("\n✅ Boletim gerado com sucesso!");

const csvHeader =
  "Nome,Série,Faltas,Presença(%),Média Geral,Situação\n";
const csvLine = `${aluno.nome},${aluno.serie},${aluno.faltas},${aluno.presenca.toFixed(
  2
)},${mediaGeral.toFixed(2)},${aluno.aprovado ? "Aprovado" : "Reprovado"}\n`;

if (!fs.existsSync("alunos.csv")) {
  fs.writeFileSync("alunos.csv", csvHeader);
}
fs.appendFileSync("alunos.csv", csvLine);

console.log("✅ Dados salvos em alunos.csv");
