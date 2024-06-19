import axios from 'axios';

export const register = async (name, username, password) => {

    let code = 500;

    try {
        const payload = { name, username, password };
        const post = await axios.post('http://localhost:5000/api/member/register', payload);
        if (post.data.code == 200) {
            const token = post.data.token;
            localStorage.setItem('token', token);
        }
        
        code = post.data.code;
    } catch (error) {
        console.error('Error registering', error);
    }

    return code;
}

export const login = async (username, password) => {
    try {
        const payload = { username, password };
        const response = await axios.post('http://localhost:5000/api/member/login', payload);
        
        const token = response.data.token;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Error logging in', error);
    }
}

export const profile = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/member/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data.name;
    } catch (error) {
        console.error('Error fetching user info', error);
    }
}