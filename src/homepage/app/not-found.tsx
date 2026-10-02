

export default function NotFound() {
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center">
            <div className="lg:px-20 p-10">
                <div className="glass-panel-content">
                    <h2 className="text-center">Page Not Found</h2>
                    <p className="text-center">This page does not exist</p>
                </div>
            </div>
        </div>
    )
}