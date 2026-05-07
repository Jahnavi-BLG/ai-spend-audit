import SpendForm from "../components/SpendForm";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-purple-600 text-center mb-4">
                    AI Spend Audit Tool
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Discover where your team is overspending on AI tools.
                </p>

                <SpendForm />
            </div>
        </div>
    );
}

export default Home;