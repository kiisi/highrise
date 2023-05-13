
const Footer = () => {
  return (
    <footer className="bg-[#22252C] px-6">
      <div>
        <ul className="pt-10 pb-5 mx-auto max-w-max flex gap-x-4">
          <li className="h-[40px] w-[40px] border-[#bbb] hover:border-[#fff] border-[1px] rounded-[50%] text-[#bbb] hover:text-[#fff] grid place-items-center">
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com">
              <i className="fa fa fa-facebook"></i>
            </a>
          </li>
          <li className="h-[40px] w-[40px] border-[#bbb] hover:border-[#fff] border-[1px] rounded-[50%] text-[#bbb] hover:text-[#fff] grid place-items-center">
            <a target="_blank" rel="noreferrer" href="https://twitter.com">
              <i className="fa fa fa-twitter"></i>
            </a>
          </li>
          <li className="h-[40px] w-[40px] border-[#bbb] hover:border-[#fff] border-[1px] rounded-[50%] text-[#bbb] hover:text-[#fff] grid place-items-center">
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com">
              <i className="fa fa fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="text-white text-center py-5 border-t-[1px] border-[#aaa]">
        <p>Copyright &copy; 2023 | Highrise Newspaper</p>
      </div>
    </footer>
  )
}

export default Footer