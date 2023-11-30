import { sendRedirect } from "h3";

export default function useExternalRedirect(url:string, code:number = 302) {
    // Cek jika url adalah url yang valid
    if(/^(https?:\/\/)/.test(url)){
        // Cek jika di dalam server
        if(process.server){
            const nuxtApp = useNuxtApp();
            if(nuxtApp.ssrContext && nuxtApp.ssrContext.event){
                return nuxtApp.callHook("app:redirected").then(() => {
                    if(nuxtApp.ssrContext && nuxtApp.ssrContext.event){
                        return sendRedirect(nuxtApp.ssrContext.event, url, code);
                    }
                })
            }
        }else{
            window.location.href = url;
        }
    }else{
        throw new Error('URL tidak valid');
    }

}