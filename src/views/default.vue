<script setup lang="ts">
import CalendarComponent from '../components/Calendar/CalendarComponent.vue'
import ConfirmDateComponent from '../components/ConfirmDate/ConfirmDateComponent.vue'
import CurrentDateComponent from '../components/CurrentDate/CurrentDateComponent.vue'
import BottomBarComponent from '../components/BottomBar/BottomBarComponent.vue'
</script>

<template>
	<section id="main" class="max-w-7xl mx-auto px-5 py-20">
		<CurrentDateComponent />
		<CalendarComponent />
		<ConfirmDateComponent />
	</section>
	<BottomBarComponent />
</template>
