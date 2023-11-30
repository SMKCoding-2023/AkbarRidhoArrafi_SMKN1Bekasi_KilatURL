<script lang="ts" setup>
const user = useSupabaseUser();

const auth = useSupabaseClient();

const Logout = () => {
    if (confirm("Anda yakin ingin keluar?") == true) {
        auth.auth.signOut();
        useRouter().push({
            name: "index",
        });
    }
};
</script>

<template>
    <div class="fixed bg-black top-0 left-0 right-0 border-b border-white/20 bg-blur z-50">
        <nav class="container py-4 flex justify-between">
            <NuxtLink :to="{name:'index'}" class="text-2xl font-bold text-white">Kilat URL</NuxtLink>
            <ul class="flex items-center gap-4">
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink v-if="user" :to="{
                        name: 'dashboard'
                    }" class="btn btn-primary">Dashboard</NuxtLink>
                    <NuxtLink v-else :to="{
                        name: 'auth'
                    }" class="btn btn-primary">Sign In</NuxtLink>
                </li>
                <li v-if="user">
                    <button @click="Logout">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>