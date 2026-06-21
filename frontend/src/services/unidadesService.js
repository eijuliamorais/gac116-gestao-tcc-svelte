import api from "./api";

export async function listarUnidades() {
  const response = await api.get("/unidades-academicas/");
  return response.data;
}
