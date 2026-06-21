import api from "./api";

export async function listarProfessores() {
  const response = await api.get("/professores/");
  return response.data;
}

export async function buscarProfessor(id) {
  const response = await api.get(`/professores/${id}/`);
  return response.data;
}

export async function criarProfessor(dados) {
  const response = await api.post("/professores/", dados);
  return response.data;
}

export async function atualizarProfessor(id, dados) {
  const response = await api.put(`/professores/${id}/`, dados);
  return response.data;
}

export async function excluirProfessor(id) {
  await api.delete(`/professores/${id}/`);
}