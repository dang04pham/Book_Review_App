export interface User {
    username: string;
    roles: string[];
    jwtToken?: string;
    csrfToken?: string;
}

export interface LoginResponse {
    jwtToken: string;
    username: string;
    roles: string[];
}