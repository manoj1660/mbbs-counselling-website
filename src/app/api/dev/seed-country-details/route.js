import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UniversityDetail from "@/models/UniversityDetail";
// Maan lete hain aapne sara data is file mein rakha hai
import { UNIVERSITY_DETAILS } from "@/data/universityDetails"; 

export async function GET() {
  try {
    await connectDB();
    console.log("🚀 Starting Deep University Details Seeding...");

    // Agar UNIVERSITY_DEEP_DATA ek Object hai (jaise Saratov wala tha), 
    // toh hum use Array mein convert karenge iterate karne ke liye.
    const detailsArray = Object.values(UNIVERSITY_DETAILS);

    for (const uni of detailsArray) {
      try {
        // 💾 Upsert into MongoDB (Slug ke base par check karega)
        await UniversityDetail.findOneAndUpdate(
          { slug: uni.slug },
          {
            name: uni.name,
            slug: uni.slug,
            image: uni.image, // Basic image URL from your JSON
            location: uni.location,
            established: uni.established,
            ranking: {
              world: uni.ranking?.world || "",
              country: uni.ranking?.country || ""
            },
            intro: uni.intro,
            highlights: uni.highlights || [],
            tuitionFees: uni.tuitionFees || [],
            totalPackage: uni.totalPackage,
            eligibility: uni.eligibility || [],
            admissionSteps: uni.admissionSteps || [],
            accommodation: {
              type: uni.accommodation?.type || "",
              roomSharing: uni.accommodation?.roomSharing || "",
              facilities: uni.accommodation?.facilities || [],
              indianFood: uni.accommodation?.indianFood || "",
              amenities: uni.accommodation?.amenities || [] // Safely handle optional fields
            },
            clinicalRotation: {
              hospitals: uni.clinicalRotation?.hospitals || [],
              practicalTraining: uni.clinicalRotation?.practicalTraining || ""
            },
            documents: uni.documents || [],
            cityLife: {
              name: uni.cityLife?.name || "",
              description: uni.cityLife?.description || "",
              travel: uni.cityLife?.travel || ""
            },
            updatedAt: new Date()
          },
          { upsert: true, new: true, runValidators: true }
        );

        console.log(`✅ Seeded Deep Details for: ${uni.name}`);
      } catch (err) {
        console.log(`❌ Error seeding details for ${uni.slug}:`, err.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded deep details for ${detailsArray.length} universities! 🚀`,
    });

  } catch (error) {
    console.error("SEEDING_ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}