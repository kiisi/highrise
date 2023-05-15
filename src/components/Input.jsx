/* eslint-disable react/prop-types */


const Input = ({ label, type }) => {

  return (
    <div className="relative pt-[10px]">
        <input type={type} className="border-[1px] border-[#dadce0] hover:border-[#3390ec] focus:border-[transparent] caret-[#3390ec] outline-none py-3 px-3 w-full rounded-[6px] focus:shadow-[0_0_0_2px_#3390ec]"/>
        <label className="translate-y-[-10px] translate-x-[8px] bg-white px-[4px] absolute left-0 text-[14px] auth-label">{label}</label>
    </div>
  )
}

export default Input