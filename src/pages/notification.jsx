import { useUserContext } from "../context/userContext"
import Dashboard from "../layout/Dashboard"
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom"
import notificationService from "../services/notification"
import { useQuery } from "react-query"

const Notification = () => {

    const { state } = useUserContext()

    const { data, isLoading } = useQuery({
        queryKey: ["coverletter"],
        queryFn: () => notificationService.getAll({ id: state.user._id }),
    });

    const notifications = data?.data?.data

    return (
        <Dashboard>
            <main>
                <Helmet>
                    <title>Highrise - Notifications</title>
                </Helmet>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Notifications</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px] flex flex-col gap-y-5">
                    {
                        isLoading ? (
                            <div className="grid place-items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </div>
                        )
                            :
                            notifications?.length > 0 ?
                                notifications.map((notify, i) => (
                                    <div className="rounded-[5px] overflow-hidden" key={i}>
                                        <div className="py-3 px-4 bg-[#15283C]">
                                            <i className="fa-sharp fa-solid fa-bell text-white text-[20px]"></i>
                                        </div>
                                        <div className="py-2 px-4 bg-[#3A6C9F] text-white">
                                            <p>{notify.message}</p>
                                            <div className="pt-2">
                                                <Link to='/verification'><span className="underline">Go to verification page to verify</span></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))

                                :
                                <div className="rounded-[5px] overflow-hidden">
                                    <h1 className="py-2 px-4 bg-[#3A6C9F] text-center text-[24px] text-white">
                                        You don&rsquo;t have any notification!
                                    </h1>
                                </div>
                    }
                </section>
            </main>
        </Dashboard >
    )
}

export default Notification