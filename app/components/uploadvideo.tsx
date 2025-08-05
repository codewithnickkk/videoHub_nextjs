"use client";

import { useState } from "react";
import FileUpload from "../components/fileuploaded"; // Adjust path if needed
import Providers from "../components/providers";

type Video = {
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  controls?: boolean;
  transformation?: {
    quality?: number;
  };
};

export default function UploadVideo() {
  const [form, setForm] = useState<Video>({
    title: "",
    description: "",
    thumbnail_url: "",
    video_url: "",
    controls: true,
    transformation: {
      quality: 90,
    },
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"upload" | "form">("upload");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        alert("Error: " + result.error);
        return;
      }

      alert("Video uploaded successfully!");
      setForm({
        title: "",
        description: "",
        thumbnail_url: "",
        video_url: "",
        controls: true,
        transformation: { quality: 90 },
      });
      setStep("upload");
    } catch (error) {
      console.error("Error uploading video metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUploadSuccess = (url: string) => {
    setForm((prev) => ({
      ...prev,
      video_url: url,
      thumbnail_url: url + "?tr=w-400,h-300", // Optional thumbnail logic
    }));
    setStep("form");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {step === "upload" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-white">Step 1: Upload Video File</h1>
         <FileUpload onUploadSuccess={handleVideoUploadSuccess} />                      {/* Fileupload component used here */}
        </>
      )}

      {step === "form" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-white">Step 2: Add Video Info</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              className="border p-2 w-full"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Thumbnail URL"
              value={form.thumbnail_url}
              onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full bg-gray-200 cursor-not-allowed"
              placeholder="Video URL"
              value={form.video_url}
              readOnly
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit Metadata"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}



// "use client";

// import { useState } from "react";

// type Video = {
//   title: string;
//   description: string;
//   thumbnail_url: string;
//   video_url: string;
//   controls?: boolean;
//   transformation?: {
//     quality?: number;
//   };
// };

// export default function UploadVideo() {
//   const [form, setForm] = useState<Video>({
//     title: "",
//     description: "",
//     thumbnail_url: "",
//     video_url: "",
//     controls: true,
//     transformation: {
//       quality: 90,
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/video", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         alert("Error: " + result.error);
//         return;
//       }

//       alert("Video uploaded successfully!");
//       setForm({
//         title: "",
//         description: "",
//         thumbnail_url: "",
//         video_url: "",
//         controls: true,
//         transformation: { quality: 90 },
//       });
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Upload New Video</h1>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           className="border p-2 w-full"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />
//         <textarea
//           className="border p-2 w-full"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//         />
//         <input
//           type="text"
//           className="border p-2 w-full"
//           placeholder="Thumbnail URL"
//           value={form.thumbnail_url}
//           onChange={(e) =>
//             setForm({ ...form, thumbnail_url: e.target.value })
//           }
//         />
//         <input
//           type="text"
//           className="border p-2 w-full"
//           placeholder="Video URL"
//           value={form.video_url}
//           onChange={(e) =>
//             setForm({ ...form, video_url: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";

// type Video = {
//   title: string;
//   description: string;
//   thumbnail_url: string;
//   video_url: string;
//   controls?: boolean;
//   transformation?: {
//     quality?: number;
//   };
// };

// export default function UploadVideo() {
//   const [form, setForm] = useState<Video>({
//     title: "",
//     description: "",
//     thumbnail_url: "",
//     video_url: "",
//     controls: true,
//     transformation: {
//       quality: 90,
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/video", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         alert("Error: " + result.error);
//         return;
//       }

//       alert("Video uploaded successfully!");
//       setForm({
//         title: "",
//         description: "",
//         thumbnail_url: "",
//         video_url: "",
//         controls: true,
//         transformation: { quality: 90 },
//       });
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   return (
// //     <div className="p-4 max-w-xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-4">Upload New Video</h1>
// //       <form onSubmit={handleSubmit} className="space-y-3">
// //         <input
// //           type="text"
// //           className="border p-2 w-full"
// //           placeholder="Title"
// //           value={form.title}
// //           onChange={(e) => setForm({ ...form, title: e.target.value })}
// //         />
// //         <textarea
// //           className="border p-2 w-full"
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={(e) =>
// //             setForm({ ...form, description: e.target.value })
// //           }
// //         />
// //         <input
// //           type="text"
// //           className="border p-2 w-full"
// //           placeholder="Thumbnail URL"
// //           value={form.thumbnail_url}
// //           onChange={(e) =>
// //             setForm({ ...form, thumbnail_url: e.target.value })
// //           }
// //         />
// //         <input
// //           type="text"
// //           className="border p-2 w-full"
// //           placeholder="Video URL"
// //           value={form.video_url}
// //           onChange={(e) =>
// //             setForm({ ...form, video_url: e.target.value })
// //           }
// //         />
// //         <button
// //           type="submit"
// //           className="bg-green-600 text-white px-4 py-2 rounded"
// //           disabled={loading}
// //         >
// //           {loading ? "Uploading..." : "Upload"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
