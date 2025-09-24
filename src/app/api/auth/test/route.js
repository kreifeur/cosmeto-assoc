import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      authenticated: !!session,
      user: session?.user || null,
      message: 'Auth test successful'
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Auth test failed',
      details: error.message
    }, { status: 500 });
  }
}