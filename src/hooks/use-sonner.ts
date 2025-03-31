import { toast as sonnerToast } from "sonner"

type ToastProps = {
	title?: string
	description?: string
	variant?: "default" | "destructive"
}

export function useToast() {
	return {
		toast: (props: ToastProps) =>
			sonnerToast(props.title, {
				description: props.description,
				className:
					props.variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined
			})
	}
}
