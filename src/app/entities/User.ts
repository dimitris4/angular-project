export class User {
    id;
    firstName: string;
    lastName: string;
    role: string; // admin, student, moderator
    username: string;
    // password: string;
    email: string;
    profileImage?: string;
    coverPhoto?: string;
    signupDate: Date;
    title?: string;
}


