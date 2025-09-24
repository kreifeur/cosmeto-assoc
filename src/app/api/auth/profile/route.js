import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching profile', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const body = await request.json();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ 
      message: 'Profile updated successfully', 
      user 
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating profile', error: error.message },
      { status: 500 }
    );
  }
}