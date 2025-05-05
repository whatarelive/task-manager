interface Props {
   readonly children: React.ReactNode;
}

export default function WorkSpacesLayout({ children }: Props) {
    return (
        <div className="bg-neutral-50 w-full p-6">
            { children }
        </div>
    )
}
