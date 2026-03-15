import type { State } from "@market/shared";

export const states: State[] = [
  // Norte
  { code: "AC", name: "Acre", region: "Norte", capital: "Rio Branco", population: 906876, gdpPerCapita: 18370, averageIncome: 1800, marketPotentialScore: 18, area: 164123 },
  { code: "AM", name: "Amazonas", region: "Norte", capital: "Manaus", population: 4207714, gdpPerCapita: 24970, averageIncome: 2100, marketPotentialScore: 42, area: 1559168 },
  { code: "AP", name: "Amapá", region: "Norte", capital: "Macapá", population: 877613, gdpPerCapita: 20680, averageIncome: 1900, marketPotentialScore: 16, area: 142828 },
  { code: "PA", name: "Pará", region: "Norte", capital: "Belém", population: 8777124, gdpPerCapita: 19010, averageIncome: 1750, marketPotentialScore: 45, area: 1247955 },
  { code: "RO", name: "Rondônia", region: "Norte", capital: "Porto Velho", population: 1815278, gdpPerCapita: 27590, averageIncome: 2200, marketPotentialScore: 30, area: 237765 },
  { code: "RR", name: "Roraima", region: "Norte", capital: "Boa Vista", population: 652713, gdpPerCapita: 23870, averageIncome: 2000, marketPotentialScore: 14, area: 224301 },
  { code: "TO", name: "Tocantins", region: "Norte", capital: "Palmas", population: 1607363, gdpPerCapita: 24210, averageIncome: 2050, marketPotentialScore: 28, area: 277720 },

  // Nordeste
  { code: "AL", name: "Alagoas", region: "Nordeste", capital: "Maceió", population: 3365351, gdpPerCapita: 15870, averageIncome: 1500, marketPotentialScore: 25, area: 27848 },
  { code: "BA", name: "Bahia", region: "Nordeste", capital: "Salvador", population: 14985284, gdpPerCapita: 20420, averageIncome: 1850, marketPotentialScore: 55, area: 564733 },
  { code: "CE", name: "Ceará", region: "Nordeste", capital: "Fortaleza", population: 9240580, gdpPerCapita: 18240, averageIncome: 1700, marketPotentialScore: 50, area: 148920 },
  { code: "MA", name: "Maranhão", region: "Nordeste", capital: "São Luís", population: 7153262, gdpPerCapita: 13540, averageIncome: 1350, marketPotentialScore: 35, area: 331937 },
  { code: "PB", name: "Paraíba", region: "Nordeste", capital: "João Pessoa", population: 4059905, gdpPerCapita: 17280, averageIncome: 1600, marketPotentialScore: 32, area: 56585 },
  { code: "PE", name: "Pernambuco", region: "Nordeste", capital: "Recife", population: 9674793, gdpPerCapita: 20030, averageIncome: 1800, marketPotentialScore: 52, area: 98076 },
  { code: "PI", name: "Piauí", region: "Nordeste", capital: "Teresina", population: 3289290, gdpPerCapita: 15430, averageIncome: 1450, marketPotentialScore: 26, area: 251577 },
  { code: "RN", name: "Rio Grande do Norte", region: "Nordeste", capital: "Natal", population: 3560903, gdpPerCapita: 19770, averageIncome: 1750, marketPotentialScore: 34, area: 52811 },
  { code: "SE", name: "Sergipe", region: "Nordeste", capital: "Aracaju", population: 2338474, gdpPerCapita: 19430, averageIncome: 1700, marketPotentialScore: 24, area: 21918 },

  // Centro-Oeste
  { code: "DF", name: "Distrito Federal", region: "Centro-Oeste", capital: "Brasília", population: 3094325, gdpPerCapita: 90742, averageIncome: 5200, marketPotentialScore: 78, area: 5760 },
  { code: "GO", name: "Goiás", region: "Centro-Oeste", capital: "Goiânia", population: 7206589, gdpPerCapita: 35500, averageIncome: 2800, marketPotentialScore: 60, area: 340086 },
  { code: "MS", name: "Mato Grosso do Sul", region: "Centro-Oeste", capital: "Campo Grande", population: 2839188, gdpPerCapita: 42180, averageIncome: 2900, marketPotentialScore: 48, area: 357145 },
  { code: "MT", name: "Mato Grosso", region: "Centro-Oeste", capital: "Cuiabá", population: 3567234, gdpPerCapita: 52430, averageIncome: 3100, marketPotentialScore: 55, area: 903366 },

  // Sudeste
  { code: "ES", name: "Espírito Santo", region: "Sudeste", capital: "Vitória", population: 4108508, gdpPerCapita: 35170, averageIncome: 2700, marketPotentialScore: 52, area: 46095 },
  { code: "MG", name: "Minas Gerais", region: "Sudeste", capital: "Belo Horizonte", population: 21411923, gdpPerCapita: 31320, averageIncome: 2500, marketPotentialScore: 75, area: 586520 },
  { code: "RJ", name: "Rio de Janeiro", region: "Sudeste", capital: "Rio de Janeiro", population: 17463349, gdpPerCapita: 44220, averageIncome: 3400, marketPotentialScore: 82, area: 43750 },
  { code: "SP", name: "São Paulo", region: "Sudeste", capital: "São Paulo", population: 46289333, gdpPerCapita: 52432, averageIncome: 3800, marketPotentialScore: 95, area: 248219 },

  // Sul
  { code: "PR", name: "Paraná", region: "Sul", capital: "Curitiba", population: 11597484, gdpPerCapita: 43542, averageIncome: 3200, marketPotentialScore: 78, area: 199307 },
  { code: "RS", name: "Rio Grande do Sul", region: "Sul", capital: "Porto Alegre", population: 11466630, gdpPerCapita: 42540, averageIncome: 3100, marketPotentialScore: 76, area: 281730 },
  { code: "SC", name: "Santa Catarina", region: "Sul", capital: "Florianópolis", population: 7338473, gdpPerCapita: 48300, averageIncome: 3400, marketPotentialScore: 80, area: 95737 },
];
