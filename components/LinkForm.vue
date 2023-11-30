<script lang="ts" setup>
import type { Database } from '~/types/supabase';
import {nanoid} from 'nanoid';

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const form = reactive({
    longUrl: "",
    kliatKey: "",
});

const emit = defineEmits(["created"]);

const kilatLinkForm = async () => {
    try{
        const {data, error} = await client.from('links').insert({
            long_url: form.longUrl,
            key: form.kliatKey,
            user_id: user.value?.id
        });

        if(error){
            alert(error.message);
            return;
        }
        
        createKilatKey();
        form.longUrl = "";
        alert("Link berhasil dibuat");

        emit("created", 1);
    }catch(e){
        console.log(e);
    }
}

const createKilatKey = (len:number = 5):void => {
    form.kliatKey = nanoid(len);
}

onMounted( () => {
    createKilatKey();
})

</script>

<template>
    <div class="card">
        <form @submit.prevent="kilatLinkForm">
            <div class="flex gap-7 mb-3">
                <div class="w-full">
                    <label for="url" class="text-white">Long URL</label>
                    <input v-model="form.longUrl" type="text" id="longUrl" placeholder="https://youtube.com/akbar" />
                </div>
            </div>
            <div class="w-full mt-5">
                <button class="btn-primary py-2 rounded-lg w-full">Kilat</button>
            </div>
        </form>
    </div>
</template>