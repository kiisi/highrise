import Input from "../components/Input"
import { useUserContext } from "../context/userContext"
import Dashboard from "../layout/Dashboard"
import { PaystackButton } from "react-paystack"
import { base_endpoint } from "../utils/endpoints"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
const Payment = () => {

    const navigate = useNavigate()
    const { state } = useUserContext()

    const logout = async () => {

        try {
            const res = await fetch(`${base_endpoint}/auth/logout`, { credentials: 'include' })
            const result = await res.json()
            if (result.success) {
                return navigate('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    if(!state.service || !state.service.amount){
        return (
            <main className="min-h-[100vh] w-full py-5 px-6 grid place-items-center">
                <Helmet>
                    <title>Highrise - Page not found</title>
                </Helmet>
                <section className="max-w-[450px] w-full design-bg rounded-xl p-4">
                    <header>
                        <h1 className="text-white text-center font-bold text-[24px]">Highrise</h1>
                    </header> 
                    <div className="py-8">
                        <h1 className="text-white text-center font-bold text-[50px]">404</h1>
                    </div>      
                    <p className="text-white mb-4 text-center">You are logged in as <Link className="font-bold hover:text-[#C99AF7] cursor-pointer" to="/profile">{state.user.email}</Link></p>
                    <div className="flex">
                        <Button className="mx-auto" onClick={logout}>Sign in as a different user</Button>
                    </div>
                </section>
            </main>
        )
    }

    const email = state.user.email
    const amount = state.service.amount
    const serviceType = state.service.type
    const serviceRoute = state.service.route
    const name = state.user.full_name
    // const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
    const publicKey = "pk_test_1dbe7c288b9d924fa7f0e9793b1470d186c01f19"

    const componentProps = {
        email,
        amount: amount * 100,
        metadata: {
            name,
            phone: 9155958012
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>{
            (async()=>{
                const res = await fetch(`${base_endpoint}/payment/checkout/${serviceRoute}`,{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        serviceId: state.service.serviceId, 
                        userId: state.user._id, 
                    })
                }) 
                const result = await res.json()
                console.log(result)
                navigate('/dashboard/notification')
            })()
        },
        onClose: () => console.log("Close"),
    }

    console.log(componentProps)


    return (
        <Dashboard>
            <main>
                <Helmet>
                    <title>Highrise Checkout</title>
                </Helmet>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Highrise Checkout</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                    <div className="bg-[#fff] p-10">
                        <div className="flex flex-wrap gap-x-10 gap-y-10">
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Service" type="text" defaultValue={serviceType} readOnly={true} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Amount" type="number" defaultValue={amount} readOnly={true} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Email (to receive receipt)" type="email" defaultValue={email} readOnly={true} />
                            </fieldset>
                        </div>
                        <div className="pt-10">
                        <PaystackButton {...componentProps} className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]"/>
                        </div>
                    </div>
                </section>
            </main>
        </Dashboard>
    )
}

export default Payment