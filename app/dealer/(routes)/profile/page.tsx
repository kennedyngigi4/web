"use client"

import React, { useEffect, useRef, useState } from 'react'
import PersonalNameForm from './_components/personal_name_form'
import EmailForm from './_components/email_form'
import PhoneForm from './_components/phone_form'
import GenderForm from './_components/gender_form'
import { useSession } from 'next-auth/react'
import BusinessNameForm from './_components/business/name_form'
import BusinessEmailForm from './_components/business/email_form'
import BusinessPhoneForm from './_components/business/phone_form'
import BusinessWebsiteForm from './_components/business/website_form'
import BusinessLocationForm from './_components/business/address_form'
import FacebookForm from './_components/business/facebook_form'
import InstagramForm from './_components/business/instagram_form'
import TiktokForm from './_components/business/tiktok_form'
import TwitterForm from './_components/business/twitter_form'
import LinkedInForm from './_components/business/linkedin_form'
import YoutubeForm from './_components/business/youtube_form'
import { Button } from '@/components/ui/button'
import { Camera, ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import DealerApiService from '@/lib/dealer_apiservice'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const ProfilePage = () => {
  const { data:session, status } = useSession();
  const [ userData, setUserData ] = useState<any>({});
  const router = useRouter()
  const [isReady, setIsReady] = useState(false);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async() => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/account/profile/`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${session?.accessToken}`
        }
      });
      const data = await res.json()
      setUserData(data);
    }
    fetchProfile();
  }, [session]);


  useEffect(() => {
      if (status === "loading" ) return;

      if (status === "unauthenticated") {
          router.push("/signin");
      } else {
          setIsReady(true);
      }
  }, [status, router]);

  if(!isReady){
      return <div className="flex w-full h-screen justify-center items-center">
          <Image src="/animations/car.gif" alt="Loader" width={100} height={100} />
      </div>;
  }

  const handleBannerUpload = async () => {
    bannerInputRef.current.click();
  }

  const handleFileChange = async(e: any) => {
    const file = e.target.files[0];

    if(!session?.accessToken){
      throw new Error("You must be logged in");
    }

    if(file){
      const formData = new FormData();
      formData.append("banner", file);
      const res = await DealerApiService.patch(`account/dealers/business_update/${userData.business.id}`, session?.accessToken, formData);
      if(res.ok){
        toast.success("Update successful!", { position: "top-center"});
        window.location.reload();
      } else {
        toast.error("An error occurred.", { position: "top-center" });
        window.location.reload();
      }
    }
  }

  

  return (
    <section>
      <div
        className={cn(
          "col-span-9 relative h-[190px] overflow-hidden rounded-b-2xl",
          !userData?.business?.banner && "bg-gray-100"
        )}
      >
        {userData?.business?.banner && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASEURL}${userData.business.banner.startsWith('/') ? '' : '/'
              }${userData.business.banner}`}
            alt="Business banner"
            fill
            className="object-cover"

            unoptimized={process.env.NODE_ENV !== 'production'} // Bypass optimization in dev
          />
        )}

        {/* Your existing overlay content */}
        <div className="absolute bottom-4 left-4">
          <div className="h-24 w-24 rounded-full bg-gray-300 relative border-4 border-white">
            <div className="absolute right-1 bottom-1">
              <Camera className="w-8 h-8 bg-white p-1.5 shadow cursor-pointer rounded-full text-gray-600" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          
          <Input type="file" ref={bannerInputRef} onChange={handleFileChange} accept="image/*" className='hidden' />
          <Button onClick={handleBannerUpload} className="bg-orange-500 hover:bg-orange-700 cursor-pointer px-3 py-1.5 text-sm"><ImageIcon className="w-4 h-4" /> 
            {userData?.business?.banner ? "Change" : "Add cover"}
          </Button>
        </div>
      </div>

      <section className="p-6 min-h-screen">
        
        <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
          <div className="col-span-12">
            <div className="flex flex-col space-y-14">
              <div className="flex flex-col space-y-8">
                <h1 className="text-orange-400 font-bold">Personal settings</h1>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <PersonalNameForm 
                    name={userData?.name}
                  />
                  <EmailForm 
                    initialData={userData?.email}
                  />
                  <PhoneForm 
                    initialData={userData?.phone}
                  />
                  <GenderForm 
                    initialData={userData?.gender}
                  />
                </div>

              </div>

              <div>
                <div className="pb-8">
                  <h1 className="text-orange-400 font-bold">Business settings</h1>
                  <p className="text-xs text-slate-500">Ensure your business details are accurate for prospects to easily connect with you.</p>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <BusinessNameForm 
                    initialData={userData?.business?.name}
                    business_id={userData?.business?.id}
                  />
                  <BusinessEmailForm
                    initialData={userData?.business?.email}
                    business_id={userData?.business?.id}
                  />
                  <BusinessPhoneForm
                    initialData={userData?.business?.phone}
                    business_id={userData?.business?.id}
                  />
                  <BusinessWebsiteForm
                    initialData={userData?.business?.website}
                    business_id={userData?.business?.id}
                  />
                  <BusinessLocationForm 
                    initialData={userData?.business?.address}
                    business_id={userData?.business?.id}
                  />
                </div>


                <div className="pt-8">
                  <h3 className="pb-3 text-orange-500">Social media links</h3>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <FacebookForm
                      initialData={userData?.business?.facebook}
                      business_id={userData?.business?.id}
                    />
                    <InstagramForm
                      initialData={userData?.business?.instagram}
                      business_id={userData?.business?.id}
                    />
                    <TiktokForm
                      initialData={userData?.business?.tiktok}
                      business_id={userData?.business?.id}
                    />
                    <TwitterForm
                      initialData={userData?.business?.twitter}
                      business_id={userData?.business?.id}
                    />
                    <LinkedInForm
                      initialData={userData?.business?.linkedin}
                      business_id={userData?.business?.id}
                    />
                    <YoutubeForm
                      initialData={userData?.business?.youtube}
                      business_id={userData?.business?.id}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ProfilePage