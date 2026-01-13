
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
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Token ${accessToken}`,
            },
            body: formData
        });
        const data = await res.json();
            
        if(!res.ok){
            return { "success": false, "message": "An error occured " }
        }

        return data
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
    },


    images: async function(url: string, id: string, images: File[]): Promise<any>{
        let uploadedImages = 0;
        for(const image of images){
            const formData = new FormData();
            formData.append("listing", id);
            formData.append("image", image);
            

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                

                if (!res.ok) {
                    throw new Error(data.message || "Image upload failed");
                } else {
                    uploadedImages += 1;
                }

                if(uploadedImages === images.length){
                    return { "success": true, "message": "Upload successful" }
                }

            } catch (e) {
                return { "success": false, "message": "An error occured " + e }
            }
        }
    },


    sparesimages: async function (url: string, id: string, images: File[]): Promise<any> {
        let uploadedImages = 0;

        for (const image of images) {
            const formData = new FormData();
            formData.append("spare_part", id);
            formData.append("image", image);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                    method: "POST",
                    body: formData,
                });

                console.log(res);
                const data = await res.json();


                if (!res.ok) {
                    throw new Error(data.message || "Image upload failed");
                } else {
                    uploadedImages += 1;
                }

                if (uploadedImages === images.length) {
                    return { "success": true, "message": "Upload successful" }
                }

            } catch (e) {
                return { "success": false, "message": "An error occured " + e }
            }
        }
    }
}

export default DealerApiService;