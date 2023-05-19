import Dashboard from '../layout/Dashboard'
import Input from '../components/Input'
import Button from '../components/Button'

const UpdateProfile = () => {
    return (
        <Dashboard>
            <main>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Update Profile</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                    <div className="bg-[#fff] p-10">
                        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                            <fieldset className="max-w-[400px]">
                                <Input label="Surname" type="text" />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="First name" type="text" />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Other name" type="text" />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Email" type="text" />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Phone Number" type="number" />
                            </fieldset>
                        </div>
                        <fieldset className="max-w-[400px] mt-10">
                            <h1>Gender:</h1>
                            <div className="flex gap-x-5 pt-2">
                                <label htmlFor="hr-radio-male" className="flex gap-x-2 items-center cursor-pointer">
                                    <input type="radio" name="hr-radio" id="hr-radio-male" className="hr-radio-gender hidden" />
                                    <span className="h-[26px] w-[26px] border-2 border-primary p-[4px] bg-[#fff] block rounded-[50%] hr-radio-btn"></span>
                                    <span>Male</span>
                                </label>
                                <label htmlFor="hr-radio-female" className="flex gap-x-2 items-center cursor-pointer">
                                    <input type="radio" name="hr-radio" id="hr-radio-female" className="hr-radio-gender hidden" />
                                    <span className="h-[26px] w-[26px] border-2 border-primary p-[4px] bg-[#fff] block rounded-[50%] hr-radio-btn"></span>
                                    <span>Female</span>
                                </label>
                            </div>
                        </fieldset>
                        <Button className="mt-10">Update Profile</Button>
                    </div>
                </section>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Change Password</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                    <div className="bg-[#fff] p-10">
                        <div className="grid grid-cols-1 gap-x-5 gap-y-10">
                            <fieldset className="max-w-[400px]">
                                <Input label="Current Password" type="password" />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="New Password" type="password" />
                            </fieldset>
                            <fieldset className="max-w-[400px]">
                                <Input label="Update Password" type="password" />
                            </fieldset>
                            <fieldset>
                                <Button>Update Password</Button>
                            </fieldset>
                        </div>
                    </div>
                </section>
            </main>
        </Dashboard>
    )
}

export default UpdateProfile