import api from "./api";

export async function listarDepartamentos() {
  const response = await api.get("/departamentos/");
  return response.data;
}

export async function criarDepartamento(dados) {
  const response = await api.post("/departamentos/", dados);
  return response.data;
}

export async function atualizarDepartamento(id, dados) {
  const response = await api.put(`/departamentos/${id}/`, dados);
  return response.data;
}

export async function excluirDepartamento(id) {
  await api.delete(`/departamentos/${id}/`);
}