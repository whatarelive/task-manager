import { LoginForm } from "@/components/auth/login-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function LoginPage() {
    return (    
        <section className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl 
            border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl"
        >
            <Card className="border-0 shadow-none bg-gradient-to-br from-primary/5 to-purple-500/5 px-4">
                <CardHeader className="mb-4">
                    {/* Título con gradiente */}
                    <CardTitle className="bg-gradient-to-r from-primary via-purple-600 
                        to-primary bg-clip-text text-center text-3xl font-bold text-transparent"
                    >
                        Bienvenido de nuevo
                    </CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </CardDescription>
                </CardHeader>

                {/* Formulario de inicio de sesión */}
                <LoginForm/>
            </Card>
        </section>
    )
}
