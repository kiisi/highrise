/* eslint-disable react/prop-types */

const Button = (props) => {
  return (
    <button className={`bg-primary px-10 py-2.5 rounded-md text-white ${props.className}`}>{props.children}</button>
  )
}

export default Button