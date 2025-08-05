"use client";


const ApiServices = {
    post: async function(url: string, data: any): Promise<any>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                body: data,
            });

            

            const resdata = await res.json();
            console.log(resdata);
            return resdata;

        } catch(e){
            return { "success": false, "message": e }
        }
    },


    get: async function(url: string): Promise<any>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = res.json();

            if(res.ok){
                return data;
            }
        } catch(e){
            return { "success": false, "message": e }
        }
    }
}


export default ApiServices


