"use client"
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { DeleteIcon } from '../../../../../../public/icons/icons'
const UploadEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        event_desc: '',
        event_image: '',
    });
    const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const uploadImg = async (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            toast.error("Please select an image to upload.");
            return;
        }
        const filename = file.name;
        setProgress(0);
        try {
            const res = await fetch(`/api/s3upload?file=${filename}`);
            const resData = await res.json();
            const presignedUrl = resData.data?.presignedUrl;
            if (!presignedUrl) {
                toast.error("Failed to get presigned URL.");
                return;
            }
            toast.success("Please wait, image is uploading...");

            const config = {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (progressEvent) => {
                    var percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log(percentCompleted)
                    setProgress(percentCompleted);
                },
            };

            const fileUpload = await axios.put(presignedUrl, file, config);

            if (fileUpload.status === 200) {
                setFormData({
                    ...formData,
                    event_image: filename,
                });
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("An error occurred during upload. Please try again.");
        }

    };
    const removeimage = () => {
        console.log(formData.event_image)
        setProgress(0)
        setFormData({
            ...formData,
            event_image: "",
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        fetch('/api/uploadevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                toast.success('Event Added  successful');
            })
            .catch(error => {
                toast.error('Error uploading event:', error);
            });
            setFormData({
                title: '',
                date: '',
                event_desc: '',
                event_image:''
            });

    }
    return (
        <>
            <div class="max-w-md mx-auto mt-8" >
                <form class="space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Event Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>


                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Event Image</label>
                        <input
                            type="file"
                            id="image"
                            name="event_image"
                            class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={uploadImg}
                        />

                        {progress > 0 ? <div className="flex items-center">
                            <div className="w-full mr-4">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                Progress
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-blue-600">
                                                {progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                        <div
                                            style={{ width: `${progress}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={removeimage}>
                                {progress == 100 ? <DeleteIcon stroke="#252525" width={28} height={28} /> : null}
                            </div>
                        </div> : null}
                    </div>


                    <div>
                        <label for="date" class="block text-sm font-medium text-gray-700">Event Date</label>
                        <input
                            type="date"
                            id="date" name="date"
                            class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label for="company_desc" class="block text-sm font-medium text-gray-700">Event Description</label>
                        <textarea
                            id="company_desc"
                            name="event_desc"
                            rows="4"
                            class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.event_desc}
                            onChange={handleChange}
                        ></textarea>
                    </div>


                    <div>
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload Event
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default UploadEvent;
