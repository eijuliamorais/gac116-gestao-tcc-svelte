import api from "./api";

export async function listarUnidades() {
  const response = await api.get("/unidades-academicas/");
  return response.data;
}

export async function criarUnidade(dados) {
  const response = await api.post("/unidades-academicas/", dados);
  return response.data;
}

export async function atualizarUnidade(id, dados) {
  const response = await api.put(`/unidades-academicas/${id}/`, dados);
  return response.data;
}

export async function excluirUnidade(id) {
  await api.delete(`/unidades-academicas/${id}/`);
}