import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-13 items-center justify-center">
                <AppLogoIcon className="size-13 fill-current text-white dark:text-black" />
            </div>
        </>
    );
}
