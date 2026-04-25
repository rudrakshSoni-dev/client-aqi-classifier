import { SmartAQIResult, FastAQIResult } from "./types";

export async function classifyImageSmart(file: File): Promise<SmartAQIResult> {
  const formData = new FormData();
  formData.append("image", file); // ✅ matches curl

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classify`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || "Smart classification failed");
  }

  return response.json();
}

export async function classifyImageFast(file: File): Promise<FastAQIResult> {
  const formData = new FormData();
  formData.append("file", file); // ✅ CNN expects "file"

  const response = await fetch(`${process.env.NEXT_PUBLIC_CNN_API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Fast classification failed");
  }

  return response.json();
}

export async function checkHealth(): Promise<{ status: string; model: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
}