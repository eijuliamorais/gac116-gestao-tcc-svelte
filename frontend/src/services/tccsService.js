import api from "./api";

export async function listarTccs() {
  const response = await api.get("/tccs/");
  return response.data;
}

export async function buscarTcc(id) {
  const response = await api.get(`/tccs/${id}/`);
  return response.data;
}

export async function criarTcc(dados) {
  // dados é um FormData
  const response = await api.post("/tccs/", dados, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function atualizarTcc(id, dados) {
  // dados é um FormData
  const response = await api.put(`/tccs/${id}/`, dados, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function excluirTcc(id) {
  await api.delete(`/tccs/${id}/`);
}