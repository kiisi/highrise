import { useQuery } from "react-query"
import documentService from "../services/document";
import logo from '../assets/logo.svg'

export default function AllDocs() {

    const { data, isLoading } = useQuery({
        queryKey: ["coverletter"],
        queryFn: () => documentService.getAll(),
    });

    const docs = data?.data?.data
    const changeOfNameDocs = docs?.changeOfNameDocs
    const correctionOfNameDocs = docs?.correctionOfNameDocs


    console.log(docs)

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
            <header className="grid place-items-center pb-14">
                <div className="flex gap-2 items-center">
                    <img src={logo} alt="Highrise Logo" className="h-[50px]" />
                    <h1 className="text-[24px] text-primary font-bold">High Rise News</h1>
                </div>
            </header>
            {
                    isLoading && (
                        <div className="grid place-items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                    )
                }
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    changeOfNameDocs && correctionOfNameDocs && changeOfNameDocs.length === 0 && correctionOfNameDocs.length == 0 && (
                        <div>
                            <h1>No Data</h1>
                        </div>
                    )
                }
                {
                    changeOfNameDocs && changeOfNameDocs.length > 0 && (
                        changeOfNameDocs.map((doc, i) => (
                            <div key={i} className="p-[2rem] rounded-[10px] border-[1px] hover:border-[#666] box-shadow bg-[#f8f8f8]">
                                <div className="p-2 bg-primary rounded-[6px]">
                                    <h1 className="text-[20px] text-center text-white font-bold">HIGHRISE NEWS</h1>
                                </div>
                                <div className="pt-5">
                                    <h2 className="text-center text-[18px] mb-8 font-semibold">Change of Name</h2>
                                    <div className="flex gap-5">
                                        <img src={doc.passport} alt="Passport" className="h-[120px] w-[120px]" />
                                        <div>
                                            I formerly known, called and addressed as <span className="font-bold">{doc.old_name}</span>, now wish to be known, called and addressed as <span className="font-bold">{doc.new_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
                {
                    correctionOfNameDocs && correctionOfNameDocs.length > 0 && (
                        correctionOfNameDocs.map((doc, i) => (
                            <div key={i} className="p-[2rem] rounded-[10px] border-[1px] hover:border-[#666] box-shadow bg-[#f8f8f8]">
                                <div className="p-2 bg-primary rounded-[6px]">
                                    <h1 className="text-[20px] text-center text-white font-bold">HIGHRISE NEWS</h1>
                                </div>
                                <div className="pt-5">
                                    <h2 className="text-center text-[18px] mb-8 font-semibold">Correction of Name</h2>
                                    <div className="flex gap-5">
                                        <img src={doc.passport} alt="Passport" className="h-[120px] w-[120px]" />
                                        <div>
                                            I formerly known, called and addressed as <span className="font-bold">{doc.old_name}</span>, now wish to be known, called and addressed as <span className="font-bold">{doc.new_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}