import { cn } from "@/lib/utils"

// customising <h3></h3> tag to be used globally

export function H3(props: React.HTMLProps<HTMLHeadingElement>) {
    return <h3
    {...props}
    className={cn("text-xl font-semibold tracking-tight", props.className,)}
    />
}