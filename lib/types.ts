
// lib/types.ts

export type AQICategory =
  | "GOOD"
  | "MODERATE"
  | "UNHEALTHY FOR SENSITIVE PEOPLE"
  | "UNHEALTHY"
  | "VERY UNHEALTHY"
  | "SEVERE"

export type Confidence = "HIGH" | "MEDIUM" | "LOW"

export type ClassificationMode = "fast" | "smart"

export interface ImageFeatures {
  mean_r: number
  mean_g: number
  mean_b: number
  mean_hue: number
  mean_saturation: number
  mean_value: number
  contrast_score: number
  dark_channel_mean: number
  edge_density: number
  brightness_p10: number
  brightness_p50: number
  brightness_p90: number
  saturation_std: number
  visibility_score: number
  haze_index: number
  sky_tone: string
  color_cast: string
}

// LLM-based smart response
export interface SmartAQIResult {
  category: AQICategory
  confidence: Confidence
  aqi_range: string
  health_implication: string
  reasoning: string
  feature_observations: string[]
  features: ImageFeatures
  llm_overridden: boolean
  override_reason: string | null
}

// CNN-based fast response
export interface CNNPrediction {
  label: AQICategory
  confidence: number        // float 0.0 - 1.0
  disclaimer: string
}

export interface FastAQIResult {
  prediction: CNNPrediction
}

export interface APIError {
  error: string
  detail: string
}
