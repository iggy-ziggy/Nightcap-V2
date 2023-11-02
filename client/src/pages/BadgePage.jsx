import React from "react";
import { styles } from "../styles";
import { Navbar, SideNav, Badges } from "../components";


function BadgePage() {
    return (
        <main className='relative z-0 bg-primary'>
            <div className='bg-cover bg-no-repeat bg-center'>
                <Navbar />
                <div className={`${styles.paddingX} relative inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
                    <SideNav />
                    <div className='flex flex-col justify-center items-center'>
                        <Badges />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BadgePage;