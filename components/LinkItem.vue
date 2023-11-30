<script lang="ts" setup>
import type { Database } from '~/types/supabase';

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const props = defineProps<{
    link: {
        kilatKey: string;
        longUrl: string;
        id: number;
        totalClicks: number;
    };
}>();

const emit = defineEmits(["deleted"]);
const config = useRuntimeConfig();

const copyLink = () => {
    navigator.clipboard.writeText(`${config.public.appUrl}/${props.link.kilatKey}`);
    alert("Tersalin");
}

const deleteLink = async () => {
    try{
        if(confirm("Yakin ingin dihapus?") == true){
            const {data, error} = await client.from('links').delete().eq("id", props.link.id);
            if(error){
                alert(error.message);
                return;
            }
        }

        emit("deleted", 1);
    }catch(e){
        console.log(e);
    }
}
</script>

<template>
    <div class="border-b border-white/50 flex justify-between">
        <div class="link-info mb-5">
            <NuxtLink class="text-indigo-600 font-bold text-2xl">/{{ link.kilatKey }}</NuxtLink>
            <div class="text-sm text-white/40">{{ link.longUrl.slice(0, 20) + "...." }}</div>
        </div>
        <div class="flex gap-2 mb-5 items-center">
            <div class="text-xl inline-flex mx-2">
                {{ link.totalClicks }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2 mt-0.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            </div>
            <button class="btn-primary w-12 h-12 grid place-content-center rounded-full" @click="deleteLink">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            <button class="btn-primary w-12 h-12 grid place-content-center rounded-full" @click="copyLink">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            </button>
        </div>
    </div>
</template>