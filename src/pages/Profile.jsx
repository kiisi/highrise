import Input from '../components/Input'
import { useUserContext } from '../context/userContext'
import Dashboard from '../layout/Dashboard'


const Profile = () => {

    const { state } = useUserContext()

    const fullName = state.user.full_name
    const email = state.user.email

    return (
        <Dashboard>
            <main>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Personal Information</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                    <div className="bg-[#fff] p-10">
                        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                            <fieldset className="max-w-[400px]">
                                <Input label="Full name" type="text" readOnly={true} value={fullName}/>
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Address" type="text" readOnly={true} />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Email" type="text" readOnly={true} value={email}/>
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Age" type="number" readOnly={true}/>
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Phone Number" type="number" readOnly={true}/>
                            </fieldset>
                        </div>
                    </div>
                </section>
            </main>
        </Dashboard>
    )
}

export default Profile