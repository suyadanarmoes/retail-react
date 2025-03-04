import { useAuth } from "@/hooks/index"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import ProfileBox from "./Common/ProfileBox"
import DesktopSidebar from "@/components/sidebar/DesktopSidebar"

const DefaultLayout = () => {
	const { isAuthenticated } = useAuth()
	const location = useLocation()
return(
	 !isAuthenticated ? (
		<Navigate to={"/auth/login"} state={{ from: location }} replace />
	) : (
		<div className="h-svh flex overflow-hidden">
			<DesktopSidebar />
			<main className="w-full min-h-full overflow-y-auto">
				<nav className="flex justify-end p-3">
					<ProfileBox />
				</nav>

				<Outlet />
			</main>
		</div>
	)
)
}

export default DefaultLayout