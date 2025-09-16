"use client";

import { TimerIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CountDown = ({ endTime }: { endTime: string}) => {
    const [timeleft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const end = new Date(endTime).getTime();
            const now = Date.now();
            const diff = end - now;

            if(diff <= 0){
                setTimeLeft("Auction ended");
                clearInterval(timer);
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`)
            }

        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return <div className="flex items-center"><TimerIcon className="text-orange-400" size={20} /> <h1 className="text-lg ps-2 text-slate-600 font-semibold">{timeleft}</h1></div>
}

export default CountDown