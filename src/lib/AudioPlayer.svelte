<script lang="ts">
	// Audio file path (update this with your actual audio file)
	const audioSrc = '/Rex_Banner-RideoftheValkyries.mp3';

	// State variables using Svelte 5 runes
	let isPlaying = $state(false);
	let audio: HTMLAudioElement;

	// Initialize audio element when component mounts
	$effect(() => {
		audio = new Audio(audioSrc);

		// Configure audio
		audio.loop = true;
		audio.volume = 0.6;

		// Handle audio end event
		audio.addEventListener('ended', () => {
			isPlaying = false;
		});

		// Clean up on destroy
		return () => {
			if (audio) {
				audio.pause();
				audio.src = '';
			}
		};
	});

	// Toggle play/pause function
	function toggleAudio() {
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
		} else {
			audio.play().catch((error) => {
				console.error('Error playing audio:', error);
				isPlaying = false;
			});
		}

		isPlaying = !isPlaying;
	}
</script>

<div class="fixed top-4 right-4 z-50">
	<button
		class="rounded-full border border-white/10 bg-black/30 p-3 text-white backdrop-blur transition-all duration-300 hover:bg-black/40"
		onclick={toggleAudio}
		aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
		title={isPlaying ? 'Pause audio' : 'Play audio'}
	>
		{#if isPlaying}
			<!-- Pause Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-6 w-6"
			>
				<rect x="6" y="4" width="4" height="16"></rect>
				<rect x="14" y="4" width="4" height="16"></rect>
			</svg>
		{:else}
			<!-- Play Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-6 w-6"
			>
				<polygon points="5 3 19 12 5 21 5 3"></polygon>
			</svg>
		{/if}
	</button>
</div>
