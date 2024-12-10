import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...classLists) => {
    return (
        twMerge(clsx(classLists))
    )
}