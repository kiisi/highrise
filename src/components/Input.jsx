/* eslint-disable react/prop-types */


const Input = ({ label, type, value, readOnly }) => {

  return (
    <div className="relative pt-[10px] w-full">
        <input 
        type={type} 
        value={value}
        className={`border-[1px] border-[#c0c1c4] caret-primary outline-none py-3 px-3 w-full rounded-[6px] ${readOnly ? "cursor-pointer" : "hover:border-primary focus:border-[transparent] focus:shadow-[0_0_0_2px_#684EA0]"}`} 
        readOnly={readOnly}/>
        <label 
        className="translate-y-[-11px] translate-x-[8px] bg-white px-[4px] absolute left-0 text-[14px] auth-label">{label}</label>
    </div>
  )
}

export default Input