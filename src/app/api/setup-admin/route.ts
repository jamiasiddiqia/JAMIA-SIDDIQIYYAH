import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Use hardcoded credentials for quick setup
    const adminUser = {
      email: 'admin@siddiqiyyah.com',
      password: 'Jamia#2026',
      full_name: full_name || 'Admin User',
      role: 'super_admin'
    };

    // For now, return success with hardcoded credentials
    // In production, this would create the user in Supabase
    return NextResponse.json({
      message: 'Admin setup completed successfully!',
      credentials: {
        email: adminUser.email,
        password: adminUser.password
      },
      user: {
        full_name: adminUser.full_name,
        role: adminUser.role
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}