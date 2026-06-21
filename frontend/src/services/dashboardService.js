import api from "./api";

export async function getEstatisticas() {
  const response = await api.get("/tccs/estatisticas/");
  return response.data;
}