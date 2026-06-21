import api from "./api";

export async function listarAlunos() {
  const response = await api.get("/alunos/");
  return response.data;
}

export async function buscarAluno(id) {
  const response = await api.get(`/alunos/${id}/`);
  return response.data;
}

export async function criarAluno(dados) {
  const response = await api.post("/alunos/", dados);
  return response.data;
}

export async function atualizarAluno(id, dados) {
  const response = await api.put(`/alunos/${id}/`, dados);
  return response.data;
}

export async function excluirAluno(id) {
  await api.delete(`/alunos/${id}/`);
}