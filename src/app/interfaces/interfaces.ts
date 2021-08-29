export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    company: {
      name: string
    };
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    email: string;
    name: string;
    body: string;
    postId: number;
}
