import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UniversityDetail from "@/models/UniversityDetail";
import University from "@/models/University"; // Card sync ke liye
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Auth Check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const body = await req.json();
    
    // Destructuring new fields including detailedContent
    const { 
      oldSlug, 
      newSlug, 
      seo, 
      imageAlt, 
      rating, 
      courseDuration,
      detailedContent, // <--- NAYA FIELD TIPTAP KE LIYE
      ...otherData 
    } = body;

    if (!newSlug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 2. Update University Detail (Deep Info + SEO + Rich Text)
    const updatedDetail = await UniversityDetail.findOneAndUpdate(
      { slug: oldSlug || newSlug },
      { 
        ...otherData, 
        slug: newSlug,
        seo,              // Meta title, desc, keywords
        imageAlt,         // For Image SEO
        rating,           // For Schema
        courseDuration,   // For Schema
        detailedContent,  // <--- ISSE DATA SAVE HOGA (HTML String)
        updatedAt: Date.now() 
      },
      { new: true, upsert: true, runValidators: true }
    );

    // 3. ⚡ Sync Slug with University Card (To prevent 404)
    // Card sync mein hum sirf basic info rakhte hain
    if (oldSlug) {
      await University.findOneAndUpdate(
        { slug: oldSlug },
        { 
          slug: newSlug,
          name: otherData.name,
          // Card par agar location ya image badli hai toh wo bhi sync kar sakte hain
          location: otherData.location,
          image: otherData.image
        }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "University details, SEO & Rich Text updated successfully! ✅",
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