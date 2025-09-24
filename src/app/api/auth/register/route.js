import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password, profile = {} } = await request.json();


    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 400 }
      );
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user with the pre-hashed password
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword, // Use the pre-hashed password
      profile,
    });

    // Verify the password was stored correctly by comparing
    const isPasswordCorrect = await bcrypt.compare(password, user.password);


    // Return user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword,
      debug: {
        passwordHashed: true,
        verification: isPasswordCorrect
      }
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error creating user',
      error: error.message
    }, { status: 500 });
  }
}