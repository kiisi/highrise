import { Link } from 'react-router-dom'
import profile_pic from '../assets/profile-pics.svg'



// const  = [
//     {
//         to:'/',
//         link:'Change of Names',

//     }
// ]
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
        <div className="min-h-[100%] w-full flex">
            <aside className="w-full max-w-[260px] h-[100%] dashboard-sidenav flex flex-col pb-[20px]">
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
                <nav className="h-[100px] w-full bg-[#aaa]">

                </nav>
                <main>

                </main>
            </div>
        </div>
    )
}

export default Dashboard