"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ApiServices from '@/lib/apiservice';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';


type Props = {
    uid: string;
    token: string;
};

const ResetClient = ({ uid, token }: Props) => {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [togglePassword, setTogglePassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("token", token);
        formData.append("new_password", newPassword);

        const res = await ApiServices.post('account/reset-password/', formData);
        console.log(res);
        if (res.success) {
            toast.success(res.message);
            router.push("/signin");
        } else {
            toast.error(res.message);
        }

        setLoading(true);
        router.refresh();
    }

    return (
        <section className="min-h-screen">
            <div className="max-w-md mx-auto mt-20 p-6 rounded shadow ">
                <h2 className="text-lg font-semibold mb-5">Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <Input
                            type={togglePassword ? "text" : "password"}
                            placeholder="New Password"
                            className="w-full mb-4 p-2 border rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <div className="absolute top-2 right-2 z-50 text-slate-400 cursor-pointer" onClick={() => setTogglePassword(prev => !prev)}>
                            {!togglePassword ? (
                                <EyeClosed className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}

                        </div>
                    </div>
                    <div className="relative">
                        <Input
                            type={togglePassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full mb-4 p-2 border rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className="absolute top-2 right-2 z-50 text-slate-400 cursor-pointer" onClick={() => setTogglePassword(prev => !prev)}>
                            {!togglePassword ? (
                                <EyeClosed className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}

                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-400 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Resetting ..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default ResetClient