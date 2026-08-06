import connectDB from "@/lib/db";
import Country from "@/models/Country";
import University from "@/models/University";

export default async function sitemap() {
  const baseUrl = "https://www.mbbsstudyabroad.com";

  // 1. Static Pages (Added /northdelhi, policy pages | No /login)
  const staticPages = [
    "",
    "/about",
    "/admission",
    "/apply",
    "/northdelhi",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // 2. Dynamic Country Pages (Database se fetch karein)
  await connectDB();
  const countries = await Country.find({}, { name: 1 }).lean();
  const countryPages = countries.map((c) => ({
    url: `${baseUrl}/universities/${c.name.toLowerCase()}`,
    lastModified: new Date(),
  }));

  // 3. Dynamic University Pages
  const universities = await University.find({}, { slug: 1, country: 1 }).lean();
  const universityPages = universities.map((u) => ({
    url: `${baseUrl}/universities/${u.country.toLowerCase()}/${u.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...countryPages, ...universityPages];
}