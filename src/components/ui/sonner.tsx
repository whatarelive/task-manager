"use client";

import type { FC, CSSProperties } from "react";
import { Toaster as Sonner, toast, ToasterProps } from "sonner";
import { Bell, CheckCircle, Info, XCircle } from "lucide-react";

export const Toaster: FC<ToasterProps> = ({ ...props }) => {
    return (
        <Sonner
            theme={"light"}
            className="toaster group relative !top-20"
            position="top-right"
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                } as CSSProperties
            }
            {...props}
        />
    )
}

interface Props {
    title: string;
    description?: string;
}

// Funciones para mostrar los diferentes tipos de toast
export function showSuccessToast({ title, description }: Props) {
    toast.success(title, {
        description: description ?? "Los cambios han sido guardados correctamente.",
        icon: <CheckCircle className="h-5 w-5" />,
        duration: 4000,
    })
}
  
export function showErrorToast({ title, description }: Props) {
    toast.error(title, {
        description: description ?? "Por favor, inténtalo de nuevo más tarde.",
        icon: <XCircle className="h-5 w-5" />,
        duration: 5000,
    })
}
  
export function showNotificationToast({}: Props) {
    toast("Nueva notificación", {
        description: "Tienes un nuevo mensaje en tu bandeja de entrada.",
        icon: <Bell className="h-5 w-5" />,
        duration: 3000,
    })
}
  
export function showLoadingToast({}: Props) {
    toast.promise(
        new Promise((resolve) => {
            setTimeout(resolve, 2000)
        }),
        {
            loading: "Procesando tu solicitud...",
            success: "¡Solicitud procesada correctamente!",
            error: "Error al procesar la solicitud",
        },
    )
}
  
export function showInfoToast({}: Props) {
    toast.info("Información importante", {
        description: "Tu suscripción expirará en 7 días.",
        icon: <Info className="h-5 w-5" />,
        duration: 5000,
    })
}
  