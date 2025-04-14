import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Form_login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const enviar_back = async (e) => {
        e.preventDefault();
        const datos = {
            user: usuario,
            password: password,
        };
        try {
            const res = await fetch('http://192.168.10.104:8000/tomar_datos/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });
            const resultado = await res.json();
            console.log(resultado.validacion, "kasjhdfjaszduhju ")
            if (resultado.validacion === "Correcto") {
                navigate('/principal', { state: { usuario: usuario } });
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("Error de datos:", error);
            alert("Ocurrió un error al enviar los datos.");
        }
    };

    return (
        <div>
            <div className="bg-light p-4 rounded custom-shadow">
                <form onSubmit={enviar_back}>
                    <h1 className="text-center text-primary mb-4">LOGIN</h1>
                    <div className="d-flex gap-3 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Ingrese su usuario"
                        />
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form_login;