export const getUniversities = async () =>
  fetch(
    `http://localhost:5000/api`
  ).then((response) => response.json());
