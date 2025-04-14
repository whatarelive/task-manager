export const Footer = () => {
    return (
        <footer className="border-t py-6 h-16">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row">
                <p className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} TaskMaster. Todos los derechos reservados.
                </p>
            </div>
      </footer>
    )
}