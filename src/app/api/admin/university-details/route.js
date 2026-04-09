import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UniversityDetail from "@/models/UniversityDetail";
import University from "@/models/University"; 
import cloudinary from "@/lib/cloudinary"; 
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Admin Check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    // 2. FormData receive karna (Same as your second code)
    const formData = await req.formData();
    
    const oldSlug = formData.get("oldSlug");
    const newSlug = formData.get("newSlug");
    const file = formData.get("file"); // Image file from input

    // Saara data ek object mein compile karna
    const updateData = {
      slug: newSlug,
      name: formData.get("name"),
      location: formData.get("location"),
      imageAlt: formData.get("imageAlt"),
      rating: formData.get("rating"),
      courseDuration: formData.get("courseDuration"),
      detailedContent: formData.get("detailedContent"),
      websiteUrl: formData.get("websiteUrl"), // <--- Aapka naya field
      seo: JSON.parse(formData.get("seo") || "{}"), 
      updatedAt: Date.now()
    };

    if (!newSlug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 3. ⚡ Cloudinary Upload Logic (Same as your second code)
    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "mission_global/details" },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(buffer);
      });
      
      updateData.image = uploadRes.secure_url; // Naya Cloudinary URL mil gaya
    } else {
      // Agar nayi file nahi hai, toh purana image URL use karein jo hidden input se aayega
      updateData.image = formData.get("image"); 
    }

    // 4. Update University Detail Page
    const updatedDetail = await UniversityDetail.findOneAndUpdate(
      { slug: oldSlug || newSlug },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    // 5. ⚡ Sync with University Card (To prevent 404)
    if (oldSlug) {
      await University.findOneAndUpdate(
        { slug: oldSlug },
        { 
          slug: newSlug,
          name: updateData.name,
          location: updateData.location,
          image: updateData.image // Cloudinary URL sync ho raha hai
        }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Details, Image & Website Link Updated! ✅",
      data: updatedDetail 
    }, { status: 200 });

  } catch (error) {
    console.error("ADMIN_DETAILS_POST_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
















// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import UniversityDetail from "@/models/UniversityDetail";
// import University from "@/models/University"; // Card sync ke liye
// import { isAdmin } from "@/lib/isAdmin";

// export async function POST(req) {
//   try {
//     await connectDB();

//     // 1. Auth Check
//     const auth = isAdmin(req);
//     if (!auth.ok) return auth.response;

//     const body = await req.json();
    
//     // Destructuring fields including the NEW websiteUrl
//     const { 
//       oldSlug, 
//       newSlug, 
//       seo, 
//       imageAlt, 
//       rating, 
//       courseDuration,
//       detailedContent, 
//       websiteUrl,      // <--- NAYA FIELD RECEIVE KIYA
//       ...otherData 
//     } = body;

//     if (!newSlug) {
//       return NextResponse.json({ error: "Slug is required" }, { status: 400 });
//     }

//     // 2. Update University Detail (Deep Info + SEO + Rich Text + Website Link)
//     const updatedDetail = await UniversityDetail.findOneAndUpdate(
//       { slug: oldSlug || newSlug },
//       { 
//         ...otherData, 
//         slug: newSlug,
//         seo,              // Meta title, desc, keywords
//         imageAlt,         // For Image SEO
//         rating,           // For Schema
//         courseDuration,   // For Schema
//         detailedContent,  // HTML String from Tiptap
//         websiteUrl,       // <--- ISSE WEBSITE LINK SAVE HOGA
//         updatedAt: Date.now() 
//       },
//       { new: true, upsert: true, runValidators: true }
//     );

//     // 3. ⚡ Sync Slug with University Card (To prevent 404)
//     if (oldSlug) {
//       await University.findOneAndUpdate(
//         { slug: oldSlug },
//         { 
//           slug: newSlug,
//           name: otherData.name,
//           location: otherData.location,
//           image: otherData.image
//         }
//       );
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: "University details, SEO & Website Link updated successfully! ✅",
//       data: updatedDetail 
//     }, { status: 200 });

//   } catch (error) {
//     console.error("ADMIN_DETAILS_POST_ERROR:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import UniversityDetail from "@/models/UniversityDetail";
// import University from "@/models/University"; // Card sync ke liye zaroori hai
// import { isAdmin } from "@/lib/isAdmin";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const auth = isAdmin(req);
//     if (!auth.ok) return auth.response;

//     const body = await req.json();
    
//     // Frontend se hum oldSlug (jo URL mein tha) aur newSlug (jo user ne edit kiya) bhej rahe hain
//     const { oldSlug, newSlug } = body;

//     if (!newSlug) {
//       return NextResponse.json({ error: "Slug is required" }, { status: 400 });
//     }

//     // 1. Pehle University Detail update karo
//     // Hum oldSlug se dhoondenge aur naye data (jisme naya slug bhi hai) se update karenge
//     const data = await UniversityDetail.findOneAndUpdate(
//       { slug: oldSlug || newSlug }, // Agar oldSlug nahi hai (naya create ho raha hai), toh newSlug use karein
//       { 
//         ...body, 
//         slug: newSlug, // Slug update ho raha hai yahan
//         updatedAt: Date.now() 
//       },
//       { new: true, upsert: true, runValidators: true }
//     );

//     // 2. ⚡ SABSE IMPORTANT: University Card ka slug bhi update karo
//     // Agar card ka slug detail se alag ho gaya, toh link 404 ho jayega
//     if (oldSlug && oldSlug !== newSlug) {
//       await University.findOneAndUpdate(
//         { slug: oldSlug },
//         { slug: newSlug }
//       );
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: "University details and URL updated successfully! ✅",
//       data 
//     }, { status: 200 });

//   } catch (error) {
//     console.error("ADMIN_DETAILS_POST_ERROR:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }