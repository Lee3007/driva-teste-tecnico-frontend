import type { ExpansionZone } from "@market/shared";

export const expansionZones: ExpansionZone[] = [
  { stateCode: "GO", priority: "high", reason: "Alto crescimento econômico, mercado subatendido com forte agronegócio", potentialRevenue: 4500000 },
  { stateCode: "PE", priority: "high", reason: "Terceira maior economia do Nordeste, polo tecnológico em crescimento", potentialRevenue: 3800000 },
  { stateCode: "CE", priority: "high", reason: "Hub logístico do Nordeste, turismo forte e demanda crescente", potentialRevenue: 3200000 },
  { stateCode: "PA", priority: "medium", reason: "Maior estado do Norte, Belém como polo comercial regional", potentialRevenue: 2500000 },
  { stateCode: "MA", priority: "medium", reason: "Crescimento acelerado acima da média nacional, mercado virgem", potentialRevenue: 1800000 },
  { stateCode: "MT", priority: "medium", reason: "Economia agroindustrial forte, PIB per capita alto e em expansão", potentialRevenue: 2200000 },
  { stateCode: "MS", priority: "medium", reason: "Renda per capita acima da média, proximidade com SP facilita logística", potentialRevenue: 1500000 },
  { stateCode: "AM", priority: "low", reason: "Zona Franca de Manaus gera demanda, mas logística é desafiadora", potentialRevenue: 1200000 },
  { stateCode: "PI", priority: "low", reason: "Mercado emergente com crescimento acima da média nordestina", potentialRevenue: 800000 },
  { stateCode: "RN", priority: "low", reason: "Turismo e mercado imobiliário em crescimento, Natal como polo", potentialRevenue: 950000 },
];
