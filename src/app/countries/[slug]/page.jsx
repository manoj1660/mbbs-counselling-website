// import { countries } from "../../../data/countries"
// import { universities } from "../../../data/universities"
// import UniversityCard from "../../../components/UniversityCard"

// export default async function CountryDetail({ params }) {

// const { slug } = await params

// const country = countries.find(c => c.slug === slug)

// const filteredUniversities = universities.filter(
// u => u.country === slug
// )

// if (!country) {
// return <div>Country not found</div>
// }

// return (

// <div className="max-w-6xl mx-auto py-20">

// <h1 className="text-4xl font-bold mb-6">
// MBBS in {country.name}
// </h1>

// <p className="text-gray-600 mb-10">
// {country.description}
// </p>

// <h2 className="text-2xl font-bold mb-6">
// Top Universities
// </h2>

// <div className="grid md:grid-cols-3 gap-8">

// {filteredUniversities.map(uni => (
// <UniversityCard key={uni.slug} uni={uni} />
// ))}

// </div>

// </div>

// )
// }