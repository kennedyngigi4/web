// lib/api.ts

export async function fetchVehicle(vehicleId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/all/${vehicleId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store", 
        });

        const data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}



export async function fetchAuctionVehicle(vehicleId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/auctions/${vehicleId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}


export async function fetchSparePart(spareId: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listings/spares/${spareId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store"
        });
        const data = await res.json();
        return data;
    } catch(e){
        console.error(e);
        return null;
    }
}


