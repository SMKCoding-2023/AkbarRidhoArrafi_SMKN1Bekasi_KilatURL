<script lang="ts" setup>

const supabaseAuth = useSupabaseClient();

const isLoggingIn = ref<boolean>(true);

const form = reactive({
    email: "",
    password: "",
});

const errors = ref<string>(" ");
const success = ref<string>(" ");

const githubLogin = () => {
    supabaseAuth.auth.signInWithOAuth({
        provider: 'github',
    });
}

const emailLogin = async () => {
    if(!form.email || !form.password){
        errors.value = "Tolong isi semua kolom";
        return;
    }

    if(!isLoggingIn.value){
        return emailSignup();
    }

    try{
        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        if(error) {
            errors.value = error.message;
            return;
        }

        if(data){
            useRouter().push('/dashboard');
        }
    } catch(err){
        errors.value = "Email atau password yang dimasukkan salah"
    }
}

const emailSignup = async () => {
    if(!form.email || !form.password){
        errors.value = "Tolong isi semua kolom";
        return;
    }

    try{
        const { data, error } = await supabaseAuth.auth.signUp({
            email: form.email,
            password: form.password,
        });

        if(error) {
            errors.value = error.message;
            return;
        }
        if(data){
            success.value = "Verfikasi untuk melanjutkan signup"
            return;
        }
    } catch(err){
        errors.value = "Email atau password yang dimasukkan salah"
    }
}

</script>

<template>
    <section class="h-screen grid place-content-center">
        <div class="container">
            <!-- Card -->
            <div class="card">
                <div class="flex justify-center">
                    <div class="flex justify-center w-20 h-20 items-center rounded-full border shadow-xl border-white/20">
                        <img src="~/assets/logo_blue_white.png" class="w-full" />
                    </div>
                </div>
                <button class="btn-primary py-3 w-full rounded-full mt-5" @click="githubLogin">Lanjut dengan Github</button>
                <hr class="border-white/10 my-8" />

                <form @submit.prevent="emailLogin">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="form.email" type="email" name="email" id="email" placeholder="akbar@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="form.password" type="password" name="password" id="password">
                    </div>
                    <button type="submit" class="btn-primary w-full py-3 rounded-full mt-2">
                        <template v-if="isLoggingIn">
                            Login
                        </template>
                        <template v-else>
                            Signup
                        </template>
                    </button>
                    <div class="text-center mt-5">
                        <button type="button" class="text-center" @click="isLoggingIn = !isLoggingIn">
                        <template v-if="isLoggingIn">
                            Tidak punya akun ? Signup
                        </template>
                        <template v-else>
                            Sudah ada akun ? Login
                        </template>
                        </button>
                    </div>
                    <div class="text-red-500 text-center mt-5">
                        {{ errors }}
                    </div>
                    <div class="text-green-500 text-center mt-5">
                        {{ success }}
                    </div>
                </form>
            </div>
        </div>
    </section>
    
</template>