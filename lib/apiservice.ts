"use client";


const ApiServices = {
    post: async function(url: string, data: any): Promise<any>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return res.json();
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


