<script>
  import { onMount } from "svelte";
  import api from "../services/api";

  let alunos = [];

  onMount(async () => {
    try {
      const response = await api.get("/alunos/");
      alunos = response.data;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<h1>Lista de Alunos</h1>

<table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Matrícula</th>
      <th>Curso</th>
    </tr>
  </thead>

  <tbody>
    {#each alunos as aluno}
      <tr>
        <td>{aluno.id}</td>
        <td>{aluno.nome}</td>
        <td>{aluno.matricula}</td>
        <td>{aluno.curso}</td>
      </tr>
    {/each}
  </tbody>
</table>