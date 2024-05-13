import { cn } from "@/lib/utils"

// customising <h1></h1> tag to be used globally

export function H1(props: React.HTMLProps<HTMLHeadingElement>) {
    return <h1
    {...props}
    className={cn("text-3xl font-bold tracking-tight sm:text-4xl", props.className,)}
    />
}