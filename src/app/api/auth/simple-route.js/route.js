import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Auth endpoint',
    status: 'OK' 
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Auth endpoint',
    status: 'OK' 
  });
}