interface Props {
   readonly children: React.ReactNode;
}

export default function DashBoardLayout({ children }: Props) {
    return (
        <main className="bg-neutral-50 w-full">
            { children }
        </main>
    )
}
