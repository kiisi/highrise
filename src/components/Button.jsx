/* eslint-disable react/prop-types */

const Button = (props) => {
  
  const { className, children, disabled , ...prop} = props
  return (
    <button onClick={props.onClick} disabled={disabled} className={`bg-primary px-10 py-2.5 rounded-md disabled:cursor-not-allowed disabled:bg-primary disabled:opacity-60 text-white hover:bg-[#310077] ${className}`} {...prop}>{children}</button>
  )
}

export default Button