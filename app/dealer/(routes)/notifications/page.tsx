"use client";

import DealerApiService from '@/lib/dealer_apiservice';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Notifications = () => {
  const { data:session } = useSession();
  const [ notifications, setNotifications ] = useState([]);

  useEffect(() => {
    const loadNotifications = async() => {

      if(!session?.accessToken){
        throw new Error("You must be logged in.");
      }

      const data = await DealerApiService.get("marketing/dealer_notifications", session?.accessToken);
      setNotifications(data);
    }
    loadNotifications();
  }, [session]);

  return (
    <section className="flex flex-col space-y-5 py-4">
      <div className="">
        <h1 className="font-semibold text-xl">Notifications</h1>
      </div>

      <div>

        {notifications.length > 0  ? (
          <>
            {notifications.map((notification: any) => (
              <div className="bg-white p-2 rounded-xl mb-2 shadow" key={notification.id}>
                <h1 className="text-orange-400 text-sm font-semibold">{notification.title}</h1>
                <p className="text-sm text-slate-500 truncate">{notification.message}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-white p-2 rounded-xl shadow">
            <p className="text-slate-500 text-sm">No notifications</p>
          </div>
        )}

        
      </div>
    </section>
  )
}

export default Notifications