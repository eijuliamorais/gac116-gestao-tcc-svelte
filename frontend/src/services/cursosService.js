import api from "./api";

export async function listarCursos() {
  const response = await api.get("/cursos/");
  return response.data;
}

export async function buscarCurso(id) {
  const response = await api.get(`/cursos/${id}/`);
  return response.data;
}

export async function criarCurso(dados) {
  const response = await api.post("/cursos/", dados);
  return response.data;
}

export async function atualizarCurso(id, dados) {
  const response = await api.put(`/cursos/${id}/`, dados);
  return response.data;
}

export async function excluirCurso(id) {
  await api.delete(`/cursos/${id}/`);
}