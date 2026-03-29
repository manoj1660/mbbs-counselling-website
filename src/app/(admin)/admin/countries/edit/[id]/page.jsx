"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditCountry() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/countries/${id}`);
        if (!res.ok) throw new Error("Data fetch error");
        const data = await res.json();
        setFormData(data);
        setPreview(data.image); // Purani image ko preview mein dikhayenge
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Nayi image select karte hi preview badlega
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("fee", formData.fee);
    data.append("students", formData.students);
    data.append("isTop", formData.isTop);
    if (file) data.append("file", file);

    try {
      const res = await fetch(`/api/admin/countries/${id}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        alert("Update Successful! 🎉");
        router.push("/admin/countries");
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-full text-blue-600 font-medium">Loading details...</div>;
  if (!formData) return <div className="text-center mt-20 text-red-500 font-bold">Country not found!</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/countries" className="p-2 hover:bg-gray-200 rounded-full transition">
          🔙
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-800">Edit {formData.name}</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Left Side: Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Country Name</label>
            <input type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Slug (Read-Only)</label>
            <input type="text" name="slug" value={formData.slug || ""} className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl text-gray-400 cursor-not-allowed" readOnly />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Fee Structure</label>
              <input type="text" name="fee" value={formData.fee || ""} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. 15L - 25L" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Student Count</label>
              <input type="text" name="students" value={formData.students || ""} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. 5000+" />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <input type="checkbox" name="isTop" id="isTop" checked={formData.isTop || false} onChange={handleChange} className="w-5 h-5 accent-blue-600" />
            <label htmlFor="isTop" className="text-sm font-bold text-blue-800 cursor-pointer">Mark as Top Featured Country</label>
          </div>
        </div>

        {/* Right Side: Image Upload & Preview */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-4 text-center">Country Image Preview</label>
            <div className="relative h-48 w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">No Image Uploaded</span>
              )}
            </div>
            <input type="file" onChange={handleFileChange} className="mt-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
          </div>

          <button type="submit" disabled={saving} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all disabled:bg-gray-300">
            {saving ? "Saving Changes..." : "Save Country Details"}
          </button>
        </div>
      </form>
    </div>
  );
}