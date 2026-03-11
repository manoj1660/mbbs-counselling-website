import { universities } from "../../../data/universities"

export default async function UniversityDetail({ params }) {

const { slug } = await params

const uni = universities.find(
u => u.slug === slug
)

if (!uni) {
return <div>University not found</div>
}

return(

<div className="max-w-4xl mx-auto py-20">

<h1 className="text-4xl font-bold mb-6">
{uni.name}
</h1>

<p className="text-gray-600 mb-10">
{uni.introduction}
</p>

<h2 className="text-2xl font-bold mb-4">
Fee Structure
</h2>

<table className="w-full border">

<tbody>

<tr>
<td className="border p-3">Tuition Fee</td>
<td className="border p-3">{uni.fees.tuition}</td>
</tr>

<tr>
<td className="border p-3">Hostel Fee</td>
<td className="border p-3">{uni.fees.hostel}</td>
</tr>

<tr>
<td className="border p-3">Insurance</td>
<td className="border p-3">{uni.fees.insurance}</td>
</tr>

</tbody>

</table>

</div>

)
}