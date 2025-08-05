import { NextResponse } from 'next/server';
import { ConnectionToDatabase } from '../../../../lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  await ConnectionToDatabase();

  const existingUser = await User.findOne({ email }).lean();
  if (!existingUser) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const users = await User.find({ email });
  const user = users[0];
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // TODO: Create session or JWT here for auth state...

  return NextResponse.json({ success: true });
}
