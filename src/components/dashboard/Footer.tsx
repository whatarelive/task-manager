export function Footer() {
    return (
        <footer className="border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} TaskMaster. Todos los derechos reservados.
                </p>
            </div>
      </footer>
    )
}