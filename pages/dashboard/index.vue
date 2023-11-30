<script lang="ts" setup>
import type { Database } from '~/types/supabase';

definePageMeta({
    middleware: 'auth',
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const {data, refresh} = useAsyncData('links', async () => {
    const {data, error} = await client.from('links')
        .select('*')    
        .eq('user_id', user.value?.id);
    return data;
})
</script>

<template>
    <main class="pt-28">
        <section class="container">
            <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        </section>
        <section class="container flex gap-5 mt-10">
            <div class="container">
                <LinkForm @created="refresh" />
            </div>
            <div class="container">
                <div class="card overflow-y-auto">  
                    <div class="text-center font-bold text-white mb-7">Hasil Kilat</div>
                    <LinkItem @deleted="refresh" v-for="link in data" :key="link.id" :link="{
                        kilatKey: link.key,
                        longUrl: link.long_url || '',
                        id: link.id,
                        totalClicks: link.total_clicks || 0
                    }" class="mt-5 mb-5"/>
                </div>
            </div>
        </section>
        <section class="container mt-10">
        </section>
    </main>
</template>