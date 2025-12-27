import AppLogoIconBG from './app-logo-icon-bg';

export default function AppBG() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <AppLogoIconBG className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
    );
}
