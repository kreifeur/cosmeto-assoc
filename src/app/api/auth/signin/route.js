// app/api/auth/signin/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Données utilisateurs factices
const demoUsers = [
  {
    _id: "68cff327941054e21fe22cb7",
    email: "john@example.com",
    password: "password123", // En réel, utiliser bcrypt
    name: "John Doe",
    role: "user",
    avatar: "",
    createdAt: "2025-09-21T12:44:23.207Z",
    updatedAt: "2025-09-21T12:44:23.207Z"
  },
  {
    _id: "68cff327941054e21fe22cb8",
    email: "demo@cosmetologie.fr",
    password: "demo123",
    name: "Utilisateur Démo",
    role: "admin",
    avatar: "",
    createdAt: "2025-09-21T12:44:23.207Z",
    updatedAt: "2025-09-21T12:44:23.207Z"
  }
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Recherche de l'utilisateur
    const user = demoUsers.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérification du mot de passe
    const isValidPassword = (
      (email === 'john@example.com' && password === 'password123') ||
      (email === 'demo@cosmetologie.fr' && password === 'demo123')
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Génération du token JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'votre_secret_jwt_pour_development',
      { expiresIn: '1h' }
    );

    // Réponse réussie
    return NextResponse.json({
      success: true,
      message: 'Signed in successfully',
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        accessToken: token,
        refreshToken: token
      }
    });

  } catch (error) {
    console.error('Erreur signin:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// Optionnel: Ajouter d'autres méthodes HTTP
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Méthode non autorisée' },
    { status: 405 }
  );
}