<script setup lang="ts">
import { computed, defineProps } from 'vue'

// SVG components
import RefreshIcon from './icons/RefreshIcon.vue'
import BellIcon from './icons/BellIcon.vue'
import ShareIcon from './icons/ShareIcon.vue'
import PlusIcon from './icons/PlusIcon.vue'

type TypeOptions = 'primary' | 'secondary'
type IconOptions = 'refresh' | 'bell' | 'share' | 'plus'

const props = defineProps<{
    title: string
    type?: TypeOptions
    icon?: IconOptions
}>()

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
}>()

const buttonType = computed(() => props.type ?? 'primary')

// map string to component
const iconMap: Record<IconOptions, any> = {
    refresh: RefreshIcon,
    bell: BellIcon,
    share: ShareIcon,
    plus: PlusIcon,
}

const resolvedIcon = computed(() => (props.icon ? iconMap[props.icon] : null))

const buttonClass = computed(() =>
    buttonType.value === 'primary'
        ? 'text-[#4EBBD8] bg-white hover:bg-[#4EBBD8] hover:text-white'
        : 'text-white bg-[#4EBBD8] hover:bg-white hover:text-[#4EBBD8]'
)

const iconClass = computed(() =>
    buttonType.value === 'primary'
        ? 'fill-[#4EBBD8] group-hover:fill-white'
        : 'fill-white group-hover:fill-[#4EBBD8]'
)
</script>

<template>
    <button @click="(e) => emit('click', e)"
        :class="`group flex flex-row gap-2 justify-center items-center cursor-pointer outline rounded py-2 px-4 ${buttonClass}`">
        <!-- Render the component from icon map -->
        <component v-if="resolvedIcon" :is="resolvedIcon" :class="`w-4 h-4 ${iconClass}`" />
        <slot />
        {{ title }}
    </button>
</template>
