<script lang="ts">
	import { cn } from './utils';

	export let variant: 'default' | 'outline' = 'default';
	export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
	export let className = '';
	export let disabled = false;

	// Forward all rest of the props
	export let ariaInvalid: boolean = false;

	const baseClasses = [
		'relative cursor-pointer group transition-all animate-rainbow',
		'inline-flex items-center justify-center gap-2 shrink-0',
		'rounded-sm outline-none focus-visible:ring-[3px]',
		'text-sm font-medium whitespace-nowrap',
		'disabled:pointer-events-none disabled:opacity-50',
		'[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0'
	];

	const variantClasses = {
		default: `border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]
      bg-[length:200%] text-brand-primary [background-clip:padding-box,border-box,border-box]
      [background-origin:border-box] [border:calc(0.125rem)_solid_transparent]
      before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5
      before:-translate-x-1/2 before:animate-rainbow
      before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]
      before:[filter:blur(0.75rem)]
      dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),
      linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]`,

		outline: `border border-input border-b-transparent
      bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),
      linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]
      bg-[length:200%] text-brand-highlight [background-clip:padding-box,border-box,border-box]
      [background-origin:border-box]
      before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5
      before:-translate-x-1/2 before:animate-rainbow
      before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]
      before:[filter:blur(0.75rem)]
      dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),
      linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]`
	};

	const sizeClasses = {
		default: 'h-9 px-4 py-2',
		sm: 'h-8 rounded-xl px-3 text-xs',
		lg: 'h-11 rounded-xl px-8',
		icon: 'size-9'
	};
</script>

<button
	class={cn(
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		ariaInvalid && 'aria-invalid:border-destructive',
		className
	)}
	{disabled}
>
	<slot />
</button>

<style>
	:global(:root) {
		--color-1: hsl(0 100% 63%);
		--color-2: hsl(270 100% 63%);
		--color-3: hsl(210 100% 63%);
		--color-4: hsl(195 100% 63%);
		--color-5: hsl(90 100% 63%);
		--animate-rainbow: rainbow var(--speed, 2s) infinite linear;
	}

	@keyframes rainbow {
		0% {
			background-position: 0%;
		}
		100% {
			background-position: 200%;
		}
	}
</style>
