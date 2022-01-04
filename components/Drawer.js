export function Drawer({ children, isOpen, width = "600px" }) {
    const closedClass = isOpen ? "" : " closed";
    return (
        <div className={"DrawerContainer" + closedClass}>
            <div className="DrawerContent">{children}</div>

            <style jsx>{`
                .DrawerContainer {
                    position: relative;
                    height: 100%;
                    background-color: white;
                    overflow-x: hidden;
                    width: ${width};
                    transition: width 0.5s;
                }

                .DrawerContainer.closed {
                    width: 0px;
                }

                .DrawerContent {
                    position: relative;
                    height: 100%;
                    width: ${width};
                }
            `}</style>
        </div>
    );
}
