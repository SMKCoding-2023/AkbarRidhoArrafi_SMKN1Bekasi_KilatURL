<template>
    <section class="h-screen grid place-content-center">
        <div class="flex justify-center items-center">
            <div class="w-6/12">
                <h1 class="text-5xl font-bold">Buat link anda mudah ditemukan dengan Kilat URL</h1>
                <p class="text-lg w-10/12 my-5">Ubah web panjang anda menjadi lebih pendek dan mudah dibagikan dengan Kilat URL</p>
                <NuxtLink to="/dashboard" class="btn btn-primary">Kilat Sekarang!</NuxtLink>
            </div>
            <div class="w-2/12 flex justify-center items-center border rounded-full shadow-xl border-white/50">
                <img src="~/assets/logo_blue_white.png" class="w-full" />
            </div>
        </div>
    </section>
</template>

<style>
.heading{
    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0) 189%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>