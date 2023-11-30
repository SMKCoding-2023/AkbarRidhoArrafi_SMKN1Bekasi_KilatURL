<script lang="ts" setup>
import geoip from "geoip-lite";
import type { Database } from "~~/types/supabase";

const client = useSupabaseClient<Database>();
const params = useRoute().params;

if(!params.id){
  throw createError({
    statusCode: 404,
    message: "not found"
  })
}

const {data} = await useAsyncData("link", async () => {
  const {data,error} = await client.from("links").select("*").eq("key", params.id).single();

  if(error){
    throw createError({
      statusCode: 404, 
      message: "not found"
    })
  }

  return data;
});

if(data.value?.long_url){
  const ua = useUserAgent();

  if(ua && ua.ip){
    const location = geoip.lookup(ua.ip);
    await client.from("clicks").insert({
      link_id: data.value.id,
      ip: ua.ip,
      country: location?.country,
      city: location?.city,
      user_agent: ua.userAgent,
    })
  }
  useExternalRedirect(data.value?.long_url);
}
</script>

<template>
  <div class="grid place-content-center h-screen">Redirecting...</div>
</template>