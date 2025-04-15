interface Props {
   readonly children: React.ReactNode;
}

export default function DashBoardLayout({ children }: Props) {
    return (
        <div className="bg-neutral-50 w-full p-6">
            { children }
        </div>
    )
}
