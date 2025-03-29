import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward the request to your actual API
    const response = await axios.post(
      "https://personal-ai-assistant-u5zh.onrender.com/chat/",
      body
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from API" },
      { status: 500 }
    );
  }
}