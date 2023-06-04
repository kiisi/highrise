
const Spinner = () => {
  return (
    <div className="h-[100vh] w-full grid place-items-center bg-[#3e3e3e] fixed top-0 left-0 z-[99999]">
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Spinner