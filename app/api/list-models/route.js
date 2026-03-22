"use server";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Try SDK methods first (name may vary by SDK version)
    if (typeof genAI.listModels === "function") {
      const sdkRes = await genAI.listModels();
      return NextResponse.json({ source: "sdk", data: sdkRes });
    }

    if (typeof genAI.getModels === "function") {
      const sdkRes = await genAI.getModels();
      return NextResponse.json({ source: "sdk", data: sdkRes });
    }

    // Fallback: call the REST endpoint directly using the API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
    const data = await res.json();

    return NextResponse.json({ source: "rest", data });
  } catch (error) {
    console.error("list-models error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
