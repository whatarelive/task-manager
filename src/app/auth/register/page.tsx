import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function RegisterPage() {
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
                        Crear una cuenta
                    </CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus datos para registrarte en la plataforma
                    </CardDescription>
                </CardHeader>

                {/* Formulario de inicio de sesión */}
                <RegisterForm/>
            </Card>
        </section>
    )
}
