import {CircleAlert} from 'lucide-react'
import React from 'react'


export default function LinkExpiredPage () {
    return (
        <div className="min-h-screen mt-28 flex items-start justify-center bg-primary">
            <div className=" w-11/12 md:max-w-2xl bg-gray-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <CircleAlert className='text-red-700' />
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Link Expired</h2>
                    <p className="text-center text-gray-600 mb-4">
                        We're sorry, but the link you've tried to access has expired.
                    </p>
                </div>
            </div>
        </div>
    )
}

