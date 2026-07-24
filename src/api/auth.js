const API_URL = import.meta.env.VITE_API_URL;

// Register user

export async function registerUser(userData){
    const res = await fetch(`${API_URL}/auth/register`,{
        method: "POST",
        headers: {"Content-Type":"application/json",},
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Registration Failed");
    }
    return data;
}

// Login User

export async function loginUser(userData){
    const res = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type":"application/json",},
        body: JSON.stringify(userData),
    });

        console.log("Status:", res.status);


    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Login Failed");
    }
    localStorage.setItem("token",data.token);
    return data;
}

// Logout
export function logoutUser(){
    localStorage.removeItem("token");
}

// Get jwt token
export function getToken(){
    return localStorage.getItem("token");
}

// Check log in
export function isAuthenticated(){
    return !!localStorage.getItem("token");
}