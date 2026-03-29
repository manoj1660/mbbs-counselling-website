"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCountry() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    fee: "",
    students: "",
    isTop: false,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("fee", formData.fee);
    data.append("students", formData.students);
    data.append("isTop", formData.isTop);

    try {
      const res = await fetch("/api/admin/countries/add", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Country added successfully!");
        router.push("/admin/countries"); // Redirect to list page
      } else {
        alert("Kuch gadbad ho gayi!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Country</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Country Name</label>
          <input type="text" name="name" onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. Russia" />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug (Unique ID)</label>
          <input type="text" name="slug" onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. russia" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Fee Range</label>
            <input type="text" name="fee" onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. 15L - 20L" />
          </div>
          <div>
            <label className="block text-sm font-medium">Students Count</label>
            <input type="text" name="students" onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. 5000+" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Country Image (Flag/Landscape)</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="w-full p-2" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isTop" onChange={handleChange} id="isTop" />
          <label htmlFor="isTop" className="text-sm font-medium">Mark as Top Country</label>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400">
          {loading ? "Uploading..." : "Save Country"}
        </button>
      </form>
    </div>
  );
}