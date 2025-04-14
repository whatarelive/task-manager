import type { CSSProperties } from "react";

export interface ILayoutProps {
    readonly children: React.ReactNode;
}

export interface IBasicProps {
    readonly children?: React.ReactNode;
    className?: string;
    styles?: CSSProperties;
}