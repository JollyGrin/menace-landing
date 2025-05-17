<script lang="ts">
	import TextShadow from './TextShadow.svelte';
</script>

<div class="blockquote-wrapper relative z-20">
	<div class="blockquote">
		<h1 class="text-[1.75rem] tracking-tight md:text-[2rem] md:tracking-normal">
			We don’t want to change. Every change is a
			<TextShadow
				text="menace"
				className="text-brand-highlight font-black tracking-wide"
				shadowColor="var(--color-brand-highlight)"
			/>
			to stability.
			<div class="h-5"></div>
			That’s why we’re scared to apply new inventions.
		</h1>
		<h4 class="text-brand-highlight/30">&mdash;Aldous Huxley<br /><em>Brave New World</em></h4>
	</div>
</div>

<style>
	/* center the blockquote in the page */
	.blockquote-wrapper {
		display: flex;
		padding: 0 20px;
	}

	/* Blockquote main style */
	.blockquote {
		position: relative;
		/* font-family: 'Barlow Condensed', sans-serif; */
		max-width: 620px;
		margin: 0px auto;
		align-self: center;
	}

	/* Blockquote header */
	.blockquote h1 {
		/* font-family: 'Abril Fatface', cursive; */
		position: relative; /* for pseudos */
		color: var(--color-brand-primary);
		font-weight: 300;
		line-height: 1;
		margin: 0;
		border: 2px solid #fff;
		border: solid 2px;
		border-radius: 30px;
		padding: 25px;
	}

	/* Blockquote right double quotes */
	.blockquote h1:after {
		content: '';
		position: absolute;
		border: 2px solid var(--color-brand-primary);
		border-radius: 0 100% 0 0;
		width: 60px;
		height: 60px;
		bottom: -60px;
		left: 49px;
		border-bottom: none;
		border-left: none;
		z-index: 3;
	}

	.blockquote h1:before {
		content: '';
		position: absolute;
		width: 80px;
		border: 2.5px solid var(--color-brand-secondary);
		bottom: -3px;
		left: 50px;
		z-index: 2;
	}

	/* increase header size after 600px */
	@media all and (min-width: 600px) {
		.blockquote h1 {
			font-size: 3rem;
			line-height: 1.2;
		}
		.blockquote h1:before {
			border: 2.5px solid var(--color-brand-secondary);
		}
	}

	/* Blockquote subheader */
	.blockquote h4 {
		position: relative;
		font-size: 1.3rem;
		font-weight: 400;
		line-height: 1.2;
		margin: 0;
		padding-top: 15px;
		z-index: 1;
		margin-left: 150px;
		padding-left: 12px;
	}

	.blockquote h4:first-letter {
		margin-left: -12px;
	}
</style>
