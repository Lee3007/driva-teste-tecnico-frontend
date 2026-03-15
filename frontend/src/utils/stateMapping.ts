export const nameToCode: Record<string, string> = {
  "Acre": "AC",
  "Alagoas": "AL",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Bahia": "BA",
  "Ceará": "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  "Goiás": "GO",
  "Maranhão": "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  "Paraná": "PR",
  "Paraíba": "PB",
  "Pará": "PA",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  "Rio de Janeiro": "RJ",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  "Sergipe": "SE",
  "Tocantins": "TO",
};

export const codeToName: Record<string, string> = Object.fromEntries(
  Object.entries(nameToCode).map(([name, code]) => [code, name])
);
