/* eslint-disable react/prop-types */


const Input = ({ label, type }) => {

  return (
    <div className="relative pt-[10px] w-full">
        <input type={type} className="border-[1px] border-[#dadce0] hover:border-primary focus:border-[transparent] caret-primary outline-none py-3 px-3 w-full rounded-[6px] focus:shadow-[0_0_0_2px_#684EA0]"/>
        <label className="translate-y-[-10px] translate-x-[8px] bg-white px-[4px] absolute left-0 text-[14px] auth-label">{label}</label>
    </div>
  )
}

export default Input