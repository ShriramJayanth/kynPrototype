"use client";

import React, { useState } from "react";

const PostForm: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);



  const handleTextSubmit = async () => {
    const response = await fetch(`http://13.200.235.10:3003/moderate/text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return response.json();
  };

  const handleImageSubmit = async () => {
    if (!imageFile) return { flagged: false };
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`http://13.200.235.10:3003/moderate/image`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  };

  const handleVideoSubmit = async () => {
    if (!videoFile) return { flagged: false };
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await fetch(`http://13.200.235.10:3003/moderate/video`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() === "" && !imageFile && !videoFile) return;

    let flagged = false;

    if (text.trim() !== "") {
      const textResult = await handleTextSubmit();
      if (textResult.flagged) {
        flagged = true;
      }
    }


    if (!flagged) {

      if (imageFile) {
        const imageResult = await handleImageSubmit();
        if (imageResult.flagged) flagged = true;
      }

      if (!flagged && videoFile) {
        const videoResult = await handleVideoSubmit();
        if (videoResult.flagged) flagged = true;
      }
    }

    if (flagged) {
      alert("Your post was flagged. Please review the content.");
      const userResponse = await fetch(`http://13.200.235.10:3003/moderate/flag`);
    } else {
      alert("Your post was submitted successfully!");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-white text-xl font-bold">Content Moderation prototype</h1>
          <span className="text-white font-medium">
            Welcome user
          </span>
        </div>
      </nav>

      {/* Post Form */}
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Create a Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-lg font-medium text-gray-700">
              Post Text
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="What's on your mind?"
              className="w-full mt-2 p-3 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">
              Add Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files ? e.target.files[0] : null);
              }}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="video" className="block text-lg font-medium text-gray-700">
              Add Video
            </label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={(e) => {
                setVideoFile(e.target.files ? e.target.files[0] : null);
              }}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-600`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostForm;
