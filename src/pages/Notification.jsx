import { useUserContext } from "../context/userContext"
import Dashboard from "../layout/Dashboard"
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import { base_endpoint } from "../utils/endpoints"
import { Link } from "react-router-dom"

const Notification = () => {

    const { state } = useUserContext()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {

        (async () => {
            try {

                const settings = {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: state.user._id }),
                };

                let res = await fetch(`${base_endpoint}/notification`, settings)

                let data = await res.json()

                console.log(data)
                setNotifications(data.data)

            } catch (err) {
                console.log(err)
            }
        })()

        return () => {
            // 
        }
    }, [])



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
                        notifications.length > 0 ?
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
        </Dashboard>
    )
}

export default Notification