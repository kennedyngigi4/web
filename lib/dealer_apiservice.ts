
const DealerApiService = {
    
    get: async function(url: string, accessToken: string): Promise<any>{
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${accessToken}`
                }
            });
        const data = await res.json();
        return data;
    },


    post: async function(url: string, accessToken: string, formData: any): Promise<any>{
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${accessToken}`
                },
                body: formData
            })
            .then(response => response)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },


    patch: async function(url: string, accessToken: string, formData: any): Promise<any>{
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Token ${accessToken}`,
                },
                body: formData
            })
            .then(response => response)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },



    delete: async function(url: string, accessToken: string): Promise<any>{
       try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${accessToken}`
                }
            })
            const data = res.json();
            return data;
        } catch(e){
            return { "success": false, "message": "An error occured "+e }
        }
    }
}

export default DealerApiService;