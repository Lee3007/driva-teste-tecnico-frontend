import type { Store } from "@market/shared";

export const stores: Store[] = [
  // São Paulo (~15)
  { id: "store-001", name: "Loja Centro SP 01", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, openDate: "2018-03-15", status: "active", revenue: 480000 },
  { id: "store-002", name: "Loja Paulista SP 02", city: "São Paulo", state: "SP", latitude: -23.5631, longitude: -46.6544, openDate: "2018-07-20", status: "active", revenue: 450000 },
  { id: "store-003", name: "Loja Pinheiros SP 03", city: "São Paulo", state: "SP", latitude: -23.5674, longitude: -46.6916, openDate: "2019-01-10", status: "active", revenue: 420000 },
  { id: "store-004", name: "Loja Moema SP 04", city: "São Paulo", state: "SP", latitude: -23.6008, longitude: -46.6700, openDate: "2019-06-05", status: "active", revenue: 390000 },
  { id: "store-005", name: "Loja Tatuapé SP 05", city: "São Paulo", state: "SP", latitude: -23.5365, longitude: -46.5761, openDate: "2020-02-18", status: "active", revenue: 350000 },
  { id: "store-006", name: "Loja Santo Amaro SP 06", city: "São Paulo", state: "SP", latitude: -23.6543, longitude: -46.7093, openDate: "2020-08-22", status: "active", revenue: 310000 },
  { id: "store-007", name: "Loja Santana SP 07", city: "São Paulo", state: "SP", latitude: -23.5028, longitude: -46.6289, openDate: "2021-03-12", status: "active", revenue: 330000 },
  { id: "store-008", name: "Loja Campinas 01", city: "Campinas", state: "SP", latitude: -22.9071, longitude: -47.0628, openDate: "2019-11-08", status: "active", revenue: 280000 },
  { id: "store-009", name: "Loja Ribeirão Preto 01", city: "Ribeirão Preto", state: "SP", latitude: -21.1704, longitude: -47.8103, openDate: "2020-05-15", status: "active", revenue: 250000 },
  { id: "store-010", name: "Loja Sorocaba 01", city: "Sorocaba", state: "SP", latitude: -23.5015, longitude: -47.4526, openDate: "2021-09-30", status: "active", revenue: 220000 },
  { id: "store-011", name: "Loja Santos 01", city: "Santos", state: "SP", latitude: -23.9608, longitude: -46.3336, openDate: "2022-01-20", status: "active", revenue: 260000 },
  { id: "store-012", name: "Loja São José dos Campos 01", city: "São José dos Campos", state: "SP", latitude: -23.1896, longitude: -45.8841, openDate: "2022-06-10", status: "active", revenue: 240000 },
  { id: "store-013", name: "Loja Guarulhos 01", city: "Guarulhos", state: "SP", latitude: -23.4628, longitude: -46.5333, openDate: "2023-02-14", status: "active", revenue: 270000 },
  { id: "store-014", name: "Loja Osasco 01", city: "Osasco", state: "SP", latitude: -23.5325, longitude: -46.7917, openDate: "2023-08-05", status: "active", revenue: 200000 },
  { id: "store-015", name: "Loja ABC SP 01", city: "Santo André", state: "SP", latitude: -23.6737, longitude: -46.5432, openDate: "2024-01-18", status: "active", revenue: 230000 },

  // Rio de Janeiro (~8)
  { id: "store-016", name: "Loja Centro RJ 01", city: "Rio de Janeiro", state: "RJ", latitude: -22.9068, longitude: -43.1729, openDate: "2018-05-20", status: "active", revenue: 420000 },
  { id: "store-017", name: "Loja Copacabana RJ 02", city: "Rio de Janeiro", state: "RJ", latitude: -22.9711, longitude: -43.1822, openDate: "2018-11-15", status: "active", revenue: 500000 },
  { id: "store-018", name: "Loja Barra RJ 03", city: "Rio de Janeiro", state: "RJ", latitude: -23.0004, longitude: -43.3657, openDate: "2019-04-10", status: "active", revenue: 380000 },
  { id: "store-019", name: "Loja Tijuca RJ 04", city: "Rio de Janeiro", state: "RJ", latitude: -22.9252, longitude: -43.2347, openDate: "2020-01-25", status: "active", revenue: 310000 },
  { id: "store-020", name: "Loja Niterói 01", city: "Niterói", state: "RJ", latitude: -22.8833, longitude: -43.1036, openDate: "2020-07-18", status: "active", revenue: 260000 },
  { id: "store-021", name: "Loja Nova Iguaçu 01", city: "Nova Iguaçu", state: "RJ", latitude: -22.7556, longitude: -43.4603, openDate: "2021-05-08", status: "active", revenue: 190000 },
  { id: "store-022", name: "Loja Duque de Caxias 01", city: "Duque de Caxias", state: "RJ", latitude: -22.7856, longitude: -43.3117, openDate: "2022-03-22", status: "active", revenue: 180000 },
  { id: "store-023", name: "Loja Petrópolis 01", city: "Petrópolis", state: "RJ", latitude: -22.5047, longitude: -43.1787, openDate: "2023-06-15", status: "active", revenue: 170000 },

  // Minas Gerais (~5)
  { id: "store-024", name: "Loja Savassi BH 01", city: "Belo Horizonte", state: "MG", latitude: -19.9332, longitude: -43.9381, openDate: "2019-02-28", status: "active", revenue: 350000 },
  { id: "store-025", name: "Loja Centro BH 02", city: "Belo Horizonte", state: "MG", latitude: -19.9191, longitude: -43.9387, openDate: "2020-06-12", status: "active", revenue: 300000 },
  { id: "store-026", name: "Loja Uberlândia 01", city: "Uberlândia", state: "MG", latitude: -18.9186, longitude: -48.2772, openDate: "2021-10-05", status: "active", revenue: 220000 },
  { id: "store-027", name: "Loja Juiz de Fora 01", city: "Juiz de Fora", state: "MG", latitude: -21.7642, longitude: -43.3503, openDate: "2022-08-18", status: "active", revenue: 180000 },
  { id: "store-028", name: "Loja Contagem 01", city: "Contagem", state: "MG", latitude: -19.9320, longitude: -44.0539, openDate: "2024-03-10", status: "active", revenue: 160000 },

  // Paraná (~4)
  { id: "store-029", name: "Loja Centro Curitiba 01", city: "Curitiba", state: "PR", latitude: -25.4284, longitude: -49.2733, openDate: "2019-08-15", status: "active", revenue: 320000 },
  { id: "store-030", name: "Loja Batel Curitiba 02", city: "Curitiba", state: "PR", latitude: -25.4413, longitude: -49.2889, openDate: "2020-12-01", status: "active", revenue: 290000 },
  { id: "store-031", name: "Loja Londrina 01", city: "Londrina", state: "PR", latitude: -23.3045, longitude: -51.1696, openDate: "2022-04-25", status: "active", revenue: 200000 },
  { id: "store-032", name: "Loja Maringá 01", city: "Maringá", state: "PR", latitude: -23.4205, longitude: -51.9333, openDate: "2023-11-08", status: "active", revenue: 190000 },

  // Rio Grande do Sul (~3)
  { id: "store-033", name: "Loja Moinhos POA 01", city: "Porto Alegre", state: "RS", latitude: -30.0277, longitude: -51.2287, openDate: "2019-05-10", status: "active", revenue: 300000 },
  { id: "store-034", name: "Loja Centro POA 02", city: "Porto Alegre", state: "RS", latitude: -30.0346, longitude: -51.2177, openDate: "2021-07-22", status: "active", revenue: 270000 },
  { id: "store-035", name: "Loja Caxias do Sul 01", city: "Caxias do Sul", state: "RS", latitude: -29.1681, longitude: -51.1794, openDate: "2023-04-15", status: "active", revenue: 180000 },

  // Santa Catarina (~3)
  { id: "store-036", name: "Loja Centro Floripa 01", city: "Florianópolis", state: "SC", latitude: -27.5969, longitude: -48.5495, openDate: "2020-03-20", status: "active", revenue: 280000 },
  { id: "store-037", name: "Loja Joinville 01", city: "Joinville", state: "SC", latitude: -26.3045, longitude: -48.8487, openDate: "2022-09-12", status: "active", revenue: 210000 },
  { id: "store-038", name: "Loja Blumenau 01", city: "Blumenau", state: "SC", latitude: -26.9194, longitude: -49.0661, openDate: "2024-06-05", status: "active", revenue: 170000 },

  // Bahia (~2)
  { id: "store-039", name: "Loja Pelourinho SSA 01", city: "Salvador", state: "BA", latitude: -12.9714, longitude: -38.5124, openDate: "2021-01-18", status: "active", revenue: 250000 },
  { id: "store-040", name: "Loja Paralela SSA 02", city: "Salvador", state: "BA", latitude: -12.9279, longitude: -38.4313, openDate: "2023-10-22", status: "active", revenue: 200000 },

  // Distrito Federal (~2)
  { id: "store-041", name: "Loja Asa Sul BSB 01", city: "Brasília", state: "DF", latitude: -15.8267, longitude: -47.9218, openDate: "2020-09-08", status: "active", revenue: 360000 },
  { id: "store-042", name: "Loja Águas Claras BSB 02", city: "Brasília", state: "DF", latitude: -15.8390, longitude: -48.0249, openDate: "2024-02-28", status: "active", revenue: 280000 },

  // Outros (~3)
  { id: "store-043", name: "Loja Centro Recife 01", city: "Recife", state: "PE", latitude: -8.0476, longitude: -34.8770, openDate: "2022-11-15", status: "active", revenue: 220000 },
  { id: "store-044", name: "Loja Aldeota Fortaleza 01", city: "Fortaleza", state: "CE", latitude: -3.7327, longitude: -38.5270, openDate: "2024-05-10", status: "active", revenue: 190000 },
  { id: "store-045", name: "Loja Centro Vitória 01", city: "Vitória", state: "ES", latitude: -20.3155, longitude: -40.3128, openDate: "2025-01-08", status: "active", revenue: 150000 },
];
