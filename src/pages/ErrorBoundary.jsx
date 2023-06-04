import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const ErrorBoundary = () => {

    const navigate = useNavigate()

    return (
        <main className="min-h-[100vh] w-full py-5 px-6 grid place-items-center">
            <section className="max-w-[450px] w-full design-bg rounded-xl p-4">
                <header>
                    <h1 className="text-white text-center font-bold text-[24px]">Highrise</h1>
                </header>
                <div className="py-8">
                    <h1 className="text-white text-center font-bold text-[50px]">404</h1>
                </div>
                <p className="text-white mb-4 text-center">Page not found, an error occurred!</p>
                <div className="flex">
                    <Button className="mx-auto" onClick={()=> navigate('/')}>Go to Homepage</Button>
                </div>
            </section>
        </main>
    )
}

export default ErrorBoundary