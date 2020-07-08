interface User {
    username: string;
    password: string;
    confirmPassword?: string;
}

let user: User; 
user = {username: "tuyen", password: "123"}