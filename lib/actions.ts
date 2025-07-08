"use server"

import { signIn, signOut } from "@/auth"
import { auth } from "../auth"


export const userRegistration = async(registrationData: any) => {
    try{
        const url = `${process.env.APIURL}/account/register/`;
        console.log(url);
        const res = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(registrationData),
        });
        const user =  await res.json();
        console.log(user);
        if(user.success){
            
            const res = await signIn("credentials", { email: registrationData.email, password: registrationData.password, redirect: false });
            if (res?.error) {
                return { "success": false, "message": "Email or Password is invalid!" }
            } else {
                return { "success": true, "message": "Login successful!" }
            }
            
        } else {
            return { "success": false, "message": "Something went wrong" }
        }
    } catch(e){
        return { "success": false, "message": "Something went wrong "+e }
    }
} 




export async function loginUser(email: string, password: string): Promise<any> {

    try{
        const res = await signIn("credentials", { email: email, password: password, redirect: false });
        if(res?.error){
            return { "success": false, "message": "Email or Password is invalid!" }
        } else {
            return { "success": true, "message": "Login successful!" }
        }

        

    } catch(e){
        return { error: "Something went wrong. "+e };
    }
    
}


export async function logoutUser(){
    await signOut();
}




export async function vehicleUpload(formData: any){
    // Dealer upload vehicle

    const session = await auth();

    try{
        const res = await fetch(`${process.env.APIURL}/dealers/upload`, {
            method: "POST",
            headers: { 
                "Authorization": `Token ${session?.accessToken}`,
            },
            body: formData
        });
        const data = await res.json();
        
        if(data.success){
            return { "success": true, "message": data.message, "id": data.listing_id };
        } else {
            return { "success": false, "message": data.message };
        }
        
        
    } catch(e){
        return { "success": false, "message": "Something went wrong "+e }
    }

}








