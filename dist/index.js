"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const materias = ["Português", "Matemática", "Geografia", "História", "Química"];
const TOTAL_AULAS = 200;
console.log("=== SISTEMA ESCOLAR ===\n");
const nome = readline_sync_1.default.question("Nome do aluno: ");
const serie = readline_sync_1.default.question("Série: ");
const faltas = readline_sync_1.default.questionInt("Número de faltas: ");
const presenca = ((TOTAL_AULAS - faltas) / TOTAL_AULAS) * 100;
const notas = {};
const medias = {};
for (const materia of materias) {
    console.log(`\n--- ${materia} ---`);
    const notasMateria = [];
    for (let i = 1; i <= 8; i++) {
        const nota = readline_sync_1.default.questionFloat(`Nota ${i}: `);
        notasMateria.push(nota);
    }
    notas[materia] = notasMateria;
    const media = notasMateria.reduce((a, b) => a + b, 0) / notasMateria.length;
    medias[materia] = parseFloat(media.toFixed(2));
}
const mediaGeral = Object.values(medias).reduce((a, b) => a + b, 0) / materias.length;
const aprovadoNotas = mediaGeral >= 7.0;
const aprovadoPresenca = presenca >= 75;
const aprovado = aprovadoNotas && aprovadoPresenca;
const aluno = {
    nome,
    serie,
    faltas,
    totalAulas: TOTAL_AULAS,
    presenca: parseFloat(presenca.toFixed(2)),
    notas,
    medias,
    aprovado,
};
if (!fs_1.default.existsSync("boletins"))
    fs_1.default.mkdirSync("boletins");
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
fs_1.default.writeFileSync(`boletins/${aluno.nome.replace(/ /g, "_")}.txt`, boletim);
console.log("\n✅ Boletim gerado com sucesso!");
const csvHeader = "Nome,Série,Faltas,Presença(%),Média Geral,Situação\n";
const csvLine = `${aluno.nome},${aluno.serie},${aluno.faltas},${aluno.presenca.toFixed(2)},${mediaGeral.toFixed(2)},${aluno.aprovado ? "Aprovado" : "Reprovado"}\n`;
if (!fs_1.default.existsSync("alunos.csv")) {
    fs_1.default.writeFileSync("alunos.csv", csvHeader);
}
fs_1.default.appendFileSync("alunos.csv", csvLine);
console.log("✅ Dados salvos em alunos.csv");
