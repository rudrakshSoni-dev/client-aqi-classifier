// lib/aqi.ts

import type {
  AQICategory,
} from "./types"

export const AQI_META: Record<AQICategory, {
  label: string
  range: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  description: string
  cautionary: string
}> = {
  GOOD: {
    label: "Good",
    range: "0 – 50",
    color: "#639922",
    bgColor: "#EAF3DE",
    borderColor: "#639922",
    textColor: "#3B6D11",
    description: "Air quality is satisfactory with little or no risk.",
    cautionary: "None. Enjoy outdoor activities."
  },
  MODERATE: {
    label: "Moderate",
    range: "51 – 100",
    color: "#BA7517",
    bgColor: "#FAEEDA",
    borderColor: "#BA7517",
    textColor: "#854F0B",
    description: "Acceptable air quality. Some pollutants may affect sensitive individuals.",
    cautionary: "Unusually sensitive people should consider limiting prolonged outdoor exertion."
  },
  "UNHEALTHY FOR SENSITIVE PEOPLE": {
    label: "Sensitive Groups",
    range: "101 – 150",
    color: "#D85A30",
    bgColor: "#FAECE7",
    borderColor: "#D85A30",
    textColor: "#993C1D",
    description: "Sensitive groups may experience health effects.",
    cautionary: "People with respiratory/heart conditions, elderly and children should limit outdoor exertion."
  },
  UNHEALTHY: {
    label: "Unhealthy",
    range: "151 – 200",
    color: "#E24B4A",
    bgColor: "#FCEBEB",
    borderColor: "#E24B4A",
    textColor: "#A32D2D",
    description: "Everyone may begin to experience health effects.",
    cautionary: "Everyone should limit prolonged outdoor exertion. Sensitive groups should avoid outdoor activity."
  },
  "VERY UNHEALTHY": {
    label: "Very Unhealthy",
    range: "201 – 300",
    color: "#D4537E",
    bgColor: "#FBEAF0",
    borderColor: "#D4537E",
    textColor: "#993556",
    description: "Health alert: serious risk for the entire population.",
    cautionary: "Everyone should avoid prolonged outdoor exertion. Sensitive groups should stay indoors."
  },
  SEVERE: {
    label: "Severe",
    range: "301+",
    color: "#7F77DD",
    bgColor: "#EEEDFE",
    borderColor: "#7F77DD",
    textColor: "#3C3489",
    description: "Health emergency conditions. Entire population is affected.",
    cautionary: "Everyone should avoid all outdoor physical activity. Stay indoors with windows closed."
  }
}

export const AQI_LEVELS: AQICategory[] = [
  "GOOD",
  "MODERATE",
  "UNHEALTHY FOR SENSITIVE PEOPLE",
  "UNHEALTHY",
  "VERY UNHEALTHY",
  "SEVERE",
]

export function getAQIMeta(category: AQICategory) {
  return AQI_META[category]
}
