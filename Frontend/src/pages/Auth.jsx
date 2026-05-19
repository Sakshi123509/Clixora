import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Login = () => {

    const handleGoogleLogin = async () => {
        try {
            // Google popup open hoga
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Backend ko bhejo
            const response = await axios.post('http://localhost:8000/api/auth/google', {
                username: user.displayName,
                email: user.email,
                profilepic: user.photoURL,
                googleId: user.uid
            });

            // Token save karo
            localStorage.setItem('token', response.data.token);
            console.log("Google login successful");

            // Dashboard pe bhejo
            window.location.href = '/dashboard';

        } catch (error) {
            console.log("Google login error:", error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>
                Continue with Google
            </button>
        </div>
    )
}

export default Login;