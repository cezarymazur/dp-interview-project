<script setup lang="ts">
defineProps({
	data: Object,
})
</script>

<template>
	<div class="flex flex-col justify-center flex-shrink w-[100px]">
		<div class="flex flex-col mb-3 w-auto">
			<div class="font-medium">{{ data!.name }}</div>
			<div class="text-sm font-medium opacity-50">{{ data!.dayNumber }}</div>
		</div>
		<div v-for="hour in data!.hours" :key="hour.Start" class="mb-4">
			<input :id="hour.Start" class="peer/radio opacity-0" type="radio" name="date" :disabled="hour.Taken" />
			<label
				:for="hour.Start"
				@click="$emit('setNewDate', hour.Start, hour.End)"
				class="font-semibold bg-blue-50 text-blue-600 px-2 py-1 lg:px-4 lg:py-2 rounded-md text-sm lg:text-lg border border-transparent hover:border-blue-600 cursor-pointer transition-all duration-300 peer-checked/radio:bg-blue-600 peer-checked/radio:text-white peer-disabled/radio:bg-transparent peer-disabled/radio:text-gray-300 peer-disabled/radio:font-light peer-disabled/radio:line-through peer-disabled/radio:hover:border-transparent peer-disabled/radio:pointer-events-none"
				>{{ hour.exactStartHour }}</label
			>
		</div>
	</div>
</template>
