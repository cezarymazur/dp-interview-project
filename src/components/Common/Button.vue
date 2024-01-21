<script setup lang="ts">
defineProps({
	label: String,
})
</script>

<template>
	<button
		class="w-full bg-blue-600 text-white py-3 font-medium my-12 rounded-md hover:bg-blue-500 transition-all duration-300 disabled:pointer-events-none disabled:bg-blue-400"
	>
		{{ label }}
	</button>
</template>
