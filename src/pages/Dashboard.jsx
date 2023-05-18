import { Link } from 'react-router-dom'
import profile_pic from '../assets/profile-pics.svg'
import Input from '../components/Input'


const sidemenuLinks = [
    {
        icon: 'fa-solid fa-id-card',
        title: 'Change Of Names',
        to: '/'
    },
    {
        icon: 'fa fa-newspaper-o',
        title: 'Loss Of Documents',
        to: '/'
    },
    {
        icon: 'fa fa-bullhorn',
        title: 'Public Notice',
        to: '/'
    },
    {
        icon: 'fa-solid fa-circle-check',
        title: 'Affidavit Online',
        to: '/'
    },
]
const Dashboard = () => {
    return (
        <div className="min-h-[100vh] w-full flex bg-[#f8f8f8]">
            <aside className="w-full max-w-[260px] min-h-[100%] dashboard-sidenav flex flex-col pb-[20px]">
                <div className="p-4 flex items-center gap-x-4 bg-[#214162]">
                    <figure>
                        <img src={profile_pic} alt="Profile" className="h-[75px] w-[75px] rounded-[50%]" />
                    </figure>
                    <figcaption>
                        <h1 className="text-white font-bold">Terasa May</h1>
                    </figcaption>
                </div>
                <div className="pt-8 pb-2 px-6 border-primary border-b-2">
                    <header className="text-white text-[22px]">Dashboard</header>
                </div>
                <div className="mb-[100px] pt-[20px] pr-[20px]">
                    {
                        sidemenuLinks.map((sml, i) => (
                            <Link key={i} to={sml.to}>
                                <button className="py-3 px-6 text-white hover:text-primary font-bold cursor-pointer flex items-center gap-x-4 hover:bg-white rounded-r-[10px] mr-[20px] w-full">
                                    <i className={`${sml.icon} text-[20px]`}></i>
                                    <span>{sml.title}</span>
                                </button>
                            </Link>
                        ))
                    }
                </div>
                <div className="mt-auto pr-[20px]">
                    <button className="py-4 px-6 text-white hover:text-primary font-bold cursor-pointer flex items-center gap-x-4 hover:bg-white rounded-r-[10px] w-full">
                        <span className="material-icons">settings</span>
                        <span>Profile Settings</span>
                    </button>
                    <button className="py-4 px-6 text-white hover:text-primary font-bold cursor-pointer flex items-center gap-x-4 hover:bg-white rounded-r-[10px] mr-[20px] w-full">
                        <span className="material-icons">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            <div className="flex-1">
                <nav className="p-3 w-full bg-[#15283C] flex">
                    <ul className="flex gap-x-3 max-w-max ml-auto">
                        <li href="#" className="text-white relative h-[25px] w-[25px]"><i className="fa fa-bell-o text-[20px] p-1 c"></i><span className="notification-badge">2</span></li>
                        <li href="#" className="text-white relative h-[25px] w-[25px]"><i className="fa fa-question-circle text-[20px] p-1"></i></li>
                        <li href="#" className="text-white relative h-[25px] w-[25px]"><i className="fa fa-envelope-o text-[20px] p-1"></i><span className="notification-badge">2</span></li>
                    </ul>
                </nav>
                <main>
                    <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                        <h1 className="text-primary text-[24px] font-bold">Personal Information</h1>
                    </header>
                    <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                        <div className="bg-[#fff]">
                            <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                                <fieldset className="max-w-[400px]">
                                    <Input label="Full name" type="text"/>
                                </fieldset>
                                <fieldset className="max-w-[400px]">
                                    <Input label="Address" type="text"/>
                                </fieldset>
                                <fieldset className="max-w-[400px]">
                                    <Input label="Email" type="text"/>
                                </fieldset>
                                <fieldset className="max-w-[400px]">
                                    <Input label="Age" type="number"/>
                                </fieldset>
                                <fieldset className="max-w-[400px]">
                                    <Input label="Phone Number" type="number"/>
                                </fieldset>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Dashboard