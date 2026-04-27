'use client';

type ExternalLinkProps = {
    href: string,
    children: React.ReactNode
}

export default function ExternalLink(props: ExternalLinkProps) {
    return (
        <a href={props.href}>
            {props.children}
        </a>
    )
}