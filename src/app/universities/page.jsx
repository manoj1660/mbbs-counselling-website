import {universities} from "../../data/universities"
import UniversityCard from "../../components/UniversityCard"

export default function UniversitiesPage(){

return(

<div className="max-w-6xl mx-auto py-20">

<h1 className="text-4xl font-bold mb-10 text-center">
Top Medical Universities
</h1>

<div className="grid md:grid-cols-3 gap-8">

{universities.map(uni=>(
<UniversityCard key={uni.slug} uni={uni}/>
))}

</div>

</div>

)
}