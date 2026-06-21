import api from "./api";

export async function getEstatisticas() {
  const [tccs, professores] = await Promise.all([
    api.get("/tccs/"),
    api.get("/professores/")
  ]);

  const listaTccs = tccs.data;
  const listaProfessores = professores.data;

  const porStatus = {};

  listaTccs.forEach((tcc) => {
    porStatus[tcc.status] = (porStatus[tcc.status] || 0) + 1;
  });

  const porOrientador = {};

  listaTccs.forEach((tcc) => {
    const nome = tcc.orientador_nome || "Sem Orientador";

    porOrientador[nome] =
      (porOrientador[nome] || 0) + 1;
  });

  return {
    total_geral: listaTccs.length,
    total_professores: listaProfessores.length,
    por_status: porStatus,
    por_orientador: porOrientador
  };
}