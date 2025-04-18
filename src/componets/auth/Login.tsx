import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { fetchLogin, fetchLoginGoogle } from "../../api/auth";
import { useUser } from "../../hooks/user-context";
import { FormEvent, useState } from "react";

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useUser() // ✅ Aquí está bien

    const handleLoginGoogle = async (response: any) => {
        try {
            const data = await fetchLoginGoogle(response);
            login(data.token);
            navigate('/');
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const data: any = await fetchLogin(email, password);
            console.log(data)
            login(data.token)

            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <a className="animate-fade-in" href="/">
                <svg viewBox="0 0 256 366" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" preserveAspectRatio="xMidYMid"><path fill="#fff" d="M182.022 9.147c2.982 3.702 4.502 8.697 7.543 18.687L256 246.074a276.467 276.467 0 0 0-79.426-26.891L133.318 73.008a5.63 5.63 0 0 0-10.802.017L79.784 219.11A276.453 276.453 0 0 0 0 246.04L66.76 27.783c3.051-9.972 4.577-14.959 7.559-18.654a24.541 24.541 0 0 1 9.946-7.358C88.67 0 93.885 0 104.314 0h47.683c10.443 0 15.664 0 20.074 1.774a24.545 24.545 0 0 1 9.95 7.373Z" /><path fill="#FF5D01" d="M189.972 256.46c-10.952 9.364-32.812 15.751-57.992 15.751-30.904 0-56.807-9.621-63.68-22.56-2.458 7.415-3.009 15.903-3.009 21.324 0 0-1.619 26.623 16.898 45.14 0-9.615 7.795-17.41 17.41-17.41 16.48 0 16.46 14.378 16.446 26.043l-.001 1.041c0 17.705 10.82 32.883 26.21 39.28a35.685 35.685 0 0 1-3.588-15.647c0-16.886 9.913-23.173 21.435-30.48 9.167-5.814 19.353-12.274 26.372-25.232a47.588 47.588 0 0 0 5.742-22.735c0-5.06-.786-9.938-2.243-14.516Z" /></svg>
            </a>
            <h1 className="font-bold text-3xl">Bienvenidos</h1>
            <p>Inicia sesion para continuar</p>
            <form className="w-[300px] flex flex-col gap-4 mt-4"
                onSubmit={handleLogin}
            >
                <input
                    type="email"
                    placeholder="Correo Electronico"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="border-1 border-[var(--bg-ligth)] dark:border-[var(--bg-dark)] rounded-lg p-2" />
                <input
                    type="password"
                    value={password}
                    minLength={8}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required
                    placeholder="Contraseña"
                    autoComplete="current-password"
                    className="border-1 border-[var(--bg-ligth)] dark:border-[var(--bg-dark)] rounded-lg p-2" />
                <button
                    type="submit"
                    className="dark:bg-white bg-black text-white rounded-4xl dark:text-black font-semibold p-1.5 px-4 hover:opacity-90 transition-all duration-300 cursor-pointer">Iniciar Sesion</button>
                <p className="text-[#666] text-sm">¿No tienes cuenta? <a href="/auth/register" className="text-black dark:text-white font-semibold">Registrate</a></p>
                <GoogleLogin
                    onSuccess={handleLoginGoogle} // Aquí se pasa el response como argumento
                    onError={() => console.log('Login Failed')}
                />
            </form>
        </div>
    )
}
