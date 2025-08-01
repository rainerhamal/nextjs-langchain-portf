import { cn } from "@/lib/utils"

// customising <h2></h2> tag to be used globally

export function H2(props: React.HTMLProps<HTMLHeadingElement>) {
    return <h2
    {...props}
    className={cn("text-2xl font-semibold tracking-tight", props.className,)}
    />
}